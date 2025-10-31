import { getCategoriesWithUser } from "@/app/actions/categories";
import { getPostsByUser } from "@/app/actions/posts";
import DashboardCard from "@/components/dashboard-card";
import DashboardCategories from "@/components/dashboard-categories";
import DashboardChart from "@/components/dashboard-chart";
import { authSession, requireAuth } from "@/lib/auth-utils";
import { Rocket } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  await requireAuth();
  const session = await authSession();
  const posts = await getPostsByUser();
  const categories = await getCategoriesWithUser();

  const totalViews = posts.reduce((acc, item) => acc + item.views!, 0);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-wrap w-full flex-col gap-6 p-14 px-6">
        <Link
          href="/"
          target="_blank"
          className="text-blue-600 font-medium gap-2 items-center flex"
        >
          <span>Visit public site</span>
          <Rocket />
        </Link>
        <h1 className="font-semibold text-2xl">Hi, {session?.user.name}</h1>
      </div>
      <div className="container flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <DashboardCard
            totalPosts={posts.length}
            totalCategories={categories.length}
            totalViews={totalViews}
          />
        </div>

        <div className="px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
            <DashboardChart data={posts} />
            <DashboardCategories categories={categories} />
          </div>
        </div>
      </div>
    </div>
  );
}
