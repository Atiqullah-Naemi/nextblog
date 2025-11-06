import { getPosts } from "@/app/actions/blog";
import Header from "@/components/header";
import { NavMenu } from "@/components/navbar";
import Pagination from "@/components/pagination";
import PostCard from "@/components/post-card";
import { authSession } from "@/lib/auth-utils";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const { posts, totalPages, currentPage } = await getPosts(page);
  const session = await authSession();

  return (
    <>
      <div className="relative w-full">
        <NavMenu
          userName={session?.user.name}
          userImage={session?.user.image as string}
        />
      </div>
      <Header />
      <div className="flex flex-col gap-6 justify-center">
        <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-4 gap-6 py-6">
          {posts.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </div>
        {posts.length > 0 && (
          <Pagination
            page={page}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        )}
      </div>
    </>
  );
}
