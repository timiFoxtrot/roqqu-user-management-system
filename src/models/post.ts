export interface IPost {
  id?: number;
  userId: number;
  title: string;
  body: string;
  created_at?: Date;
  updated_at?: Date;
}
