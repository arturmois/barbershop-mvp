import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { Separator } from "@/app/_components/ui/separator";
import ServiceItem from "@/app/_components/service-item";
import PhoneItem from "@/app/_components/phone-item";
import Footer from "@/app/_components/footer";

const BarbershopPage = async (props: PageProps<"/barbershops/[id]">) => {
  const { id } = await props.params;
  const barbershop = await prisma.barbershop.findUnique({
    where: { id },
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    return notFound();
  }

  return (
    <main className="bg-background flex min-h-screen flex-col">
      <div className="relative h-[297px] w-full">
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute top-0 left-0 w-full px-5 pt-6">
          <Link href="/">
            <Button
              variant="outline"
              size="icon"
              className="bg-background rounded-full"
            >
              <ChevronLeftIcon className="size-5" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-background flex-1 rounded-t-[24px]">
        <div className="flex items-center gap-[5px] px-5 pt-6">
          <div className="relative size-[30px] shrink-0 overflow-hidden rounded-full">
            <Image
              src={barbershop.imageUrl}
              alt={barbershop.name}
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-foreground text-xl font-bold">
            {barbershop.name}
          </h1>
        </div>

        <div className="px-5">
          <p className="text-muted-foreground mt-1 text-sm leading-[1.4]">
            {barbershop.address}
          </p>
        </div>

        <div className="px-5 py-6">
          <Separator />
        </div>

        <div className="space-y-3 px-5">
          <h2 className="text-foreground text-xs font-bold uppercase">
            Sobre nós
          </h2>
          <p className="text-foreground text-sm leading-[1.4]">
            {barbershop.description}
          </p>
        </div>

        <div className="px-5 py-6">
          <Separator />
        </div>

        <div className="space-y-3 px-5">
          <h2 className="text-foreground text-xs font-bold uppercase">
            Serviços
          </h2>
          <div className="space-y-3">
            {barbershop.services.map((service) => (
              <ServiceItem key={service.id} service={service} />
            ))}
          </div>
        </div>

        <div className="px-5 py-6">
          <Separator />
        </div>

        <div className="space-y-3 px-5">
          <h2 className="text-foreground text-xs font-bold uppercase">
            Contato
          </h2>
          {barbershop.phones.map((phone, index) => (
            <PhoneItem key={index} phone={phone} />
          ))}
        </div>

        <div className="mt-[60px]">
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default BarbershopPage;
