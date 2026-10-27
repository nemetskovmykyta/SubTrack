export interface UserProfile {
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
}
