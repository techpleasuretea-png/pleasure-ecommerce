import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-gray-200 dark:bg-gray-700", className)}
            {...props}
        />
    );
}

export function ProductCardSkeleton() {
    return (
        <div className="bg-white dark:bg-card-dark rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm">
            <Skeleton className="h-48 w-full" />
            <div className="p-4 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <div className="flex gap-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-16" />
                </div>
                <div className="flex gap-2 pt-2">
                    <Skeleton className="h-10 flex-1" />
                    <Skeleton className="h-10 flex-1" />
                </div>
            </div>
        </div>
    );
}

export function CategorySkeleton() {
    return (
        <div className="flex flex-col items-center gap-3">
            <Skeleton className="w-24 h-24 md:w-36 md:h-36 rounded-full" />
            <Skeleton className="h-5 w-20" />
        </div>
    );
}
