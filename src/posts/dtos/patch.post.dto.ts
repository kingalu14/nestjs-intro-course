import { IsNotEmpty, IsInt } from 'class-validator';
import { CreatePostDto } from './create.post.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class PatchPostDto extends PartialType(CreatePostDto) {
  @ApiProperty({
    description: 'The Id of the post that need to b updated',
  })
  @IsInt()
  @IsNotEmpty()
  id!: number;
}
