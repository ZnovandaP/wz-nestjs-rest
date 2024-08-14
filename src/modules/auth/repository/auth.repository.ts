import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../domain/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findUsers() {
    return await this.userRepository.find({
      select: {
        avatar: true,
        createdAt: true,
        email: true,
        password: true,
        products: true,
        updatedAt: true,
        userCode: true,
        role: true,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async save(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
    return await this.userRepository.save(user);
  }

  async delete(email: string) {
    return await this.userRepository.delete({ email });
  }
}
