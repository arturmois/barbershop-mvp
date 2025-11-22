"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { LogInIcon, MenuIcon, UserIcon } from "lucide-react";
import { signIn, signOut, useSession } from "@/lib/auth-client";

const Header = () => {
  const { data: session } = useSession();

  const handleSignIn = async () => {
    await signIn.social({
      provider: "google",
    });
  };

  const handleSignOut = async () => await signOut();

  return (
    <header className="flex items-center justify-between bg-white px-5 py-6">
      <Image src="/logo.svg" alt="Barbershop MVP" width={100} height={26.09} />
      <div className="flex items-center gap-2">
        {session ? (
          <Button variant="outline" size="icon" onClick={handleSignOut}>
            <UserIcon className="size-4" />
          </Button>
        ) : (
          <Button variant="outline" size="icon" onClick={handleSignIn}>
            <LogInIcon />
          </Button>
        )}
        <Button variant="outline" size="icon">
          <MenuIcon />
        </Button>
      </div>
    </header>
  );
};

export default Header;
