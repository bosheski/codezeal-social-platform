import { Category } from "./Category";
import { CommentProp } from "./Comment";
import { User } from "./User";

export type PostProps = {
 id: string;
 title: string;
 content: string;
 published: boolean;
 createdAt: string;
 hearts: number;
 comments: CommentProp[];
 author: User;
 authorId: string;
 category: Category;
 categoryId: string;
 media?: string;
}


