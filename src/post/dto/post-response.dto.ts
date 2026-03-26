import { User } from "src/user/entities/user.entity";
import { Post } from "../entities/post.entity";

export class PostResponseDto {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    coverImageUrl: string;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
    author: {
        id:string;
        email:string;
        name:string
    };

    constructor(post: Post) {
        this.id = post.id;
        this.title = post.title;
        this.slug = post.slug;
        this.content = post.content;
        this.excerpt = post.excerpt;
        this.coverImageUrl = post.coverImageUrl;
        this.published = post.published;
        this.createdAt = post.createdAt;
        this.updatedAt = post.updatedAt;
        this.author = {
            id: post.author.id,
            email: post.author.email,
            name: post.author.name
        };
    }
}