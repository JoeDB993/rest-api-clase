import type {User} from "./User";

export interface UserListProps {
  users: User[];
  handleEdit: (user: User) => void;
  handleDelet: (id: number) => void;
  loading: boolean;
}