import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';


@Module({
  imports: [AuthModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
