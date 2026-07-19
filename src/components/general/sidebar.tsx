import { Link, useLocation, useNavigate } from '@tanstack/react-router'
import { ThemeSwitcher } from '@/components/theme/theme-switcher'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import merocketpostlaunch from '@/public/grouprocket/merocketpostlaunch.png'
import { navigation } from './nav'

function getCurrentNav(path: string): string {
  const index_of = path.indexOf('/', 1)
  const base_path = index_of === -1 ? path : path.slice(0, index_of)
  const nav = navigation.find((n) => n.to === base_path)
  return nav !== undefined ? nav.name : 'Homepage'
}

export function AppSidebar() {
  const path = useLocation().pathname
  const navigate = useNavigate()
  const selected = getCurrentNav(path)
  const section = navigation.find((item) => item.name === selected)

  const handleSelect = (name: string) => {
    const target = navigation.find((item) => item.name === name)
    if (target?.to) {
      navigate({ to: target.to })
    }
  }

  return (
    <Sidebar>
      <SidebarHeader className="gap-4 mb-4">
        <img
          src={merocketpostlaunch}
          alt="Me holding rocket"
          className="h-80 w-full object-cover object-center p-2 rounded-4xl shadow"
        />
        <Select value={selected} onValueChange={handleSelect}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent position="popper" sideOffset={4}>
            {navigation.map(({ name, icon: Icon }) => (
              <SelectItem key={name} value={name}>
                <span className="flex items-center gap-2">
                  {Icon && <Icon className="size-4" />}
                  {name}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {section?.sub_nav?.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    {item.to ? (
                      <Link
                        className="text-lg"
                        to={item.to}
                        activeOptions={{ exact: true }}
                        activeProps={{ 'data-active': true }}
                      >
                        {item.icon && <item.icon className="size-4" />}
                        {item.name}
                      </Link>
                    ) : (
                      <span>{item.name}</span>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupLabel>Theme</SidebarGroupLabel>
          <SidebarGroupContent>
            <ThemeSwitcher />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  )
}
