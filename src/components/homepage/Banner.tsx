
import Image from "next/image";
import Link from "next/link";
import heroImage from "@/assets/bazar-hero.png";

export default function Banner() {
  const banglaDate = new Intl.DateTimeFormat("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());

  return (
    <section className="w-full overflow-hidden rounded-[20px] border border-[#e0e9e1] bg-[#fafcfb]">
      <div className="flex flex-col items-center justify-between gap-6 px-4 py-5 sm:px-6 md:min-h-[210px] md:flex-row md:gap-8 md:px-8 md:py-5">
        
        {/* Left Content */}
        <div className="w-full flex-1 text-left">
          
          {/* Eyebrow */}
          <span className="inline-flex items-center rounded-full bg-[#e4f5e9] px-3 py-1 text-xs font-medium text-[#008e46]">
            {banglaDate}
          </span>

          {/* Heading */}
          <h1 className="mt-2 text-[25px] leading-tight font-bold tracking-tight text-[#1f2923] sm:text-[30px]">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Subtitle */}
          <p className="mt-4 max-w-[540px] text-[13px] leading-[1.7] text-[#6b746d] sm:text-sm">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
            বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক
            এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* CTA Button */}
          <Link
            href="#সব-পণ্য"
            className="mt-5 inline-flex items-center justify-center rounded-md bg-[#008e46] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#00773b] sm:text-sm"
          >
            সব পণ্য দেখুন
          </Link>
        </div>

        {/* Right Hero Image */}
        <div className="flex w-full shrink-0 items-center justify-center md:w-[220px] lg:w-[250px]">
          <Image
            src={heroImage}
            alt="বাজারের নিত্যপ্রয়োজনীয় পণ্যের ঝুড়ি"
            className="h-auto w-[180px] object-contain sm:w-[200px] md:w-[220px]"
            priority
          />
        </div>
      </div>
    </section>
  );
}
