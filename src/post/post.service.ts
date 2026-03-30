import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
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


    async findOneOrFail(postData: Partial<Post>) {
        const post = await this.findOne(postData);

        if (!post) {
            throw new NotFoundException('Post nao encontrado');
        }

        return post;
    }

    async findOne(postData: Partial<Post>) {
        const post = await this.postRepository.findOne({
            where: postData,
            relations: ['author']
        });

        return post;
    }

    async findOneOwned(postData: Partial<Post>, author: User) {
        const post = await this.postRepository.findOne({
            where: {
                ...postData,
                author: {
                    id: author.id
                }
            },
            relations: ['author']
        });

        return post;
    }

    async findOneOwnedOrFail(postData: Partial<Post>, author: User) {
        const post = await this.findOneOwned(postData, author);

        if (!post) {
            throw new NotFoundException('Post nao encontrado');
        }

        return post;
    }

    async findAllOwned(author: User) {
        const posts = await this.postRepository.find({
            where:{
                author:{
                    id: author.id
                }
            },
            order:{
                createdAt: 'DESC'
            },
            relations: ['author']
        });

        return posts;
    }

    async findAll(postData: Partial<Post>) {
        const posts = await this.postRepository.find({
            where:postData,
            order:{
                createdAt: 'DESC'
            },
            relations: ['author']
        });

        return posts;
    }

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

    async update(postData: Partial<Post>, dto: UpdatePostDto, author: User) {
        if(Object.keys(dto).length === 0) {
            throw new BadRequestException('Nenhum dado para atualizar');
        }

        const post = await this.findOneOwnedOrFail(postData, author);

        post.title = dto.title ?? post.title;
        post.content = dto.content ?? post.content;
        post.excerpt = dto.excerpt ?? post.excerpt;
        post.coverImageUrl = dto.coverImageUrl ?? post.coverImageUrl;
        post.published = dto.published ?? post.published;

        return this.postRepository.save(post);
    }

    async remove(postData: Partial<Post>, author: User){
        const post = await this.findOneOrFail(postData);
        await this.postRepository.delete({
            ...postData,
            author:{
                id: author.id
            }
        })
        return post;
    }
}
