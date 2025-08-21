// interface untuk nerima data dari image picker ke storage
export interface PostInput {
  author_id: string;
  description: string;
  image_url?: string;
  image_id?: string;
  name: string;
  type: string;
  size: number;
  uri: string;
}
