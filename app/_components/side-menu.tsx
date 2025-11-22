"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "@/lib/auth-client";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  HomeIcon,
  CalendarIcon,
  LogOutIcon,
  LogInIcon,
  ScissorsIcon,
  MoonIcon,
  SmileIcon,
  SparklesIcon,
  UserIcon,
} from "lucide-react";

interface SideMenuProps {
  children: React.ReactNode;
}

const SideMenu = ({ children }: SideMenuProps) => {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut();
  };

  const categories = [
    { icon: ScissorsIcon, label: "Cabelo" },
    { icon: MoonIcon, label: "Barba" },
    { icon: SparklesIcon, label: "Acabamento" },
    { icon: SmileIcon, label: "Sobrancelha" },
    { icon: SparklesIcon, label: "Massagem" },
    { icon: UserIcon, label: "Hidratação" },
  ];

  const handleSignIn = async () => {
    await signIn.social({ provider: "google" });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="w-[85%] p-0 sm:max-w-[85%]">
        {session?.user ? (
          <div className="flex h-full flex-col">
            <SheetHeader className="border-border border-b p-5">
              <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
              <div className="flex items-center gap-3">
                <Avatar className="size-12">
                  <AvatarImage src={session.user.image || ""} />
                  <AvatarFallback>
                    {session.user.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-semibold">{session.user.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {session.user.email}
                  </p>
                </div>
              </div>
            </SheetHeader>

            <div className="flex flex-1 flex-col gap-2 p-5">
              <Button variant="ghost" className="justify-start gap-3" asChild>
                <Link href="/">
                  <HomeIcon className="size-4" />
                  Início
                </Link>
              </Button>

              <Button variant="ghost" className="justify-start gap-3" asChild>
                <Link href="/bookings">
                  <CalendarIcon className="size-4" />
                  Agendamentos
                </Link>
              </Button>

              <Separator className="my-2" />

              <div className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category.label}
                    variant="ghost"
                    className="w-full justify-start gap-3"
                  >
                    <category.icon className="size-4" />
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="border-border border-t p-5">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3"
                onClick={handleLogout}
              >
                <LogOutIcon className="size-4" />
                Sair
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex h-full flex-col">
            <SheetHeader className="border-border border-b p-5">
              <SheetTitle className="text-lg font-semibold">
                Olá, faça seu login!
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-1 flex-col gap-2 p-5">
              <Button variant="ghost" className="justify-start gap-3" asChild>
                <Link href="/">
                  <HomeIcon className="size-4" />
                  Início
                </Link>
              </Button>

              <Button variant="ghost" className="justify-start gap-3" asChild>
                <Link href="/bookings">
                  <CalendarIcon className="size-4" />
                  Agendamentos
                </Link>
              </Button>

              <Separator className="my-2" />

              <div className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category.label}
                    variant="ghost"
                    className="w-full justify-start gap-3"
                  >
                    <category.icon className="size-4" />
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="border-border border-t p-5">
              <Button
                variant="default"
                className="w-full justify-start gap-3"
                asChild
              >
                <Button onClick={handleSignIn}>
                  <LogInIcon className="size-4" />
                  Fazer Login
                </Button>
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default SideMenu;
