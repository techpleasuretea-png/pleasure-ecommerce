"use client";

import Link from "next/link";
import Image from "next/image";

export function MobileHero() {
    return (
        <div className="@container">
            <div className="@[480px]:px-4 px-4 py-3">
                <div
                    className="bg-cover bg-center flex flex-col justify-end overflow-hidden @[480px]:rounded-xl rounded-xl min-h-48"
                    style={{
                        backgroundImage:
                            'linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 45%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDpQGItKrV_LNC6MPWKUK89j6wKHNano7O32fHvcNLXPYVeD6tOHz6wNrhG33JGiPysz7yO-xd3Erww3l_IK61YoRFNA8oBHQtMg9XfSXYD2qqlqJOv7sai2HdgHy9mpx0edMWhF6vWQ4yaZh7-aQw4ZisM_WpiSDk0DT9JNRTPedUP2qGBJ1dbLVL0tmih_85Br_1NJKy_Ggug-uDhup5oenRTHym6swmvhkEYBN1mxHe3KcYiGVf4dsZKxK-Y_KaJkYOMX9HpXDIA")',
                    }}
                >
                    <div className="p-5 text-white">
                        <h2 className="text-xl font-bold">Fresh This Week</h2>
                        <p className="text-sm">Organic strawberries, straight from the farm.</p>
                        <button className="mt-4 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-primary">
                            Shop Now
                        </button>
                    </div>
                    <div className="flex justify-center gap-2 pb-3 pt-1">
                        <div className="size-1.5 rounded-full bg-white"></div>
                        <div className="size-1.5 rounded-full bg-white opacity-50"></div>
                        <div className="size-1.5 rounded-full bg-white opacity-50"></div>
                        <div className="size-1.5 rounded-full bg-white opacity-50"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
