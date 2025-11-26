"use client";

import { SmartphoneIcon } from "lucide-react";
import { Button } from "./ui/button";

interface PhoneItemProps {
  phone: string;
}

const PhoneItem = ({ phone }: PhoneItemProps) => {
  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(phone);
    } catch (error) {
      console.error("Failed to copy phone:", error);
    }
  };

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-[10px]">
        <SmartphoneIcon className="text-foreground size-6" />
        <p className="text-foreground text-sm leading-[1.4]">{phone}</p>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="rounded-full"
        onClick={handleCopyPhone}
      >
        Copiar
      </Button>
    </div>
  );
};

export { PhoneItem };
