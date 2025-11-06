"use client";

import { searchContent } from "@/app/actions/search";
import { DialogTitle } from "@radix-ui/react-dialog";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { Input } from "./ui/input";
import { Spinner } from "./ui/spinner";

type SearchResult =
  | {
      type: "post";
      id: string;
      title: string;
      url: string;
      imageUrl: string;
    }
  | {
      type: "category";
      id: string;
      name: string;
      url: string;
    };

export default function GlobalSearchModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (timer.current) window.clearTimeout(timer.current);

    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    timer.current = window.setTimeout(async () => {
      setIsLoading(true);

      try {
        const data = await searchContent(query);
        setResults(data?.results ?? []);
      } catch (err) {
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }, 280);

    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [query]);

  useEffect(() => {
    if (!isOpen) {
      setIsLoading(false);
      setResults([]);
      setQuery("");
    }
  }, [isOpen]);

  const grouped = useMemo(() => {
    const posts = results.filter((r) => r.type === "post") as Extract<
      SearchResult,
      { type: "post" }
    >[];
    const categories = results.filter((r) => r.type === "category") as Extract<
      SearchResult,
      { type: "category" }
    >[];

    return { posts, categories };
  }, [results]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-xl p-0 overflow-hidden min-h-48">
        <DialogHeader className="px-4 pt-4 pb-2">
          <DialogTitle>Search for anything</DialogTitle>
        </DialogHeader>

        <div className="px-4 pb-3">
          <Input
            autoFocus
            placeholder="Search posts, categories, ..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="max-h-80 overflow-auto px-2 pb-4">
          {isLoading && (
            <div className="p-5 flex items-center justify-center">
              <Spinner className="size-6" />
            </div>
          )}

          {!isLoading && results.length === 0 && query.length >= 2 && (
            <div className="px-4 py-2 text-sm text-muted-fourground">
              No results found
            </div>
          )}

          {grouped.posts.length > 0 && (
            <div className="py-2">
              <div className="px-3 pb-1 text-xs font-semibold uppercase text-muted-foreground">
                Posts
              </div>
              <div className="flex flex-col gap-1">
                {grouped.posts.map((post) => (
                  <Link
                    href={post.url}
                    className="px-3 py-2 rounded-sm"
                    key={post.id}
                  >
                    <div className="flex flex-col">
                      <div className="text-sm font-medium">{post.title}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {grouped.categories.length > 0 && (
            <div className="py-2">
              <div className="px-3 pb-1 text-xs font-semibold uppercase text-muted-foreground">
                Categories
              </div>
              <div className="flex flex-col gap-1">
                {grouped.categories.map((category) => (
                  <Link
                    href={category.url}
                    className="px-3 py-2 rounded-sm"
                    key={category.id}
                  >
                    <div className="flex flex-col">
                      <div className="text-sm font-medium">{category.name}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
