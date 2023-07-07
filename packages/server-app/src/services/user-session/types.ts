import { type UserRole } from '../../types';

export interface UserSessionData {
  readonly userId: string;
  readonly role: UserRole;
}

export interface UserSession extends Partial<UserSessionData> {
  save(data: UserSessionData): Promise<void>;
  destroy(): Promise<void>;
}
