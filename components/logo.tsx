import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex flex-col text-[#0A274E] text-center">
      <div className="relative top-2.5">
        <Image
          src="/raw-logo.png"
          alt="Logo"
          width={150}
          height={60}
          className="object-cover"
        />
      </div>
      <div className="text-[16px] font-semibold">ADHITAMA 89</div>
      <div className="text-[6px] italic tracking-[0.4em] -mt-1">
        — Rental Car —
      </div>
    </div>
  );
}
