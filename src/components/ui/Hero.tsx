import Link from "next/link";
import { MobileHero } from "../mobile/MobileHero";

export function Hero() {
    return (
        <>
            <div className="md:hidden">
                <MobileHero />
            </div>

            <section className="hidden md:flex relative mt-4 h-[500px] rounded-2xl overflow-hidden items-center justify-center text-center mx-4 md:mx-8">
                {/* Use a placeholder or the actual image if available. The HTML used a googleusercontent link. I'll use a placeholder for now or the link if I can trust it won't break. The user said 'images/hero.jpg' in my mind, but actually the HTML had a link. I'll stick to the link or a placeholder. I will use the link from the HTML for now, as I don't have local images yet except logo. */}
                <img
                    alt="A variety of fresh organic vegetables including cabbage, zucchini, and bell peppers"
                    className="absolute inset-0 w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjTeh_QrSiK3wT_ZtH7stPOxNVi2qSQhO2xlHQ-tZ6Nxbkqu0oXpkw4c6_aRsYzV91peHo-KSvpH_ZVQNP-9wghi7BtmGxfZIXhOeaH-Hv96hfBx_yBuKk_zRsPtxKQD_WAzjKJxLzOW6lAXm4Ns_-Xs9jFe9x3W5LU5GpUOKyfx1tUGr9XWlmB9Ws6SaxF4xG_BHAHpwEJaihwUoXvx398JL7lGEe5AUnQG95yqJpf9K6K1te3DBGKCGo7xDk2C5NHt91GAXfEVA"
                />
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative text-white px-4 z-10">
                    <h1 className="text-4xl md:text-6xl font-bold font-display leading-tight">
                        Purely Organic, <br className="hidden md:block" /> Perfectly Fresh.
                    </h1>
                    <p className="mt-4 max-w-xl mx-auto text-lg text-gray-200">
                        Experience the best of nature with our curated selection of certified organic produce and pantry staples, delivered to your door.
                    </p>
                    <Link href="/shop">
                        <button className="mt-8 bg-primary text-white font-semibold py-3 px-8 rounded-lg hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/30">
                            Shop All Products
                        </button>
                    </Link>
                </div>
            </section>
        </>
    );
}
