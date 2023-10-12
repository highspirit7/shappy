import type { User } from 'firebase/auth';

export interface ShappyUser extends User {
  isAdmin?: boolean;
}
