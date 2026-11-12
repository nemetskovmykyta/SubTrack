export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  plan: string;
  avatarInitials: string;
}

export interface UserSettings {
  autoConvert: boolean;
  emailReminders: boolean;
  telegramNotifications: boolean;
  currency: string;
  language: string;
  reminderDaysBefore: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: UserProfile;
}
