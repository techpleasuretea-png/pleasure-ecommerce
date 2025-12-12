import { ShieldCheck, Truck, Recycle } from "lucide-react";

export function Features() {
    return (
        <section className="hidden md:block mx-4 md:mx-8 bg-primary/5 dark:bg-primary/10 rounded-3xl p-8 md:p-12 my-16">
            <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center">
                    <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg shadow-primary/30 mb-4">
                        <ShieldCheck className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-lg font-display">100% Organic Certified</h3>
                    <p className="text-sm text-subtext-light dark:text-subtext-dark mt-2 max-w-xs">
                        All our products are certified organic, ensuring no harmful pesticides or chemicals.
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg shadow-primary/30 mb-4">
                        <Truck className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-lg font-display">Farm-to-Table Freshness</h3>
                    <p className="text-sm text-subtext-light dark:text-subtext-dark mt-2 max-w-xs">
                        We partner with local farms to bring you the freshest produce possible, often within days of harvest.
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg shadow-primary/30 mb-4">
                        <Recycle className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-lg font-display">Sustainable Packaging</h3>
                    <p className="text-sm text-subtext-light dark:text-subtext-dark mt-2 max-w-xs">
                        Our commitment to the planet extends to our packaging, which is recyclable or compostable.
                    </p>
                </div>
            </div>
        </section>
    );
}
