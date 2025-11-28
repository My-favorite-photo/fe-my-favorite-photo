import Image from 'next/image'

import ExchangeImg from '@/assets/images/Img_exchange.png'

export function CardExchange() {
  return (
    <div className="flex flex-col w-42.5 h-77 px-2.5 py-2.5 border border-[rgba(255,255,255,0.10)] rounded-[2px]">
      <div className='relative w-37.5 h-28'>
        <Image
          src={ExchangeImg}
          alt="교환될 사진"
          fill
        />
      </div>
      <div className='border-b border-gray-400 mt-2.5'>
        <h1 className='text-white font-noto text-sm font-bold'>
          스페인 여행
        </h1>
        <div className='flex flex-col mb-2.5'>
          <div className='flex items-center gap-1.25'>
            <p className='text-main font-light font-noto text-[.625rem]'>COMMON</p>
            <div className='text-gray-400'>|</div>
            <p className='text-gray-300 font-noto text-[.625rem]'>풍경</p>
            {/* <div className='border border-gray-400'></div> */}
          </div>
          <div className='flex justify-between'>
            <div className='flex'>
              <p className='text-white font-white text-[.625rem]'>
                4 P
                <span className='text-gray-300 font-noto text-[.625rem]'>에 구매</span>
              </p>
            </div>
            <p className='text-white underline font-noto text-[0.625rem]'>프로여행러</p>
          </div>
        </div>
      </div>

      <div className='mt-2.5 mb-5'>
        <p className='text-white font-noto text-[.625rem] tracking-tight'>스페인 여행 사진도 좋은데 우리집 텍스트 넘치면 여기서 eclipse 처리...</p>
      </div>

      <div className='flex items-center justify-center gap-5 shrink-0'>
        {/** CVA Button 컴포넌트 사용*/}
        <button className='w-[4.5313rem] h-10 text-center border border-gray-100 bg-gray-500'>
          <p className='text-white font-noto text-[.75rem] font-bold'>거절하기</p>
        </button>
        <button className='w-[4.5313rem] h-10 text-center bg-main'>
          <p className='text-black font-noto text-[.75rem] font-bold'>승인하기</p>
        </button>
      </div>
    </div >
  )
}