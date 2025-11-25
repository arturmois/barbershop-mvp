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
import { getDateAvailableTimeSlots } from "../_actions/get-date-available-time-slots.";
import { useQuery } from "@tanstack/react-query";

interface ServiceItemProps {
  service: BarbershopService;
  barbershop: Pick<Barbershop, "name">;
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  );
  const { executeAsync, isPending } = useAction(createBooking);
  const [sheetOpen, setSheetOpen] = useState(false);
  const { data: availableTimeSlots } = useQuery({
    queryKey: ["date-available-time-slots", service.barbershopId, selectedDate],
    queryFn: () =>
      getDateAvailableTimeSlots({
        barbershopId: service.barbershopId,
        date: selectedDate!,
      }),
    enabled: Boolean(selectedDate),
  });

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

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
      month: "short",
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
                    onSelect={handleDateSelect}
                    className="w-full"
                  />
                </div>

                {selectedDate && (
                  <>
                    <Separator />
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                        {availableTimeSlots?.data?.map((time) => (
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
