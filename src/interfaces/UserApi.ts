export interface UserApi {
  id: number;
  name: string;
  email: string;
  password?: string;
  avatar: string;
  role?: string;
  creationAt?: string;
  updateAt?: string;
}