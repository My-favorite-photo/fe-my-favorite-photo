import Image from "next/image";
import Link from "next/link";

import BackArrowIcon from '@/assets/icons/Ic_back.svg'
import DefaultImg from "@/assets/images/img_card.svg"
import { CardTitle } from "@/components/common/card-title/CardTitle";
import Header from "@/components/common/header/Header";
import { Button } from "@/components/ui/button/Button";
import GradeLabel from "@/components/ui/label/GradeLabel";

import CardBuyer from "./_components/CardBuyer";

export default function SellDetailPage() {
  return (
    <main className=" text-white px-[.9375rem] sm:px-5 md:container md:mx-auto">
      <header className="py-5 sm:hidden">
        <Link
          href="/market-place"
          className='relative float-left w-5.5 h-5.5'
        >
          <Image
            src={BackArrowIcon}
            alt='뒤로가기 버튼'
            fill
          />
        </Link>
        <p className="text-center font-br text-[1.25rem] tracking-[-0.6px]">마켓플레이스</p>
      </header>
      <section className="hidden sm:block">
        <Header />
      </section>

      <h1 className="hidden text-gray-300 font-br tracking-[-0.72px] text-sm sm:block sm:text-base sm:mb-10 md:text-2xl md:mb-15">마켓플레이스</h1>
      <CardTitle
        titleMessage="우리집 앞마당"
        className="text-2xl font-bold mb-2.5 sm:mb-5 sm:text-[32px] md:text-[40px]"
      />
      <section className="mt-6.5 sm:flex sm:gap-5 sm:mt-12 md:gap-20">
        <div className="relative max-w-[960px] mb-[1.2656rem] sm:flex-1">
          <Image
            src={DefaultImg}
            alt="포토카드 이미지"
            width={960}
            height={720}
          />
        </div>
        <div className="sm:flex-1">
          <CardBuyer />
        </div>
      </section>

      <section className="mt-30">
        <div className="sm:flex sm:border-b sm:border-gray-100 sm:pb-5 md:border-b md:items-end">
          <CardTitle
            titleMessage="교환 희망 정보"
            className="text-2xl font-bold mb-2.5 sm:mb-5 sm:text-[2rem] sm:border-0 md:mb-0 md:text-[2.5rem]"
          />
          <Button thickness="thin" className="hidden py-4.25 sm:block md:text-lg md:h-15">포토카드 교환하기</Button>
        </div>

        <p className="mt-11.5 text-lg font-bold md:text-2xl">푸릇푸릇한 여름 풍경, 눈 많이 내린 겨울 풍경 사진에 관심이 많습니다.</p>
        <div className="flex gap-2.5 mt-5 mb-10 md:gap-3.75">
          <GradeLabel grade="RARE" size='sm' />
          <div className='text-gray-400'>|</div>
          <p className='text-gray-300 text-lg md:text-2xl'>풍경</p>
        </div>

        <Button
          thickness="thin"
          className="w-full mb-10 sm:hidden"
        >
          포토카드 교환하기
        </Button>
      </section>

      {/* // 내가 제시한 교환 목록 */}
      {/* <section>
          <CardTitle />
      </section> */}
    </main>
  )
}