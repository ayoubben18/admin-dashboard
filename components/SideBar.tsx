import {
  HomeIcon,
  LineChartIcon,
  Package2Icon,
  PackageIcon,
  ShoppingCartIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const sideBarLinks = [
  {
    link: "/dashboard",
    icon: <HomeIcon className="h-4 w-4" />,
  },
  {
    link: "/orders",
    icon: <ShoppingCartIcon className="h-4 w-4" />,
  },
  {
    link: "/products",
    icon: <PackageIcon className="h-4 w-4" />,
  },
  {
    link: "/customers",
    icon: <UsersIcon className="h-4 w-4" />,
  },
  {
    link: "/analytics",
    icon: <LineChartIcon className="h-4 w-4" />,
  },
];

const SideBar = () => {
  return (
    <aside className="hidden w-64 flex-col border-r bg-muted/40 p-6 lg:flex">
      <div className="flex h-14 items-center">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold"
          prefetch={false}
        >
          <Package2Icon className="h-6 w-6" />
          <span>E-commerce</span>
        </Link>
      </div>
      <nav className="mt-6 flex flex-col space-y-1">
        {sideBarLinks.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            prefetch={false}
          >
            {item.icon}
            {item.link.replace("/", "")}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default SideBar;
