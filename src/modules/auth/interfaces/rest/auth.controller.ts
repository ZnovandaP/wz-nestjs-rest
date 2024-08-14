import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  NotFoundException,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from '@auth/application/auth.service';
import { AuthDto } from '@auth/domain/dto/auth-dto';
import { LocalGuard } from '@/modules/auth/infrastructure/guard/local.guard';
import { JwtGuard } from '@/modules/auth/infrastructure/guard/jwt.guard';
import {
  Roles,
  RolesEnum,
} from '@auth/infrastructure/decorators/role.decorator';
import { ApiHeaders, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../../domain/entities/user.entity';
import { MockResponseAuthSuccess } from '@/shared/mock/response/auth/auth.mock';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalGuard)
  @ApiResponse({
    status: 200,
    type: User,
    description: 'Authentication user',
    example: MockResponseAuthSuccess.mockLogin(),
  })
  loginAllRole(@Body() AuthDto: AuthDto) {
    return this.authService.loginUser(AuthDto);
  }

  @Post('register')
  @ApiQuery({ name: 'role', enum: RolesEnum, required: true })
  @ApiResponse({
    status: 201,
    type: User,
    description: 'Register new user',
    example: MockResponseAuthSuccess.mockRegister(),
  })
  registerBaseOnRole(@Body() AuthDto: AuthDto, @Query('role') role: string) {
    if (!role)
      throw new NotFoundException(
        'Role is required, please attach role query param',
      );

    switch (role) {
      case RolesEnum.COMMON:
        return this.authService.saveCommonUser(AuthDto);
      case RolesEnum.ADMIN:
        return this.authService.saveAdminUser(AuthDto);
      case RolesEnum.MASTER:
        return this.authService.saveMasterUser(AuthDto);
      default:
        throw new NotFoundException(`Login with role ${role} not found`);
    }
  }

  @Get('users')
  @UseGuards(JwtGuard)
  @Roles([RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN, RolesEnum.MASTER])
  @ApiHeaders([
    {
      name: 'Authorization',
      description: 'Bearer [ACCESS_TOKEN]',
      required: true,
      example: 'Bearer [ACCESS_TOKEN]',
    },
  ])
  @ApiResponse({
    status: 200,
    type: User,
    description: 'Get all data users',
    example: MockResponseAuthSuccess.mockGetDataUsers(),
  })
  getUsers() {
    return this.authService.retriveDataUsers();
  }
}
