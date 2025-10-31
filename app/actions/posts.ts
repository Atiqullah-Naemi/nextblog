"use server";

import { PostFormValues } from "@/components/post-form";
import { authSession } from "@/lib/auth-utils";
import prisma from "@/lib/db";
import { Post, PostStatus } from "@/lib/generated/prisma/client";

export const getUniquePost = async (id: string) => {
  try {
    const session = await authSession();

    if (!session) {
      throw new Error("Unauthorized: User Id not found");
    }

    const res = (await prisma.post.findUnique({ where: { id } })) as Post;

    return res;
  } catch (err) {
    console.error({ err });
    throw new Error("Something went wrong");
  }
};

export const createPost = async (params: PostFormValues) => {
  try {
    const session = await authSession();

    if (!session) {
      throw new Error("Unauthorized: User Id not found");
    }

    const { categories, tags, id, ...rest } = params;
    const data = { ...rest, tags: tags.map((tag) => tag.value) };

    const res = await prisma.post.create({
      data: {
        ...data,
        status: data.status as PostStatus,
        userId: session.user.id,
      },
    });

    return res;
  } catch (err) {
    console.error({ err });
    throw new Error("Something went wrong");
  }
};

export const updatePost = async (params: PostFormValues) => {
  try {
    const session = await authSession();

    if (!session) {
      throw new Error("Unauthorized: User Id not found");
    }

    const { categories, tags, id, ...rest } = params;
    const data = { ...rest, tags: tags.map((tag) => tag.value) };

    const res = await prisma.post.update({
      where: { id },
      data: {
        ...data,
        userId: session.user.id,
        status: data.status as PostStatus,
      },
    });

    return res;
  } catch (err) {
    console.error({ err });
    throw new Error("Something went wrong");
  }
};

export const getAllPosts = async () => {
  try {
    const session = await authSession();

    if (!session) {
      throw new Error("Unauthorized: User Id not found");
    }

    const res = await prisma.post.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: "desc" },
      include: { category: true },
    });

    return res;
  } catch (err) {
    console.error({ err });
    throw new Error("Something went wrong");
  }
};

export const removePost = async (id: string) => {
  try {
    const session = await authSession();

    if (!session) {
      throw new Error("Unauthorized: User Id not found");
    }

    const res = await prisma.post.delete({
      where: { id },
    });

    return res;
  } catch (err) {
    console.error({ err });
    throw new Error("Something went wrong");
  }
};

export const getPostsByUser = async () => {
  try {
    const session = await authSession();

    if (!session) {
      throw new Error("Unauthorized: User Id not found");
    }

    const res = await prisma.post.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: "desc" },
    });

    return res;
  } catch (err) {
    console.error({ err });
    throw new Error("Something went wrong");
  }
};
