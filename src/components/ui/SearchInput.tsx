"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getSearchSuggestions } from "@/app/actions/productActions";

interface SearchInputProps {
    className?: string;
    placeholder?: string;
    autoFocus?: boolean;
}

export function SearchInput({ className = "", placeholder = "Search products...", autoFocus = false }: SearchInputProps) {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query.trim().length < 2) {
                setSuggestions([]);
                return;
            }

            setLoading(true);
            try {
                const results = await getSearchSuggestions(query);
                setSuggestions(results);
            } catch (error) {
                console.error("Failed to fetch suggestions", error);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(timeoutId);
    }, [query]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            setShowSuggestions(false);
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        }
    };

    const clearSearch = () => {
        setQuery("");
        setSuggestions([]);
        setShowSuggestions(false);
    };

    return (
        <div ref={searchRef} className={`relative ${className}`}>
            <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none" />
                <input
                    className="w-full rounded-lg border border-input bg-surface pl-10 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-shadow text-foreground placeholder:text-muted-foreground"
                    placeholder={placeholder}
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    autoFocus={autoFocus}
                />
                {query && (
                    <button
                        type="button"
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </form>

            {showSuggestions && (query.length >= 2) && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-surface rounded-xl shadow-xl border border-input overflow-hidden z-50">
                    {loading ? (
                        <div className="p-4 text-center text-sm text-muted-foreground">Loading...</div>
                    ) : suggestions.length > 0 ? (
                        <ul>
                            {suggestions.map((product) => (
                                <li key={product.id} className="border-b border-border last:border-0">
                                    <Link
                                        href={`/shop/${product.slug || product.id}`}
                                        className="flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors"
                                        onClick={() => setShowSuggestions(false)}
                                    >
                                        <div className="relative w-10 h-10 rounded-md overflow-hidden bg-muted shrink-0">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-foreground line-clamp-1">{product.name}</p>
                                            <p className="text-xs text-primary font-semibold">৳{product.price}</p>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                            <li className="p-2 text-center bg-muted/30">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleSearch(e as any);
                                    }}
                                    className="text-xs text-primary font-medium hover:underline"
                                >
                                    View all results for "{query}"
                                </button>
                            </li>
                        </ul>
                    ) : (query.length >= 2 && !loading) ? (
                        <div className="p-4 text-center text-sm text-muted-foreground">No suggestions found</div>
                    ) : null}
                </div>
            )}
        </div>
    );
}
