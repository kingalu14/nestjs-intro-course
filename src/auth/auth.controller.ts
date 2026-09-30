import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  public login(
    @Body() loginDto: { username: string; password: string; id: number },
  ): string {
    return this.authService.login(
      loginDto.username,
      loginDto.password,
      loginDto.id,
    );
  }
}
