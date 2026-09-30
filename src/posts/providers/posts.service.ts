import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/providers/users.service';

@Injectable()
export class PostsService {
  constructor(private readonly userService: UsersService) {}
  findPostsByUserId(userId: number) {
    // Logic to retrieve posts by userId
    const user = this.userService.findUserById({ id: userId });
    if (!user) {
      console.log(`User not found for ID: ${userId}`);
      return `No posts found for user with ID: ${userId}`;
    }
    return `Posts for user with ID: ${userId}`;
  }
}
