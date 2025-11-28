import Image from 'next/image'
import Link from 'next/link';

import BackgroundImg from '@/assets/landing/Img_3x_background.png'
import BlueEclipse from '@/assets/landing/Img_3x_blueEclipse.png'
import BottomCard from '@/assets/landing/Img_3x_bottomCard.png'
import Eclipse from '@/assets/landing/Img_3x_eclipse.png'
import HeroImg from '@/assets/landing/Img_3x_hero.png'
import LogoImg from '@/assets/landing/Img_3x_logo.png'
import Section1 from "@/assets/landing/Img_3x_section1.png"
import Section2 from "@/assets/landing/Img_3x_section2.png"
import Section3 from "@/assets/landing/Img_3x_section3.png"
import SectionBackground from '@/assets/landing/Img_section3Background.png'
import Header from '@/components/common/header/Header';

export default function Home() {
  return (
    <>
      <Header />
      <main className="w-full min-h-screen bg-black overflow-x-hidden">

        {/* =========================================
            1. HERO SECTION
           ========================================= */}
        <section className="relative w-full flex flex-col items-center pt-20 pb-32 overflow-hidden">
          {/* 배경 이미지 */}
          <div className="absolute inset-0 w-full h-full z-0">
            <Image
              src={BackgroundImg}
              alt="Background"
              fill
              className="object-cover object-center opacity-60"
              priority
            />
          </div>

          {/* 컨텐츠 (z-index를 높여 배경 위에 표시) */}
          <div className="relative z-10 flex flex-col items-center w-full max-w-[1200px] px-4">

            {/* 로고 */}
            <div className="relative w-[140px] h-[30px] mb-6">
              <Image src={LogoImg} alt="Logo" fill className="object-contain" />
            </div>

            {/* 메인 텍스트 */}
            <h1 className='text-white text-center font-noto text-4xl md:text-[3.5rem] leading-tight font-bold mb-10'>
              구하기 어려웠던<br />
              <span className='text-[#EFFF04]'>나의 최애</span>가 여기에!
            </h1>

            {/* CTA 버튼 */}
            <Link
              href="/login"
              className="w-[220px] h-[56px] bg-[#EFFF04] text-black font-bold text-lg flex items-center justify-center hover:bg-[#dfff04] transition-colors mb-16"
            >
              최애 찾으러 가기
            </Link>

            {/* 히어로 이미지 (노트북) */}
            {/* 디자인 시안처럼 크게 보이기 위해 w-full max-w-4xl 등 사용 */}
            <div className="relative w-full max-w-5xl aspect-video">
              <Image
                src={HeroImg}
                alt="Hero Interface"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </section>

        <section className="relative w-full py-24 bg-black overflow-hidden">
          <div className="absolute right-30 top-200 -translate-y-1/2 translate-x-1/4 w-[1480px] h-[1480px] z-0 opacity-40 pointer-events-none">
            <Image src={Eclipse} alt="glow" fill className="object-contain" />
          </div>

          <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
            {/* 텍스트 */}
            <div className="text-center mb-12">
              <h2 className="text-white text-3xl md:text-[2.5rem] font-bold mb-4">
                포인트로 <span className="text-[#EFFF04]">안전하게 거래</span>하세요
              </h2>
              <p className="text-gray-400 text-lg">
                내 통장 정보를 밝히지 않고, 포인트로 빠르고 안전한 거래를 경험하세요
              </p>
            </div>

            {/* 이미지 */}
            <div className="relative w-full max-w-4xl aspect-video">
              <Image
                src={Section1}
                alt="Safe Transaction"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </section>


        <section className="relative w-full py-24 bg-black overflow-hidden">
          {/* 배경 Glow 효과 (왼쪽 배치) */}
          <div className="absolute left-30 top-190 -translate-y-1/2 -translate-x-1/4 w-[1480px] h-[1480px] z-0 opacity-40 pointer-events-none">
            <Image src={BlueEclipse} alt="blue-glow" fill className="object-contain" />
          </div>

          <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
            <div className="text-center mb-12">
              <h2 className="text-white text-3xl md:text-[2.5rem] font-bold mb-4">
                알림으로 보다 <span className="text-[#3397FF]">빨라진 거래</span>
              </h2>
              <p className="text-gray-400 text-lg">
                원하는 매물이 올라오면 알림으로 즉시 확인하세요
              </p>
            </div>

            {/* 이미지 공간 (이미지 import 필요) */}
            <div className="relative w-full max-w-4xl h-[400px]">
              <Image src={Section2} alt="알림으로 보다 빨라진거래" fill className="object-contain" />
            </div>
          </div>
        </section>

        <section className="relative w-full py-24 bg-black overflow-hidden">
          {/* 배경 Glow 효과 (오른쪽 배치) */}
          <div className="absolute right-0 left-0 bottom-0 w-[1920px] h-[594px] z-0 opacity-40 pointer-events-none object-contain">
            <Image src={SectionBackground} alt="glow" fill />
          </div>

          <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
            <div className="text-center mb-12">
              <h2 className="text-white text-3xl md:text-[2.5rem] font-bold mb-4">
                랜덤 상자로 <span className="text-[#EFFF04]">포인트 받자! 🎉</span>
              </h2>
              <p className="text-gray-400 text-lg">
                매일 쏟아지는 행운의 상자를 열어보세요
              </p>
            </div>

            {/* 이미지 공간 (이미지 import 필요) */}
            <div className="relative w-full max-w-4xl h-[400px]">
              <Image src={Section3} alt="Random Box" fill className="object-contain" />
            </div>
          </div>
        </section>

        <section className="w-full bg-black">
          <div className="max-w-[1280px] mx-auto py-16 px-4 lg:px-0 flex flex-col items-center text-center">
            <div className='relative w-25.75 h-37.5 object-contain mb-10'>
              <Image
                src={BottomCard}
                alt="랜딩 섹션 5"
              />
            </div>

            <h2 className="text-white text-2xl md:text-3xl font-bold mb-6">
              나의 최애를 찾아보세요!
            </h2>

            <Link
              href="/login"
              className="w-[226px] h-[55px] bg-[#EFFF04] text-black font-semibold text-lg rounded-none flex items-center justify-center"
            >
              최애 찾으러 가기
            </Link>
          </div>
        </section>
      </main >
    </>
  );
}
