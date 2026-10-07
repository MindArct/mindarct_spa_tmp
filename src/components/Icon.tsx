const paths: Record<string, string> = {
  code: "M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14",
  spark: "M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z",
  compass: "M12 21a9 9 0 100-18 9 9 0 000 18zM15.5 8.5l-2 5-5 2 2-5z",
  swap: "M4 8h14l-3-3M20 16H6l3 3",
  cloud: "M7 18a4 4 0 010-8 5 5 0 019.6-1A4.5 4.5 0 0117 18z",
};

export default function Icon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={paths[name] ?? paths.code} />
    </svg>
  );
}
