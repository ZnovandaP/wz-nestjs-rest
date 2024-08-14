import * as bcrypt from 'bcrypt';
import { ConflictException, Injectable } from '@nestjs/common';
import { AuthDto } from '@auth/domain/dto/auth-dto';
import { AuthRepository } from '@auth/repository/auth.repository';
import { generateAvatar } from '@/shared/utils/generate-avatar';
import { generateUserId } from '@/shared/utils/generated-id';
import { JwtService } from '@nestjs/jwt';
import { RolesEnum } from '../infrastructure/decorators/role.decorator';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async retriveDataUsers() {
    const users = await this.authRepository.findUsers();

    return {
      message: 'Success, get data all users successfully',
      code: 200,
      data: {
        users,
      },
    };
  }

  async loginUser({ email, password }: AuthDto) {
    const user = await this.authRepository.findByEmail(email);
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const payload = {
        email: user.email,
        role: user.role,
        sub: user.id,
        userCode: user.userCode,
      };

      const token = await this.jwtService.signAsync(payload);

      return {
        message: 'Success, login successfully',
        code: 200,
        data: {
          token: token,
        },
      };
    }
  }

  async saveCommonUser({ email, password }: AuthDto) {
    return await this.genericSaveUser({
      email,
      password,
      role: RolesEnum.COMMON,
    });
  }

  async saveAdminUser({ email, password }: AuthDto) {
    return await this.genericSaveUser({
      email,
      password,
      role: RolesEnum.ADMIN,
    });
  }

  async saveMasterUser({ email, password }: AuthDto) {
    return await this.genericSaveUser({
      email,
      password,
      role: RolesEnum.MASTER,
    });
  }

  private async genericSaveUser({
    email,
    password,
    role,
  }: AuthDto & { role: RolesEnum }) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    try {
      const userAdded = await this.authRepository.save({
        email: email,
        password: hashPassword,
        role: role,
        avatar: generateAvatar({ name: email }),
        userCode: generateUserId(),
        products: [],
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, id, ...dataUser } = userAdded;

      return {
        message: `Success, register account with email ${email} successfully`,
        code: 201,
        data: dataUser,
      };
    } catch (error) {
      throw new ConflictException(`Failed, email ${email} already exists`);
    }
  }
}
