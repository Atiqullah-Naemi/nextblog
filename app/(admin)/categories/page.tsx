import { getCategories } from "@/app/actions/categories";
import CategoriesClien from "./client/categories-client";

export default async function CategoriesPage() {
  const data = await getCategories();

  return (
    <div>
      <CategoriesClien categories={data!} />
    </div>
  );
}
