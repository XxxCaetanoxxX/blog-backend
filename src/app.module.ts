import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';


@Module({
  imports: [AuthModule, UserModule, PostModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
