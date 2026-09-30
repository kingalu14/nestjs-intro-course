import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  ParseIntPipe,
  Query,
  Body,
  Headers,
  Ip,
  DefaultValuePipe,
  ValidationPipe,
  Patch,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUserParamDto } from './dtos/get-user-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';
import type { IUser } from './interfaces/user.interface';
import {
  ApiQuery,
  ApiTags,
  ApiParam,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'The maximum number of users to return',
    type: Number,
    example: 10,
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    description: 'The number of users to skip',
    type: Number,
    example: 1,
  })
  getUsers(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number | undefined,
    @Query('offset', new DefaultValuePipe(1), ParseIntPipe)
    offset: number | undefined,
  ): any {
    console.log(limit);
    console.log(offset);
    return this.usersService.findAllUsers();
  }

  @Get('{/:id}')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully retrieved.',
    type: Object,
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the user',
    type: Number,
    example: 1,
  })
  public getUserById(
    @Param() getUserParamDto: GetUserParamDto,
  ): IUser | string {
    console.log(getUserParamDto?.id);
    return this.usersService.findUserById(getUserParamDto) ?? 'User not found';
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  createUser(
    @Body() createUserDto: CreateUserDto,
    @Headers() headers: any,
    @Ip() ip: any,
  ): any {
    console.log(createUserDto);
    console.log(createUserDto instanceof CreateUserDto);
    return this.usersService.createUser(createUserDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
  })
  updateUser(): string {
    return 'This action updates a user';
  }
  @Patch()
  @ApiOperation({ summary: 'Patch a user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully patched.',
  })
  patchUser(@Body() patchUserDto: PatchUserDto): any {
    console.log(patchUserDto);
    return 'This action patches a user';
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    example: 1,
    description: 'The ID of the user to delete',
  })
  deleteUser(): string {
    return 'This action deletes a user';
  }
}
