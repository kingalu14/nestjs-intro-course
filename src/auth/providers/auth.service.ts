import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}
  public login(username: string, password: string, id: number): string {
    // Implement your login logic here
    const user = this.userService.findUserById({ id });
    if (!user) {
      throw new Error('User not found');
    }
    return `User  logged in successfully.`;
  }

  public isAuth(id: number): boolean {
    // const user = this.userService.findUserById({ id });
    // if (!user || typeof user === 'string') {
    //   return false;
    // }
    if (!id) return false;
    return true;
  }
}
