export default function SkeletonAnimeDetails() {
  return (
    <div className="p-4 dark:bg-[#080f25] bg-white">
      <header className="flex flex-col lg:flex-row lg:items-start mb-6">
        {/* Imagen del anime */}
        <div className="w-full max-w-xs mx-auto lg:ml-6 rounded-lg bg-white/15 h-[455px]"></div>

        {/* Contenedor para texto */}
        <div className="flex flex-col lg:w-2/3 lg:pr-6 mt-6 lg:mt-0 h-4">
          {/* Título y tipo */}
          <div className="text-3xl font-bold mb-2 flex gap-5"></div>

          {/* Debut */}
          <div className="mb-4 bg-green-500 w-full text-white px-2 py-1 rounded-lg text-center h-4"></div>

          {/* Sinopsis */}
          <div className="p-4 bg-gray-100 dark:bg-[#1e293b] rounded-lg shadow-md h-4"></div>
        </div>
      </header>

      {/* Episodios */}
      <section>
        <h4 className="text-xl font-semibold mb-4 dark:text-white"></h4>
        <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <li
              key={index}
              className="bg-white dark:bg-[#1e293b] shadow-md rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            >
              <div className="p-4">
                <div className="text-center"></div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
