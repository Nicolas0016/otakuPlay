export default function SkeletonEpisode() {
  return (
    <section className="px-5 py-9 text-white flex flex-col gap-4 items-center animate-pulse w-[700px] mx-auto">
      <div className="h-8 bg-gray-700 rounded w-1/2"></div>
      <nav className="w-full overflow-x-auto">
        <ul className="flex justify-center py-2 first:rounded-l-lg last:rounded-r-lg ">
          {Array.from({ length: 5 }).map((_, index) => (
            <li key={index} className="px-4 bg-gray-700 h-10 w-20"></li>
          ))}
        </ul>
      </nav>
      <div className="mt-4 w-full h-64 bg-gray-700 rounded"></div>
    </section>
  );
}
