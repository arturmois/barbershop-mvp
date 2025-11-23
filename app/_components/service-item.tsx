"use client";

import Image from "next/image";
import type {
  BarbershopService,
  Barbershop,
} from "@/app/generated/prisma/client";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Calendar } from "./ui/calendar";
import { Separator } from "./ui/separator";
import { useState } from "react";
import { createBooking } from "../_actions/create-booking";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];

interface ServiceItemProps {
  service: BarbershopService;
  barbershop: Pick<Barbershop, "name">;
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  );
  const [sheetOpen, setSheetOpen] = useState(false);
  const { executeAsync, isPending } = useAction(createBooking);

  const formatPrice = (priceInCents: number) => {
    const price = priceInCents / 100;
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const formatPriceInReais = (priceInCents: number) => {
    const price = priceInCents / 100;
    return `R$${price.toFixed(0).replace(".", ",")}`;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
    }).format(date);
  };

  const handleConfirm = async () => {
    if (!selectedDate || !selectedTime) return;
    const hoursSplit = selectedTime.split(":");
    const hours = parseInt(hoursSplit[0]);
    const minutes = parseInt(hoursSplit[1]);
    const date = new Date(selectedDate);
    date.setHours(hours, minutes, 0, 0);
    const result = await executeAsync({
      serviceId: service.id,
      date,
    });
    if (result.serverError || result.validationErrors) {
      toast.error(result.validationErrors?._errors?.[0]);
      return;
    }
    toast.success("Reserva criada com sucesso");

    setSelectedDate(undefined);
    setSelectedTime(undefined);
    setSheetOpen(false);
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
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button size="sm" className="rounded-full px-4 py-2">
                Reservar
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-0 overflow-y-auto p-0">
              <SheetHeader className="border-border border-b px-5 py-6">
                <SheetTitle>Fazer Reserva</SheetTitle>
              </SheetHeader>

              <div className="flex flex-1 flex-col gap-6 p-5">
                <div className="flex flex-col gap-3">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="w-full"
                  />
                </div>

                {selectedDate && (
                  <>
                    <Separator />
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                        {timeSlots.map((time) => (
                          <Button
                            key={time}
                            variant={
                              selectedTime === time ? "default" : "outline"
                            }
                            className="shrink-0 rounded-full"
                            onClick={() => setSelectedTime(time)}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {selectedDate && selectedTime && (
                  <>
                    <Separator />
                    <div className="border-border bg-card flex flex-col gap-3 rounded-2xl border p-5">
                      <div className="flex items-center justify-between">
                        <p className="text-muted-foreground text-sm">
                          {service.name}
                        </p>
                        <p className="text-card-foreground text-sm font-bold">
                          {formatPriceInReais(service.priceInCents)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-muted-foreground text-sm">Data</p>
                        <p className="text-card-foreground text-sm">
                          {formatDate(selectedDate)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-muted-foreground text-sm">Horário</p>
                        <p className="text-card-foreground text-sm">
                          {selectedTime}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-muted-foreground text-sm">
                          Barbearia
                        </p>
                        <p className="text-card-foreground text-sm">
                          {barbershop.name}
                        </p>
                      </div>
                    </div>
                  </>
                )}

                <Button
                  onClick={handleConfirm}
                  disabled={isPending || !selectedDate || !selectedTime}
                  className="w-full"
                >
                  Confirmar
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;
