import Image from "next/image";
import type { BarbershopService } from "@/app/generated/prisma/client";
import { Button } from "./ui/button";

interface ServiceItemProps {
  service: BarbershopService;
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  const formatPrice = (priceInCents: number) => {
    const price = priceInCents / 100;
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <div className="border-border bg-card flex w-full items-center gap-3 rounded-2xl border p-3">
      <div className="relative size-[110px] shrink-0 overflow-hidden rounded-[10px]">
        <Image
          src={service.imageUrl}
          alt={service.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between self-stretch">
        <div className="flex flex-col gap-1">
          <p className="text-card-foreground text-sm leading-[1.4] font-bold">
            {service.name}
          </p>
          <p className="text-muted-foreground text-sm leading-[1.4]">
            {service.description}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-card-foreground text-sm leading-[1.4] font-bold">
            {formatPrice(service.priceInCents)}
          </p>
          <Button size="sm" className="rounded-full px-4 py-2">
            Reservar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;
