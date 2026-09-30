import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 256,
    unique: true,
  })
  name!: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 512,
    unique: true,
  })
  slug!: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  description!: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  schema!: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 1024,
  })
  featuredImage!: string;

  @CreateDateColumn()
  createDate!: Date;

  @UpdateDateColumn()
  updateDate!: Date;

  @DeleteDateColumn()
  DeleteDate!: Date;
}
