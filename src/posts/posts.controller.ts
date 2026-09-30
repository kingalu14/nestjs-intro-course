import { Controller, Get, Param, Post, Body, Patch } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiParam, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create.post.dto';
import { PatchPostDto } from './dtos/patch.post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /*
  Get localhost:3000/posts/userId
  */
  @Get('/user/:userId')
  @ApiOperation({ summary: 'Get posts by user ID' })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'The ID of the user',
    type: Number,
    example: 1,
  })
  getPostsByUserId(@Param('userId') userId: number) {
    return this.postsService.findPostsByUserId(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created.',
  })
  createPost(@Body() createPostDto: CreatePostDto): string {
    console.log(createPostDto);
    return 'This action creates a post';
  }

  @Patch()
  updatePost(@Body() patchPostDto: PatchPostDto) {
    console.log(patchPostDto);
  }
}
