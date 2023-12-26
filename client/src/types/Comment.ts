export type CommentProp = {
 id: string;
 body: string;
 author: {
  name: string;
  image: string;
 };
 media?: string;
}