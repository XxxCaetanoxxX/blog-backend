import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PostResponseDto } from './dto/post-response.dto';
import { User } from 'src/user/entities/user.entity';
import { createSlugFromText } from 'src/common/utils/create-slug-from-text';

@Injectable()
export class PostService {
    private readonly logger = new Logger(PostService.name);

    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>
    ) { }

    async crate(createPostDto: CreatePostDto, author: User) {
        const post = this.postRepository.create({
            slug: createSlugFromText(createPostDto.title),
            author,
            content: createPostDto.content,
            excerpt: createPostDto.excerpt,
            coverImageUrl: createPostDto.coverImageUrl,
            title: createPostDto.title
        });

        const created = await this.postRepository.save(post).catch((err: unknown) => {

            if (err instanceof Error) {
                this.logger.error('Erro ao criar o post', err.stack);
            }

            Logger.error(err);
            throw new BadRequestException('Erro ao criar post');
        });

        return new PostResponseDto(created);
    }
}
