import { AlertTriangle, Kanban, LucideIcon, Users } from "lucide-react";

export const ICON_MAP = {
  Users,
  Kanban,
};

export const resolveIcon = (iconName: keyof typeof ICON_MAP | undefined): LucideIcon => {
  if (!iconName) return AlertTriangle;
  return ICON_MAP[iconName] || AlertTriangle;
};

export interface NavMainItem {
  title: string;
  path: string;
  icon?: keyof typeof ICON_MAP;
}

export interface NavGroup {
  id: number;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    items: [
      {
        title: "Users",
        path: "/users",
        icon: "Users",
      },
      {
        title: "Posts",
        path: "/posts",
        icon: "Kanban",
      },
    ],
  },
];
