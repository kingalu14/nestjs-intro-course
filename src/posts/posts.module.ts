import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './providers/posts.service';
import { UsersModule } from 'src/users/users.module';
import { Post } from './post.enitity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [UsersModule, TypeOrmModule.forFeature([Post])], // Import UsersModule to use UsersService
})
export class PostsModule {}
