import Image from "next/image";
import Header from "./_components/header";
import SearchInput from "./_components/search-input";
import banner from "@/public/banner.png";
import BookingItem from "./_components/booking-item";

const Home = () => {
  return (
    <>
      <Header />
      <div className="space-y-5 px-5">
        <SearchInput />
        <Image
          src={banner}
          alt="Agende agora!"
          sizes="100vw"
          className="h-auto w-full"
        />
        <h2 className="text-foreground text-xs font-semibold uppercase">
          Agendamentos
        </h2>
        <BookingItem
          serviceName="Corte de Cabelo"
          barberShopName="Barbearia do João"
          barberShopImageUrl="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"
          date={new Date("2025-01-01")}
        />
      </div>
    </>
  );
};

export default Home;
