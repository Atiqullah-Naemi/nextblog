"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Category, Post } from "@/lib/generated/prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import CellActions from "./cell-actions";

type PostWithCategory = Post & { category: Category | null };
export const columns: ColumnDef<PostWithCategory>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => (
      <div className="h-10 w-[60px] relative">
        <Image
          src={row.original.imageUrl}
          alt={row.original.title}
          fill
          className="rounded-sm"
        />
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase"> {row.getValue("title")} </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => row.getValue("status"),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => row?.original?.category?.name,
  },
  {
    accessorKey: "views",
    header: "Views",
    cell: ({ row }) => row.getValue("views"),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <CellActions id={row.original.id} />;
    },
  },
];
