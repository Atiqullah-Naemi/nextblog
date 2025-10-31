"use client";

import { removeCategory } from "@/app/actions/categories";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { CategoryProps, useCategories } from "@/hooks/use-categories";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Copy, Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function CellActions({ id, name }: CategoryProps) {
  const { setCategory, setOpen } = useCategories();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const router = useRouter();

  const onCopy = () => {
    navigator.clipboard.writeText(id);
    toast.success(`Category ${name} copied to clippboard`);
  };

  const onRemoveCategory = async () => {
    try {
      setIsLoading(true);
      await removeCategory(id);
    } catch (err) {
      throw new Error(`Something went wrong ${err}`);
    } finally {
      router.refresh();
      toast.success(`Category ${name} deleted successfully`);
      setIsLoading(false);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <>
      <div className="flex justify-end gap-6">
        <div
          className="cursor-pointer"
          title="Copy category Id"
          onClick={onCopy}
        >
          <Copy />
        </div>

        <div
          className="cursor-pointer"
          title="Edit"
          onClick={() => {
            setOpen(true);
            setCategory({ id, name });
          }}
        >
          <Edit />
        </div>
        <div
          className="cursor-pointer"
          title="Delete"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          <Trash className="text-red-500" />
        </div>
      </div>

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent
          className="sm:max-w-[425px] flex flex-col gap-6"
          aria-describedby="category"
          aria-description="delete category"
        >
          <DialogHeader className="gap-6">
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription className="flex flex-col">
              <span className="text-md">
                Are you sure you want to delete {name}?{" "}
              </span>
              <span>This action cannot be undone</span>
            </DialogDescription>
          </DialogHeader>

          <Button
            variant="destructive"
            onClick={onRemoveCategory}
            disabled={isLoading}
            className="max-w-40 self-end cursor-pointer"
          >
            {isLoading ? <Spinner className="size-6" /> : "Delete"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
