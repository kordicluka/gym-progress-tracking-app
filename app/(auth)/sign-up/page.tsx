import { SignUpForm } from "@/components/SignUpForm";
import Image from "next/image";

export default function SignUpPage() {
  return (
    <main className="absolute z-40  top-0 left-0 w-full h-screen overflow-hidden bg-black flex flex-col xl:flex-row items-start justify-start">
      <div className="w-full  h-screen hidden xl:flex flex-col items-center justify-center max-xl:space-y-20 xl:w-3/5 relative lg:w-1/2 xl:h-full ">
        <Image
          src="/main-image-gym.webp"
          alt="Gym interior with equipment"
          priority
          quality={85}
          fill
          sizes="(max-width: 1280px) 100vw, 60vw"
          className="w-full h-[40vh] xl:h-screen object-cover block"
        />
      </div>{" "}
      <div className="xl:hidden absolute top-0 h-screen w-full left-0 xl:top-0 xl:left-[85%] xl:w-[15%] xl:h-full bg-gradient-to-b xl:bg-gradient-to-r from-gray-600 via-black to-gray-600"></div>
      <SignUpForm />
    </main>
  );
}
