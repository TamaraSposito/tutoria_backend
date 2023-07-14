import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '@app/auth/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginResponseDto } from '@app/auth/dtos/login.response.dto';
import { LoginDto } from '@app/auth/dtos/login.dto';
import { LocalAuthGuard } from '@app/auth/guards/local-auth.guard';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post()
  async login(
    @Body() dto: LoginDto,
    @Req() req: any,
  ): Promise<LoginResponseDto> {
    return await this.authService.login(req.user);
  }
}
