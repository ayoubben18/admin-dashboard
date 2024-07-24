import NavBar from "./NavBar";
import SideBar from "./SideBar";

interface Props {
  children: React.ReactNode;
}

export default function AppWrapper({ children }: Props) {
  return (
    <div className="hidden sm:flex min-h-screen w-full overflow-hidden">
      <SideBar />
      <div className="flex flex-1 flex-col">
        <NavBar />
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
