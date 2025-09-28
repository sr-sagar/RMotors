import SmallScreenSignUpLogInButtons from "@/components/features/home/smallScreenSignUpLogInButtons";
import { Heart, Search, Shield } from "lucide-react";
import { prisma } from '../lib/prisma';
import SearchItems from '@/components/features/products/searchItems';
import { redirect } from "next/navigation";
import ExplorMoreButton from '../components/features/home/explorMoreButton';

export const handleNavigation = (link: string) => {
  redirect(link)
}


export default async function Home() {

  const getFeaturedCars = await prisma.product.findMany({take: 3})

  return (
    <section className="w-full h-max  flexClass flex-col gap-y-24 ">
      <section className="w-full h-max flexClass flex-col gap-y-2 mt-6">
        <h2 className="w-full h-max text-center text-[36px] font-bold ">Find Your Next <br/ ><span className="text-blue-400 text-center">Quality Used Car</span></h2>
        <p className="text-center">Browse our carefully selected second-hand vehicles. Direct sales, fair <br />prices, and honest dealing - inspect before you buy.</p>
        <div className="w-full h-max flexClass flex-col md:flex-row md:gap-x-4 py-2 gap-y-4">
          <div className="w-max h-max flexClass">
            <ExplorMoreButton text="Browse Cars" link="/search"/>
          </div>
        </div>
        <div className="w-full flexClass  mt-2  md:hidden ">
          <SmallScreenSignUpLogInButtons />
        </div>
      </section>
      <section className="w-full h-max flex flex-col md:flex-row justify-around items-center gap-y-4 ">  
        <div className="w-max h-max flexClass flex-col">
          <p className="text-md md:text-lg font-bold" style={{color: "#0054FF"}}>No Middleman</p>
          <p className="text-xs md:text-sm ">Direct Sales</p>
        </div>

        <div className="w-max h-max flexClass flex-col">
          <p className="text-md md:text-lg font-bold"style={{color: "#0054FF"}}>Quality Focus</p>
          <p className="text-xs md:text-sm ">Curated Selection</p>
        </div>

        <div className="w-max h-max flexClass flex-col">
          <p className="text-md md:text-lg font-bold"style={{color: "#0054FF"}}>Best Value</p>
          <p className="text-xs md:text-sm ">Fair Pricing</p>
        </div>

        <div className="w-max h-max flexClass flex-col">
          <p className="text-md md:text-lg font-bold"style={{color: "#0054FF"}}>Your Choice</p>
          <p className="text-xs md:text-sm ">Inspect & Buy</p>
        </div>

      </section>  
      <section className="w-full h-max flexClass flex-col gap-y-6 p-2">
        <h3 className="text-4xl font-bold tracking-wider text-center" >Why Choose RMotors?</h3>
        <p className="tracking-wide text-center">Experience car buying like never before with our cutting-edge features</p>

        <div className="w-full h-max flex flex-col md:flex-row gap-y-6 justify-around items-center ">

          <div className="w-full md:w-max h-max flexClass flex-col gap-y-4 largeShadow  ease-in-out   duration-300 transition-all p-6" >
            <div className="w-max h-max rounded-full bg-[#0054FF] p-2 ">
              <Search color="white" />
            </div>
            <p>Easy Car Search</p>
            <p className="text-center">Browse our curated selection of quality second-hand vehicles</p>
          </div>

          <div className="w-full md:w-max h-max flexClass flex-col gap-y-4 largeShadow  ease-in-out   duration-300 transition-all p-6">
            <div className="w-max h-max rounded-full bg-[#0054FF] p-2">
              <Shield color="white"/>
            </div>
            <p>Honest Listings</p>
            <p className="text-center">Transparent descriptions - inspect before you buy, sold as-is</p>
          </div>

          <div className="w-full md:w-max h-max flexClass flex-col gap-y-4 largeShadow  ease-in-out   duration-300 transition-all p-6 ">
            <div className="w-max h-max rounded-full bg-[#0054FF] p-2">
              <Heart color="white"/>
            </div>
            <p>Direct Dealing</p>
            <p className="text-center">Deal directly with us - no middleman, no hidden fees</p>
          </div>

        </div>
      </section>

      <section className="w-full h-max flexClass flex-col gap-y-4 p-2">
        <h3>Featured Cars</h3>
        <p>Discover our handpicked selection of premium vehicles</p>
        <div className="w-full h-max flexClass">
          <div className="w-max md:w-full h-max  gap-x-4  flex justify-around items-center overflow-x-auto" style={{scrollbarWidth: "none"}} >
            {getFeaturedCars.map((item) => (
              <SearchItems key={item.id} title={item.productTitle} price={item.productPrice.toString()} id={item.id} productOwnerId={item.productUploaderId} imgURL={item.productImageURLs[item.productImageURLs.length -1]} productCategory={item.productCategory} productYear={item.productYear} productTotalMiles={item.productTotalMiles}/>
            ))}
          </div>
        </div>
        <div className="w-max h-max flexClass mt-2">
          <ExplorMoreButton text={"View All Cars ->"} link={"/search"} bgColor="#FCFCFC" className="border-1 border-gray-200 px-4 py-2" textColor="black"/>
        </div>
      </section>
      <section className="w-full h-max flexClass flex-col gap-y-4">
        <h3 className="font-bold text-2xl">Important Note</h3>
        <ol className="w-full h-max flexClass flex-col list-disc gap-y-2 text-center">
          <li>All vehicles are sold as-is - please inspect thoroughly before purchase</li>
          <li>No returns or warranties - what you see is what you get</li>
          <li>Direct contact with seller - we&apos;re here to answer your questions</li>
          <li>Fair pricing with no hidden fees or surprises</li>
        </ol>
      </section>
      <section className="w-full min-h-[300px] flexClass flex-col bg-blue-600 gap-y-4 p-2">
        <h3 className="text-white tracking-wider text-3xl text-center">Ready to Find Your Car?</h3>
        <p className="text-center tracking-wide" style={{color: "white"}}>Browse our selection and contact us directly for honest, straightforward deals</p>
        <div className="w-max h-max flexClass gap-x-2">
          <ExplorMoreButton text={"Start Exploring"} link={"/search"} bgColor="#FCFCFC" className="border-1 border-gray-200 px-4 py-2" textColor="black"/>
        </div>  
      </section>
             

    </section>
  );
}
