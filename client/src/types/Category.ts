import { PostProps } from "./Post";
import { User } from "./User";

export type Category = {
 id: string;
 name: string;
 posts: PostProps[];
 followers: User[];
}
