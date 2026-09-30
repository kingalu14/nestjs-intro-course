import { IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetUserParamDto {
  @ApiPropertyOptional({
    description: 'The ID of the user',
    type: Number,
    example: 1,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: number;
}
