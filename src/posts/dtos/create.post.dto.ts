import { ApiProperty } from '@nestjs/swagger';
import { type } from 'os';
import { postType } from '../enums/postType.enum';
import { postStatus } from '../enums/postStatus.enum';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  isString,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { CreatePostMetaOptionsDto } from '../../meta-options/dtos/create.post.metaoption';
import { Type } from 'class-transformer';

export class CreatePostDto {
  @ApiProperty({
    description: 'The title of the post',
    type: String,
    required: true,
    example: 'My First Post',
  })
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    description: 'The type of the post',
    type: String,
    enum: postType,
    required: true,
    example: 'post',
  })
  @IsNotEmpty()
  @IsEnum(postType, {
    message: `postType must be one of the following values: ${Object.values(
      postType,
    ).join(', ')}`,
  })
  postType!: postType;

  @ApiProperty({
    description: 'The content of the post',
    type: String,
    required: true,
    example: 'This is the content of my first post.',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  content!: string;

  @ApiProperty({
    description: 'The ID of the user who created the post',
    type: Number,
    required: true,
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  userId!: number;

  @ApiProperty({
    description: 'The slug of the post',
    type: String,
    required: false,
    example: 'my-first-post',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'Slug must be a valid URL-friendly string (lowercase letters, numbers, and hyphens only)',
  })
  @MaxLength(256)
  slug?: string;

  @ApiProperty({
    description: 'The status of the post',
    type: String,
    enum: postStatus,
    required: false,
    example: 'draft',
  })
  @IsEnum(postStatus, {
    message: `postStatus must be one of the following values: ${Object.values(
      postStatus,
    ).join(', ')}`,
  })
  @IsNotEmpty()
  status?: postStatus;

  @ApiProperty({
    description: 'The schema of the post',
    type: String,
    required: false,
    example:
      '{\r\n "@context": "https:\/\/schema.org",\r\n "@type":"Person"\r\n}',
  })
  @IsJSON()
  @IsOptional()
  schema?: string;

  @ApiProperty({
    description: 'The featured image of the post',
    type: String,
    required: false,
    example: 'https://example.com/images/my-first-post.jpg',
  })
  @IsUrl()
  @IsOptional()
  @MaxLength(1024)
  featuredImage?: string;

  @ApiProperty({
    description: 'The published date of the post',
    type: Date,
    required: false,
    example: '2023-01-01T00:00:00.000Z',
  })
  @IsISO8601()
  @IsOptional()
  publishedOn?: Date;

  @ApiProperty({
    description: 'The tags of the post',
    type: [String],
    required: false,
    example: ['nestjs', 'typescript', 'api'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  tags?: string[];

  @ApiProperty({
    description: 'The categories of the post',
    type: [String],
    example: ['programming', 'web development'],
  })
  @IsArray()
  @IsString({ each: true })
  categories?: string[];

  @ApiProperty({
    description: 'The meta options for the post',
    type: Object,
    required: false,
    items: {
      type: 'object',
      properties: {
        key: {
          type: 'string',
          description:
            'The key can be any string identifire for your meta option',
          example: 'sidebarEnabled',
        },
        value: {
          type: 'any',
          description: 'Any value that you want to save to the key',
          example: true,
        },
      },
    },
    example: [
      {
        key: 'testKey',
        value: 20,
      },
    ],
  })
  @IsOptional()
  @IsArray()
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions?: CreatePostMetaOptionsDto[];
}
