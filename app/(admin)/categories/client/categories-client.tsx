"use client";

import { createCategory, updateCategory } from "@/app/actions/categories";
import { DataTable } from "@/components/data-table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useCategories } from "@/hooks/use-categories";
import { Category } from "@/lib/generated/prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { columns } from "./columns";

const formSchema = z.object({
  name: z.string().min(3, { message: "Name is required" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function CategoriesClien({
  categories,
}: {
  categories: Category[];
}) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
    mode: "onBlur",
  });

  const { open, setOpen, category, setCategory } = useCategories();
  const router = useRouter();

  useEffect(() => {
    if (category) {
      form.setValue("name", category.name);
    }
  }, [category, form]);

  const onSubmit = async (data: FormValues) => {
    try {
      if (category?.id) {
        await updateCategory({ id: category.id, name: data.name });
        toast.success("Category updated successfully");
      } else {
        await createCategory(data.name);
        toast.success("New category created successfully");
      }

      router.refresh();
      form.reset();
      setCategory({ id: "", name: "" });
      setOpen(false);
    } catch (err) {
      console.log({ err });
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="category-form">
            <DialogContent
              className="sm:max-w-[425px]"
              aria-describedby="category"
              aria-description="create category"
            >
              <DialogHeader>
                <DialogTitle>Edit Category</DialogTitle>
              </DialogHeader>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="cursor-pointer"
                form="category-form"
                disabled={
                  !form.formState.isValid || form.formState.isSubmitting
                }
              >
                {form.formState.isSubmitting ? (
                  <Spinner className="size-6" />
                ) : (
                  "Save changes"
                )}
              </Button>
            </DialogContent>
          </form>
        </Form>
      </Dialog>

      <div className="flex flex-col p-8">
        <div className="flex w-full justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>categories</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Button className="cursor-pointer" onClick={() => setOpen(true)}>
            Create new category
          </Button>
        </div>
      </div>

      <div className="p-8 flex flex-col">
        <DataTable data={categories} columns={columns} />
      </div>
    </>
  );
}
