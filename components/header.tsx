export default function Header({ about }: { about?: string }) {
  return (
    <div
      className="w-full flex flex-col p-16 justify-center text-white container mx-auto
    rounded-md items-center gap-1 text-center bg-linear-to-r from-blue-500 to-purple-500 shadow-lg
    "
    >
      <h1 className="text-xl md:text-2xl font-semibold">
        Latest news, tips, and insights <br />
        {about ? `about ${about}` : "from our team of tech experts"}
      </h1>
      <p className="text-sx">
        Here, you will always find latest news, more information about <br />
        tech, AI trneds and software. Stay informed!
      </p>
    </div>
  );
}
