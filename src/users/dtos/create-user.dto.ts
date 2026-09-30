import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
export class CreateUserDto {
  @ApiProperty({
    description: 'The first name of the user',
    type: String,
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  firstName!: string;

  @ApiProperty({
    description: 'The last name of the user',
    type: String,
    example: 'Doe',
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(20)
  lastName?: string;

  @ApiProperty({
    description: 'The email of the user',
    type: String,
    example: 'john.doe@example.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty({
    description: 'The password of the user',
    type: String,
    example: 'Password123',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'Password must be at least 8 characters long and contain at least one letter and one number',
  })
  password!: string;
}
