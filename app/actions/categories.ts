"use server";

import { CategoryProps } from "@/hooks/use-categories";
import { authSession } from "@/lib/auth-utils";
import prisma from "@/lib/db";

export const getCategories = async () => {
  try {
    const session = await authSession();

    if (!session) {
      throw new Error("Unauthorized: User Id not found");
    }

    const res = await prisma.category.findMany({
      orderBy: { createdAt: "desc" },
    });

    return res;
  } catch (err) {
    console.error({ err });
    throw new Error("Something went wrong");
  }
};

export const getCategoriesWithUser = async () => {
  try {
    const session = await authSession();

    if (!session) {
      throw new Error("Unauthorized: User Id not found");
    }

    const res = await prisma.category.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: true,
      },
    });

    return res;
  } catch (err) {
    console.error({ err });
    throw new Error("Something went wrong");
  }
};

export const createCategory = async (name: string) => {
  try {
    const session = await authSession();

    if (!session) {
      throw new Error("Unauthorized: User Id not found");
    }

    const res = await prisma.category.create({
      data: {
        name,
        userId: session.user.id,
      },
    });

    return res;
  } catch (err) {
    console.error({ err });
    throw new Error("Something went wrong");
  }
};

export const updateCategory = async (category: CategoryProps) => {
  try {
    const session = await authSession();

    if (!session) {
      throw new Error("Unauthorized: User Id not found");
    }

    const res = await prisma.category.update({
      where: { id: category.id },
      data: { name: category.name },
    });

    return res;
  } catch (err) {
    console.error({ err });
    throw new Error("Something went wrong");
  }
};

export const removeCategory = async (id: string) => {
  try {
    const session = await authSession();

    if (!session) {
      throw new Error("Unauthorized: User Id not found");
    }

    const res = await prisma.category.delete({ where: { id } });

    return res;
  } catch (err) {
    console.error({ err });
    throw new Error("Something went wrong");
  }
};
