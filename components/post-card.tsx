"use client";

import { Category, Post } from "@/lib/generated/prisma/client";
import { stripHtml } from "@/lib/utils";
import { format } from "date-fns";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface PostProps {
  post: Post & { category: Category | null } & {
    user: {
      name: string;
      id: string;
      image: string | null;
      savedPosts: string[];
    };
  };
}

export default function PostCard({ post }: PostProps) {
  const excertp = stripHtml(post.content);

  return (
    <Card className="w-full p-0 pb-4 border-0 shadow-md gap-1 relative">
      <div className="relative h-60">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="rounded-sm object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader className="gap-0">
        <CardTitle className="font-semibold line-clamp-3 pt-2">
          {post.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm line-clamp-3">{excertp} </p>

        <div className="flex gap-2 py-6 flex-wrap">
          {post.tags.map((tag) => (
            <Link href={`/blog/tag/${tag}`} key={tag}>
              <Badge variant="secondary">#{tag}</Badge>
            </Link>
          ))}
        </div>

        <div className="flex justify-between w-full gap-2">
          <div className="flex gap-1">
            <div className="relative h-8 w-8 rounded-full shadow-lg">
              <Image
                className="rounded-full shadow-lg"
                src={post.user.image!}
                alt={post.user.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-semibold">
                {post.user.name}
              </span>
              <span className="text-[10px] text-neutral-500 font-semibold">
                {format(post.createdAt, "dd/MM/yyyy")}
              </span>
            </div>
          </div>

          <Link
            href={`/blog/posts/${post.slug}`}
            className="flex gap-1 text-sx items-center font-medium"
          >
            Read more <MoveRight />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
