import { NavMenu } from "@/components/navbar";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="relative w-full">
        <NavMenu />

        {children}
      </div>
    </>
  );
}
