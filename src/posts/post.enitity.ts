import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { postType } from './enums/postType.enum';
import { postStatus } from './enums/postStatus.enum';
import { CreatePostMetaOptionsDto } from '../meta-options/dtos/create.post.metaoption';
import { timeStamp } from 'node:console';
import { MetaOption } from 'src/meta-options/meta-options.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  title!: string;

  @Column({
    type: 'enum',
    enum: postType,
    nullable: false,
    default: postType.POST,
  })
  postType!: postType;

  @Column({
    type: 'text',
    nullable: true,
  })
  content!: string;

  @Column({
    type: 'int',
  })
  userId!: number;
  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
    unique: true,
  })
  slug?: string;

  @Column({
    type: 'enum',
    enum: postStatus,
    nullable: false,
    default: postStatus.DRAFT,
  })
  status?: postStatus;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  schema?: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  featuredImage?: string;

  @Column({
    type: 'timestamp', //datetime in mysql
    nullable: true,
  })
  publishedOn?: Date;

  tags?: string[];
  categories?: string[];

  @OneToOne(() => MetaOption)
  @JoinColumn()
  metaOptions?: MetaOption;
}
