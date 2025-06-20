import Image from "next/image";
import Link from "next/link";

type CubeProps = {
  size: number;
};

const Cube = ({ size }: CubeProps) => {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 transition-all duration-300 hover:scale-120 hover:rotate-12"
    >
      <Image
        src="/images/main-cube.png"
        alt="frozi.lol"
        width={size}
        height={size}
      />
    </Link>
  );
};

export default Cube;
