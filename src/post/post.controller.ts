import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import type { AuthenticatedRequest } from 'src/auth/types/authenticated-request';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Req() req: AuthenticatedRequest,
    @Body() createPostDto: CreatePostDto
  ) {
    return await this.postService.crate(createPostDto, req.user);
  }

}
