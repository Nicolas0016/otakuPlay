export default function SkeletonSearchResults() {
  const skeletons = Array.from({ length: 10 }); // Ajusta el número de esqueletons según sea necesario

  return (
    <div className="container mx-auto py-4 lg:px-[200px] sm:px-12">
      <ul
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        }}
        className="grid gap-5"
      >
        {skeletons.map((_, index) => (
          <li key={index} className="flex justify-center hover:scale-105 group">
            <article className="shadow-md rounded-lg overflow-hidden w-[180px]">
              <header className="relative w-full h-[250px] bg-white/15 animate-pulse"></header>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
