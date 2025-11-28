import Link from 'next/link';
import Header from '../components/common/header/Header';

export default function Home() {
  return (
    <>
      <Header />
      <div className="w-full min-h-screen bg-black">
        <section className="w-full bg-black flex justify-center py-8">
          <div
            className="relative rounded-[16px] overflow-hidden bg-gray-900"
            style={{
              width: '1798px',
              height: '1088px',
            }}
          >
            <img
              src="/images/marketplace/background.png"
              alt="배경"
              className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
            />

            <img
              src="/images/marketplace/logo.png"
              alt="로고"
              className="absolute left-1/2 -translate-x-1/2 z-50 pointer-events-none"
              style={{ top: '80px', width: '138px', height: '25px' }}
            />

            <img
              src="/images/marketplace/favorite.png"
              alt="favorite"
              className="absolute left-1/2 -translate-x-1/2 z-50 pointer-events-none"
              style={{ top: '130px', width: '328px', height: '96px' }}
            />

            <div
              className="absolute left-1/2 -translate-x-1/2 w-full h-[650px] flex justify-center items-center z-30 pointer-events-none"
              style={{ top: '340px' }}
            >
              <img
                src="/images/marketplace/1.png"
                alt="랜딩 섹션 1"
                className="w-full h-auto object-contain"
              />
            </div>

            <Link
              href="/login"
              className="absolute left-1/2 -translate-x-1/2 w-[226px] h-[55px] bg-[#EFFF04] text-black font-semibold text-lg rounded-none flex items-center justify-center z-40"
              style={{ top: '260px' }}
            >
              최애 찾으러 가기
            </Link>
          </div>
        </section>

        <section className="w-full bg-black">
          <div className="max-w-[1920px] mx-auto px-4 lg:px-0 flex justify-center">
            <img
              src="/images/marketplace/2.png"
              alt="랜딩 섹션 2"
              className="w-full h-auto object-contain"
            />
          </div>
        </section>

        <section className="w-full bg-black">
          <div className="max-w-[1920px] mx-auto px-4 lg:px-0 flex justify-center">
            <img
              src="/images/marketplace/3.png"
              alt="랜딩 섹션 3"
              className="w-full h-auto object-contain"
            />
          </div>
        </section>

        <section className="w-full bg-black">
          <div className="max-w-[1920px] mx-auto px-4 lg:px-0 flex justify-center">
            <img
              src="/images/marketplace/4.png"
              alt="랜딩 섹션 4"
              className="w-full h-auto object-contain"
            />
          </div>
        </section>

        <section className="w-full bg-black">
          <div className="max-w-[1280px] mx-auto py-16 px-4 lg:px-0 flex flex-col items-center text-center">
            <img
              src="/images/marketplace/5.png"
              alt="랜딩 섹션 5"
              style={{ width: '103px', height: '150px' }}
              className="object-contain mb-10"
            />

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
      </div>
    </>
  );
}
