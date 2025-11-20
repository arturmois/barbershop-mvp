import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
  return <header className="bg-white flex justify-between items-center px-5 py-6">
    <Image src="/logo.svg" alt="Barbershop MVP" width={100} height={26.09} />
    <Button variant="outline" size="icon">
      <MenuIcon />
    </Button>
  </header>;
};

export default Header;