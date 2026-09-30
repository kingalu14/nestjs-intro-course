import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { GetUserParamDto } from '../dtos/get-user-param.dto';
import type { IUser } from '../interfaces/user.interface';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';

const users: IUser[] = [
  { id: 1, username: 'John Doe' },
  { id: 2, username: 'Jane Smith' },
  { id: 3, username: 'Poul John' },
];

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    //check if user exist with the same email
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    //Handle exceptions
    //Create new user
    let newUser = this.usersRepository.create(createUserDto);
    newUser = await this.usersRepository.save(newUser);
    return newUser;
  }

  public findAllUsers(): IUser[] {
    return users;
  }
  public findUserById(getUserParamDto: GetUserParamDto): IUser | string {
    if (
      getUserParamDto.id !== undefined &&
      !this.authService.isAuth(getUserParamDto.id)
    ) {
      return 'User not authenticated';
    }
    return (
      users.find((user) => user.id === getUserParamDto.id) || 'User not found'
    );
  }
}
