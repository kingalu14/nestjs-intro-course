import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([User])], // Add any necessary imports here
  exports: [UsersService], // Export UsersService to make it available for other modules
})
export class UsersModule {}
