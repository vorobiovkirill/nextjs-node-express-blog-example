export type User = {
  name: string;
  email: string;
  accessToken: string;
  id: string;
};

export type PostProps = {
  id: number;
  title: string;
  author: {
    name: string;
  }
  content: string;
}