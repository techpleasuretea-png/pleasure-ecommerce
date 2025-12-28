import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Hero } from "@/components/ui/Hero";
import { CategoryGrid } from "@/components/ui/CategoryGrid";
import { FeaturedProducts } from "@/components/ui/FeaturedProducts";
import { Features } from "@/components/ui/Features";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <CategoryGrid />
        <FeaturedProducts />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
