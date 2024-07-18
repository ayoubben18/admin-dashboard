import React from "react";
import { Button } from "./ui/button";
import {
  ArrowDownRightFromSquareIcon,
  MenuIcon,
  SearchIcon,
} from "lucide-react";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const NavBar = () => {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background px-4 shadow-sm lg:h-16 lg:px-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="lg:hidden">
          <MenuIcon className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold lg:text-xl">E-commerce</h1>
      </div>
      <div className="flex items-center gap-4">
        <form>
          <div className="relative">
            <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="h-8 pr-4 pl-8 text-sm lg:h-9 lg:text-base"
            />
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full lg:h-9 lg:w-9"
            >
              <ArrowDownRightFromSquareIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default NavBar;
