import {
  CircleDollarSign,
  Coins,
  Gem,
  LayoutDashboard,
  LucideIcon,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";

export type SidebarRoute = {
  icon: LucideIcon;
  label: string;
  href: string;
};

export const sidebarRoutes: SidebarRoute[] = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Gem,
    label: "Wallet",
    href: "/dashboard/wallet",
  },
  {
    icon: Coins,
    label: "Create",
    href: "/dashboard/create",
  },
  {
    icon: CircleDollarSign,
    label: "Sales",
    href: "/dashboard/sales",
  },
  {
    icon: ShoppingCart,
    label: "Browse",
    href: "/dashboard/browse",
  },
  {
    icon: TrendingUp,
    label: "Transactions",
    href: "/dashboard/transactions",
  },
];
