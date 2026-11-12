export type IconName =
  | "bell"
  | "calendar"
  | "chevron"
  | "cloud"
  | "edit"
  | "heart"
  | "help"
  | "logout"
  | "more"
  | "search"
  | "security"
  | "settings"
  | "sliders"
  | "spark"
  | "sport"
  | "trash"
  | "user"
  | "upload"
  | "wallet";

export interface IconProps {
  name: IconName;
  className?: string;
  size?: number | string;
}
