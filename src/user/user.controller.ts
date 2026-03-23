import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CustomParseIntPipe } from 'src/common/pipes/custom-parse-int-pipe.pipe';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly configService: ConfigService) { }

  @Get(':id')
  findOne(@Param('id', CustomParseIntPipe) id: number) {
    //usar getORThrow do configService
    console.log(process.env.TESTE);
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
