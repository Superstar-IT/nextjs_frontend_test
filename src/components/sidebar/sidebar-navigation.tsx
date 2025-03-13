"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { ICON_MAP, NavGroup, resolveIcon } from "@/navigation/sidebar/sidebar-items";

interface SidebarNavigationProps {
  sidebarItems: NavGroup[];
}

export default function SidebarNavigation({ sidebarItems }: SidebarNavigationProps) {
  const path = usePathname();

  const renderIcon = (iconName: keyof typeof ICON_MAP | undefined): React.ReactNode => {
    const Icon = resolveIcon(iconName);
    return <Icon />;
  };

  const isActive = (itemPath: string) => {
    return path === itemPath;
  };

  return (
    <>
      {sidebarItems.map((navGroup) => (
        <SidebarGroup key={navGroup.id}>
          <SidebarMenu>
            {navGroup.items.map((item) => (
              <Collapsible key={item.title} asChild className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <Link href={item.path}>
                      <SidebarMenuButton isActive={isActive(item.path)} tooltip={item.title}>
                        {item.icon && renderIcon(item.icon)}
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </Link>
                  </CollapsibleTrigger>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
