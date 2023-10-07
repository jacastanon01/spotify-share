import Button from "@/components/Button";
import Image from "next/image";

export default function Home() {
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <main className="w-screen md:px-24 px-8 py-4 border-4 bg-black">
      <section>Navbar</section>
      <section className="h-screen flex bg-dark items-center mt-6 flex-col px-8">
        <h1 className="h1-bold  my-6">Sharelist</h1>
        <div className="flex flex-col items-center gap-5">
          <p className="font-notoSerif">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia,
            debitis, nulla, eveniet vitae magnam temporibus eaque odio
            dignissimos neque sed ipsam? Tempora, et reiciendis? Voluptas
            cupiditate accusantium culpa{" "}
          </p>
        </div>
        <div className="flex">
          <Button />
        </div>
      </section>
    </main>
  );
}
