import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { AudioWaveform, Command, GalleryVerticalEnd } from "lucide-react";
import { NavLink } from "react-router-dom";
import { ScrollArea } from "../ui/scroll-area";
import { ProductsSwitcher } from "./products-switcher";

const data = {
  products: [
    {
      name: "Quod",
      logo: GalleryVerticalEnd,
      group: "Negocie Online",
      disabled: false,
    },
    {
      name: "SKY",
      logo: AudioWaveform,
      group: "Negocie Online",
      disabled: true,
    },
    {
      name: "Neoenergia",
      logo: Command,
      group: "Negocie Online",
      disabled: true,
    },
  ],
  navMain: [
    {
      title: "Início",
      items: [
        {
          title: "Overview",
          url: "/",
        },
        {
          title: "Clientes",
          url: "/customers",
        },
        {
          title: "Módulos",
          url: "/modules",
        },
        {
          title: "Regras",
          url: "/rules",
        },
      ],
    },
    {
      title: "Atalhos",
      items: [
        {
          title: "Criar regra",
          url: "/rules/create",
        },
        {
          title: "Importar/Exportar",
          url: "/data-management",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <ProductsSwitcher products={data.products} />
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-full">
          {data.navMain.map((item) => (
            <SidebarGroup key={item.title}>
              <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {item.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <NavLink to={item.url} end>
                        {({ isActive }) => (
                          <SidebarMenuButton isActive={isActive}>
                            {item.title}
                          </SidebarMenuButton>
                        )}
                      </NavLink>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </ScrollArea>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
