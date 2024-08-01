export default function SkeletonHome() {
  return (
    <div className="container p-4">
      <ul
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "15px",
        }}
        className="grid justify-items-center items-center"
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <li
            key={index}
            className="bg-white dark:bg-[#1e293b] shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg w-[268px] h-[200px]"
          ></li>
        ))}
      </ul>
    </div>
  );
}
