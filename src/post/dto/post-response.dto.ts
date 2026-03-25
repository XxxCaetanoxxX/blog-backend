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
    }
}