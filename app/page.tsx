import Image from "next/image";
import Header from "./_components/header";
import SearchInput from "./_components/search-input";
import banner from "@/public/banner.png";
import BookingItem from "./_components/booking-item";
import prisma from "@/lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import Footer from "./_components/footer";
import {
  PageContainer,
  PageSection,
  PageSectionTitle,
  PageSectionScroller,
} from "./_components/ui/page";

const Home = async () => {
  const recommendedBarbershops = await prisma.barbershop.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  const popularBarbershops = await prisma.barbershop.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
  return (
    <main>
      <Header />
      <PageContainer>
        <SearchInput />
        <Image
          src={banner}
          alt="Agende agora!"
          sizes="100vw"
          className="h-auto w-full"
        />
        <PageSection>
          <PageSectionTitle>Agendamentos</PageSectionTitle>
          <BookingItem
            booking={{
              barbershop: {
                id: "1",
                name: "Barbearia do João",
                imageUrl:
                  "https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png",
                address: "Rua do João, 123",
                phones: ["(11) 99999-9999"],
              },
              id: "1",
              date: new Date(),
              cancelled: false,
              service: {
                name: "Corte de Cabelo",
                priceInCents: 10000,
              },
            }}
          />
        </PageSection>
        <PageSection>
          <PageSectionTitle>Recomendados</PageSectionTitle>
          <PageSectionScroller>
            {recommendedBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </PageSectionScroller>
        </PageSection>
        <PageSection>
          <PageSectionTitle>Populares</PageSectionTitle>
          <PageSectionScroller>
            {popularBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </PageSectionScroller>
        </PageSection>
      </PageContainer>
      <Footer />
    </main>
  );
};

export default Home;
