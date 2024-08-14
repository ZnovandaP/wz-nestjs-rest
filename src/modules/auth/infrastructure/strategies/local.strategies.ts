import * as bcrypt from 'bcrypt';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthRepository } from '@auth/repository/auth.repository';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authRepository: AuthRepository) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException(
        `User with email ${email} is not found, please register first`,
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return user;
    } else {
      throw new BadRequestException('password is incorrect');
    }
  }
}
