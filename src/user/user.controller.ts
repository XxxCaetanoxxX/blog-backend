import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CustomParseIntPipe } from 'src/common/pipes/custom-parse-int-pipe.pipe';
import { ConfigService } from '@nestjs/config';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly configService: ConfigService) { }

  @Get(':id')
  findOne(@Param('id', CustomParseIntPipe) id: number) {
    //usar getORThrow do configService
    console.log(process.env.TESTE);
    return this.userService.findOne(id);
  }
}
