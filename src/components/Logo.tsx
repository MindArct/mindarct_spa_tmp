import Image from "next/image";

export default function Logo({ className = "h-9" }: { className?: string }) {
  return (
    <Image
      src="/brand/mindarct-logo.png"
      alt="MindArct"
      width={640}
      height={205}
      priority
      className={`${className} w-auto`}
    />
  );
}
