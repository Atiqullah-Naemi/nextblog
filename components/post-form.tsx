"use client";

import { createPost, updatePost } from "@/app/actions/posts";
import { generateSlug } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { object, z } from "zod";
import ImageUploader from "./image-uploader";
import RichTextEditor from "./toolbars/editor";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Spinner } from "./ui/spinner";

const CreatableSelect = dynamic(() => import("react-select/creatable"), {
  ssr: false,
});

const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, { message: "Title is required" }),
  content: z.string().min(3, { message: "Content is required" }),
  imageUrl: z.string("Image Url is required"),
  categoryId: z.string(),
  tags: z.array(object({ label: z.string(), value: z.string() })),
  categories: z.array(object({ id: z.string(), name: z.string() })).optional(),
  status: z.string(),
  slug: z.string().min(3, { message: "Slug is required" }),
});

export type PostFormValues = z.infer<typeof formSchema>;

export default function PostForm({
  id,
  title,
  content,
  imageUrl,
  categoryId,
  tags,
  status,
  categories,
  slug,
}: PostFormValues) {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id,
      title,
      content,
      imageUrl,
      categories,
      categoryId,
      status,
      slug,
      tags,
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: PostFormValues) => {
    if (id) {
      await updatePost(data);
      toast.success("Post updated successfully");
    } else {
      await createPost(data);
      toast.success("Post created successfully");
    }

    router.refresh();
    router.push("/posts");
  };

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-2 gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-6 py-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onBlur={(e) => {
                      field.onBlur();

                      if (!form.getValues("slug")) {
                        form.setValue("slug", generateSlug(e.target.value), {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUploader
                    endpoint="imageUploader"
                    defaultUrl={field.value}
                    onChange={(url) => {
                      field.onChange(url);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <RichTextEditor
                    content={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <CreatableSelect
                    isMulti
                    isClearable
                    {...field}
                    onCreateOption={(value) => {
                      const newOption = {
                        label: value,
                        value: value.toLocaleLowerCase(),
                      };
                      field.onChange([...field.value, newOption]);
                    }}
                    components={{ IndicatorsContainer: () => null }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-6">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Extra Settins</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={categoryId}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories?.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={status}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          {["published", "draft"].map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>

        <Button
          type="submit"
          className="max-w-40 cursor-pointer"
          disabled={!form.formState.isValid || form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Spinner className="size-6" />
          ) : (
            "Save changes"
          )}
        </Button>
      </form>
    </Form>
  );
}
