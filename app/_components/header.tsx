import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import SideMenu from "./side-menu";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-white px-5 py-6">
      <Image src="/logo.svg" alt="Barbershop MVP" width={100} height={26.09} />
      <div className="flex items-center gap-2">
        <SideMenu>
          <Button variant="outline" size="icon">
            <MenuIcon />
          </Button>
        </SideMenu>
      </div>
    </header>
  );
};

export default Header;
