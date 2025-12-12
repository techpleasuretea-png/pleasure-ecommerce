import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const categories = [
    { name: "Fruits", color: "bg-[#FFF2E5] dark:bg-[#5C3A20]", icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBcX85-91UkwI6MotWoVLOOFhhr-0d01diNJ7Af0Jy2d_-TbZie6Z1ziUefsWifKhDswRqar8C8Ja5gdn7P-qbru8tVvt4ift3a84HxgnKqslU01g6H8x6rzaHSQKlkvdeP7N7R8SzYzCUIGLEd8Y1vzVS6f8RuHmsXlkAzHQzfpWw8wrIgKOI26c975kYpBr_wMmBK-L0AbZuOISjRHgeQDdqx91esZtHNkmGPDyjUTajSH2FxVqcCCDs1R8H64YrakG0xI65bBw" },
    { name: "Vegetables", color: "bg-[#EAF3E6] dark:bg-[#2B4022]", icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRx-4QwsXykjPs5Tts-g4GZiHo50DJwkK_aIQ7N9MmAMLk1aLCu1t-oKyOulv4ejMLLETDUQMDmHz_vafcKe390Jg_n65dhQ8NbSqlzmdGgFNDbK5q0ksfKMNA5Ts_nXFQpmh5A3QneTqxVDJUzXFsce98SDrJsdWnUsnXDacP8MSRqv-1FkbgQKf78HHNzqhQHKQnr1jou4Ab2txZBndedALPizc-FOBSZOnsFxafzGpBZDgA8SqC7N29rJpsRYsOXOSdbGu_aME" },
    { name: "Dairy", color: "bg-[#E6F4FF] dark:bg-[#1E435F]", icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtUIriRHMO78Lha6iwa0djf40KrA7NUKzm65pZn7NmyUTbERKiDAsYeidSD_j3nyKWQf3KGxcIQQfDrA7BsrbKfzORwZUv8Gz4H9tY3FFL489kPbsurGIdMPxYiVbcsW3UiuFAcVOvpK1nAWgGTdg0mXv1YFHQMpZADGc0yqyhaO4w1vcPGg0xjrGrFUxS-B84PNsvXB7P1l-_MQ17WFgbZEK7YoKYGSwmWQyqKHLqHKjJZsPfTe6HwEchNm8M6d864DJGIUFmfJ8" },
    { name: "Bakery", color: "bg-[#FEF5E5] dark:bg-[#5C4520]", icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmQg-_Gd3SblUtpgIPlLhi2WGjhUFr7Xy6oMtKXkQQkYc26LuF9Kp_Jpjvxp2Qi2Iiag7uyUg_IQGyLCoowbLKRr5AwP0YI8fmFka7UNBnCIjF3fendBO35CPiULR7b9LjXCgEWBkv8ztIJEgatVdZUp8Y9zFxA4Yr3FiR4Pc6LcCPYtRJNWND6LKXeSlqx-ZiIDuiz10l07ckwiDbrXEs_W47pTSzvVg1KnMmEfexcB3Ep8hryMz_-KSn9dSfi-6CbGja3wbor8A" },
    { name: "Meat", color: "bg-[#FBE8E5] dark:bg-[#5C2B20]", icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVcIACWS6ZpZUfhWI-bBwVt0Q5o2iPj7XZERwhAwQ4VcYKlW6aWJ3J6m_seGZ8r1irhe3OA8pNTIL1SHTrylZIVvZP51G26X8ZiP3T_Hb_OrCl_djBvzriHt5SWupL1CXzys6D1Vyxe7ml0KudNiaj8xoV2hRRpjEQBCIVJpg_AJVjxMfKxgFvyekkarrw7jkgDliM-rZh5C6-9d-UYe5G7Fo6Q2TLr8ciS5UYETqufqZJxUfyAqzUdtkS3TFhTg2jy4XRzAokEVE" },
    { name: "Drinks", color: "bg-[#E7F6F0] dark:bg-[#205C41]", icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_Tw5oCz4OpfVN-GmZ7msIRDshk2lfU9-EwjoolQjOXwkFVXh4wn8fmrMAlMVbxRtMlmJXU-oL4kDfT9P9vt_LUtb0fgrmhW_QSePDKqVOdPvS4eVQi1Itk83rrHZ1odbkjcMkP34E4ov_3tgMUOUsWwvfOSwuRFSpO1O0rqgTjQFNtZmfO9efNoICCcalJVxBh1bocXQKpWgh5e-4aoPN2o3wjbH3FLB8B8blgOyl2qTQ6hNJng_wXF5Wy-_MTfbWA3GvcFyE0DE" },
    { name: "Snacks", color: "bg-[#F0F0F0] dark:bg-[#4A4A4A]", icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuBwF0Uj3nlFW_1885PINPJFCV5Q8RucF_iM6xdAPw7q6zIPl2SKIMwiaMnk6j6TJUSDYBn6AfdAlcjLCFLVnnhTnIDpbVOEJDZHZSy5Oxw-UchQMzM_kNsAfnavGcJLSPNzhNbFJGMJgG-pyjhGDNjlI1tm0yfqb_PRfecYI6KO5a7CTCCyrM5gkb6DqEDPvYA9nJrfBEeNBJyl7EfkTWTPVOAm9iuRa_V8q2UHQblxVmaGVeeBKgHiIiwNpFh2GjOnsMIevV9tZJk" },
    { name: "Seafood", color: "bg-[#E5F5FA] dark:bg-[#1F5466]", icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMpbXKMQJF9FLP_tSEiqFMxcBfGIA2thlOXd4f9YcbQT10Wuk2j13tsBCrQyzYrqEZFDCeo-fDUhy6Ujs6l6wG0QL4FeNSkaPQnRRVvD8Htx22Hg5M-ZPu1hUOpgYmJix1z_h5fe5uGTapm77FUCOvWKsEx0SHERUw6XCm7g3WCaWoV126ePVB3NYt0H1jDsq1k881XFGjIzCKD2_Z5Qs6eHJYLJIPs_ivhpQYwTELBBa8Dc90-ILG6vRzWpWqquMtUzgpJq2tZc4" },
    { name: "Pantry", color: "bg-[#FFF8E1] dark:bg-[#5C5320]", icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhw-ep0DP6vqt8HrMWo9ISO864Z7XPW2hJgNiXc56CR8KfQDcmsEHVQBxXkKtKyA7RLxSCCTLrFRRmAS67gX1_EQxNlXKS4dt5bYkVTQYPhql10NCm2Z4lh0GXOW2tEZDd8J-9ox_yZOJQkrS5MOzDzB0hE6F4aiZDZLK1ue1bK3BUAcW8GrF6pBQ0EPjAkNkdApYZUmF_H45rnZlG7-sEzMdaxlwwDORNVa26ufIrTBNWBLdqe3He6lGa8FQ1iFar1yhGBWpdBCI" },
    { name: "Spices", color: "bg-[#F3E5F5] dark:bg-[#4A205C]", icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuADCTr5Cd1o-G-kiU8luTyrX-12MWgWtYC8u4mylL0gwRZe-eD5xuGUkwEvuNBr3vL0gZaFnFA9sSjT-zHzzvS3OSFKFcJMoV_Si_bFUKOQNVvKjUQZ6K8_yhA2Ror3ub5JFaI3k3hrN9CAx-yB7X7_olNF82574PIHB6PJvyR4kTNc4eFw9rJiEY5Aj4pKgP7PBTu2iaySZCOMtXnM_5HBmnOUHk3CEH6iZAXHDZuv9VLbs3pb5xfz4UsGwa8Q0GggyP82g0VQh2s" },
];

// Display top 5 categories plus a "See All" button
const displayCategories = categories.slice(0, 5);

export function CategoryGrid() {
    return (
        <section className="py-16 px-4 md:px-8 max-w-screen-xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold font-display">Shop by Category</h2>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-12">
                {displayCategories.map((cat, idx) => (
                    <Link key={idx} href={`/category/${cat.name.toLowerCase()}`} className="text-center group block">
                        <div className={`${cat.color} w-24 h-24 md:w-36 md:h-36 mx-auto rounded-full flex items-center justify-center transform group-hover:-translate-y-2 transition-transform duration-300 shadow-sm group-hover:shadow-md`}>
                            <img
                                src={cat.icon}
                                alt={`${cat.name} category icon`}
                                className="w-12 h-12 md:w-20 md:h-20 object-contain drop-shadow-sm"
                            />
                        </div>
                        <p className="mt-3 md:mt-4 text-sm md:text-base font-medium group-hover:text-primary transition-colors">{cat.name}</p>
                    </Link>
                ))}

                <Link href="/categories" className="text-center group flex flex-col items-center">
                    <div className="bg-gray-100 dark:bg-gray-800 w-24 h-24 md:w-36 md:h-36 mx-auto rounded-full flex items-center justify-center transform group-hover:-translate-y-2 transition-all duration-300 group-hover:bg-primary/10 dark:group-hover:bg-primary/20 group-hover:shadow-md">
                        <ArrowRight className="w-8 h-8 md:w-12 md:h-12 text-gray-400 group-hover:text-primary transition-colors" />
                    </div>
                    <p className="mt-3 md:mt-4 text-sm md:text-base font-medium group-hover:text-primary transition-colors">See All</p>
                </Link>
            </div>
        </section>
    );
}
