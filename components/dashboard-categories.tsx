"use client";

import { Category, User } from "@/lib/generated/prisma/client";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface CategoryProps {
  categories: (Category & { user: User })[];
}

export default function DashboardCategories({ categories }: CategoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest categories</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="p-4 rounded-lg gap-6 shadow-sm flex items-center"
          >
            <p className="font-medium">{category.name} </p>
            <div className="flex items-center gap-1">
              <div className="relative h-8 w-8 rounded-full shadow-lg">
                <Image
                  className="rounded-full shadow-lg"
                  src={category.user?.image ?? ""}
                  alt={category.user?.name}
                  fill
                />
              </div>
              <p className="font-medium">{category.user?.name} </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
