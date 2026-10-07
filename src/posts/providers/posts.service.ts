import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/providers/users.service';
import { CreatePostDto } from '../dtos/create.post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post.enitity';
import { Repository } from 'typeorm';
import { MetaOption } from 'src/meta-options/meta-options.entity';

@Injectable()
export class PostsService {
  constructor(
    private readonly userService: UsersService,
    /**
     * inject post repository
     */
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    /**
     * inject metaOption repository
     */
    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,
  ) {}
  findPostsByUserId(userId: number) {
    // Logic to retrieve posts by userId
    const user = this.userService.findUserById({ id: userId });
    if (!user) {
      console.log(`User not found for ID: ${userId}`);
      return `No posts found for user with ID: ${userId}`;
    }
    return `Posts for user with ID: ${userId}`;
  }

  async create(createPostDto: CreatePostDto) {
    const { metaOptions, ...postData } = createPostDto;

    const post = this.postRepository.create({
      ...postData,
      ...(metaOptions
        ? {
            metaOptions: this.metaOptionRepository.create(metaOptions),
          }
        : {}),
    });

    return await this.postRepository.save(post);
  }
}
