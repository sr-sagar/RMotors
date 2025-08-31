import ChoiceBox from "@/components/(common)/choiceBox";
import HeroSection from "@/components/features/home/heroSection";
import ServiceDescription from "@/components/features/home/serviceDescription";
import SmallScreenSignUpLogInButtons from "@/components/features/home/smallScreenSignUpLogInButtons";
import Image from 'next/image';

export default function Home() {
  return (
    <section className="w-full  mt-[40px] md:mt-0 mb-2">
      {/* hero section */}
      {/* <header className="w-full h-[400px] md:h-[300px] lg:h-[400px] xl:h-[500px] relative flex flex-col md:flex-row justify-center items-center z-0 p-2" > */}
      <div className="w-full mx-auto relative flex flex-col md:flex-row justify-center items-center gap-6 px-4 sm:px-6 lg:px-8 md:py-16 py-10 z-0 " >
        <div className="order-2 md:order-1 w-full flex flex-col justify-center items-center mt-6 md:mt-0 px-4  gap-y-2">
            <h1 className="text-2xl text-center font-bold md:text-3xl lg:text-4xl">Looking to save more on your 2nd hand car?</h1>
            <p className="text-sm font-semibold text-center">Discover great deals on second-hand cars. Looking to sell? We buy used cars too — just give us a call!</p>
            <div className="w-full flex justify-center items-center  mt-2  md:hidden ">
              <SmallScreenSignUpLogInButtons />
            </div>
        </div>

        <div className="order-1 md:order-2 w-full  relative mt-2 md:mt-0">
          <HeroSection />
        </div>
      </div>
      {/* section for select and search bar */}
      <section className="w-full h-[120px] mt-4  flex flex-col  justify-center items-start bg-gray-200">
        <div className="w-full h-[50%] flex justify-center items-center p-2">
          <h2 className="text-2xl ">What are you looking to do?</h2>
        </div>
        <div className="w-full  p-2 flex justify-center items-center ">
          <ChoiceBox />
        </div>
      </section>
      {/* section for how it works */}
      <section className="w-full min-h-[360px] my-14">
        <div className="w-full flex flex-col justify-center items-center p-1 gap-y-2">
          <h2 className="text-sm">HOW IT WORKS</h2>
          <h3 className="text-2xl font-bold text-center">SEARCH - SELECT - CHECK - BUY</h3>
          <p className="text-xl font-semibold">It's that easy.</p>
          <div className="w-full mt-1 flex justify-center items-center">
            <Image src={"/LOGO_SECTION_NOBG.png"} width={356} height={356} alt="process of how things work" />
          </div>
        </div>
      </section>
      {/* our service is best section */}
      <section className="w-full mb-4 flexClass bg-gray-200">
        <ServiceDescription />
      </section>
      

    </section>
  );
}
