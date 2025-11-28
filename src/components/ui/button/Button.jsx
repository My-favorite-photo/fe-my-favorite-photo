/*
  * @params message 
  * @params color
  * cva 사용예정(모드에 따라 포토카드 구매하기, 포토카드 교환하기)
  * 디자인 시안 button/secondary 만들기
 */
export function Button() {
  return (
    <div className='flex items-center justify-center bg-main w-110 h-20 py-6.25 px-36 rounded-[2px] hover:bg-main/80 active:bg-main/70'>
      <p className='text-black text-xl font-noto font-semibold'>안녕하세요</p>
    </div>
  )
}