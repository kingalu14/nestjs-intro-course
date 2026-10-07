import { Body, Injectable } from '@nestjs/common';
import { CreatePostMetaOptionsDto } from '../dtos/create.post.metaoption';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from '../meta-options.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MetaOptionsService {
  constructor(
    /**
     * inject metaOptionsRepository
     *
     * */
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

  async create(createPostMetaOptionsDto: CreatePostMetaOptionsDto) {
    console.log(createPostMetaOptionsDto);
    console.log('Meta options created');
    const metaOption = this.metaOptionsRepository.create(
      createPostMetaOptionsDto,
    );
    return await this.metaOptionsRepository.save(metaOption);
  }
}
