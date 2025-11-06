"use server";

import prisma from "@/lib/db";
import { PostStatus } from "@/lib/generated/prisma/client";

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

export async function searchContent(query: string) {
  if (query.trim().length < 2) {
    return { results: [] };
  }

  try {
    const [posts, categories] = await Promise.all([
      prisma.post.findMany({
        where: {
          status: PostStatus.published,
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { content: { contains: query, mode: "insensitive" } },
            { tags: { hasSome: [query] } },
          ],
        },
        select: { id: true, title: true, imageUrl: true, slug: true },
        take: 10,
        orderBy: { updatedAt: "desc" },
      }),

      prisma.category.findMany({
        where: {
          name: { contains: query, mode: "insensitive" },
        },
        select: { id: true, name: true },
        take: 10,
        orderBy: { updatedAt: "desc" },
      }),
    ]);

    const results: SearchResult[] = [
      ...posts.map((post) => ({
        type: "post" as const,
        title: post.title,
        url: `/blog/posts/${post.slug}`,
        imageUrl: post.imageUrl,
        id: post.id,
      })),

      ...categories.map((category) => ({
        type: "category" as const,
        name: category.name,
        url: `/blog/category/${category.id}`,
        id: category.id,
      })),
    ];

    return { results };
  } catch (err) {
    console.error({ err });
  }
}
