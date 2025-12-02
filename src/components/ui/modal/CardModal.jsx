'use client'
// 교환희망 정보 모달
import Image from 'next/image';
import React from 'react';
import { forwardRef, useState } from 'react';

import BackArrowIcon from '@/assets/icons/Ic_back.svg'
import X from '@/assets/icons/Ic_x.svg'
import ExchangeImg from '@/assets/images/Img_exchange.png'
import { CardTitle } from "@/components/common/card-title/CardTitle";
import { cn } from '@/libs/utils/cn';

import { Button } from '../button/Button';
import { CardCounterInput } from '../input/CardCounterInput';

const SelectField = forwardRef(({ children, className = '', value, onChange, ...props }, ref) => {
  const [currentValue, setCurrentValue] = useState(value)

  const handleChange = (e) => {
    const newValue = e.target.value
    setCurrentValue(newValue)
    onChange?.(e)
  }

  const placeholderClass = currentValue === "" ? 'text-gray-200' : "text-white"

  return (
    <select
      ref={ref}
      value={currentValue}
      onChange={handleChange}
      className={
        cn(
          "w-full bg-black sm:bg-gray-500 py-4.5 px-5 border border-gray-200 rounded-[2px]",
          placeholderClass,
          className
        )
      }
      {...props}
    >
      {children}
    </select>
  )
});
SelectField.displayName = 'SelectField';

/**
 * @param {String} type sell이면 나의 포토카드 판매하기 아니면 수정하기용 모달
 * @returns 
 */
export function CardModal({ type }) {
  const [grade, setGrade] = useState("");
  const [genre, setGenre] = useState("");
  const [isOpen, setIsOpen] = useState(true); // 모달 표시 상태 (테스트용)

  if (!isOpen) return null;

  const subject = type === "sell" ? "나의 포토카드 판매하기" : "수정하기"

  // 내용물 클릭시 모달이 꺼지지않도록 버블링을 방지
  const stopContentBubbling = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(!isOpen)
    }
  }

  return (
    <section
      className="fixed inset-0 bg-black/70 flex items-start justify-center z-50 sm:items-end md:items-center"
      onClick={stopContentBubbling}
    >

      <div
        className={cn(
          "w-full bg-black border flex flex-col overflow-hidden overflow-y-scroll",
          "min-h-screen h-full py-0 px-0 rounded-none",           // 모바일 우선 사이즈 (전체 화면 모달)
          "sm:min-h-0 sm:max-h-[90vh] sm:bg-gray-500 py-3.75 sm:px-2.5", // 태블릿 (768px - bottomSheet디자인)
          "sm:rounded-t-[2px] sm:rounded-b-none sm:border-b-0",
          "md:max-w-290 md:max-h-250 md:py-15 md:px-30",                // 데스크톱 (1280px 이상 - 모달 스타일)
          "md:h-auto md:rounded-[2px] md:mt-0"
        )}
      >
        {/* tablet bottom-sheet 구분선 */}
        <div className="justify-center pt-2 pb-4 hidden sm:flex md:hidden">
          <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
        </div>

        <div className='w-full max-w-full mx-auto sm:max-w-none'>
          <header className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div className='flex items-center sm:hidden'>
                <button
                  className='relative w-[10.15px] h-[17.699px] text-white text-xl pr-4'
                  onClick={() => setIsOpen(false)}
                >
                  <Image
                    src={BackArrowIcon}
                    alt='뒤로가기 버튼'
                    fill
                  />
                </button>
              </div>
              <h1 className="
              text-[1.25rem] font-br text-white tracking-[-0.6px] text-center
             sm:text-gray-300 sm:text-base sm:text-left sm:tracking-[-0.72px]
              md:text-2xl
              ">
                {subject}
              </h1>
              <button
                className="hidden md:block text-gray-400 hover:text-white text-3xl transition"
                onClick={() => setIsOpen(false)}
              >
                <Image
                  src={X}
                  alt='닫기 버튼'
                />
              </button>
              <div className='w-10 sm:hidden'></div>
            </div>
          </header>
        </div>

        <div className='w-full overflow-y-auto px-6 pb-20 sm:px-0'>
          <div className="w-full overflow-y-auto px-6">
            <CardTitle
              size='L'
              titleMessage="우리집 앞마당"
              className="text-2xl sm:text-[2rem] md:text-[2.5rem] font-bold mb-5"
            />

            <section className='flex justify-between'>
              <div className="flex flex-col w-full gap-4 mt-4 sm:flex-row sm:gap-5 md:gap-10">
                <div className="relative aspect-video bg-gray-900 rounded-lg object-cover sm:min-w-20 sm:max-w-85.5 sm:max-h-[16.0313rem] md:max-w-110 md:max-h-82.5 sm:flex-1" >
                  <Image
                    src={ExchangeImg}
                    alt='기본 이미지'
                    fill
                  />
                </div>

                <div className='sm:flex-1 sm:w-full'>
                  <CardCounterInput />
                </div>
              </div>
            </section>

            {/*교환 희망 정보 섹션*/}
            <section className="pt-6">
              <CardTitle size='L' titleMessage="교환 희망 정보" className="text-[1.375rem] font-bold mb-2.5 mt-0" />
              <div className="flex flex-col sm:flex-row gap-4 sm:mb-8.5">
                <div className='w-full'>
                  <p className='text-white font-bold mb-2.5 mt-11.5'>등급</p>
                  <SelectField
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                  >
                    <option
                      value=""
                      disabled
                    >
                      교환 등급 선택
                    </option>
                    <option value="legend">LEGENDARY</option>
                  </SelectField>
                </div>
                <div className='w-full mb-8.5 sm:mb-0'>
                  <p className='text-white font-bold mb-2.5 sm:mt-11.5'>장르</p>
                  <SelectField
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                  >
                    <option
                      value=""
                      disabled
                    >
                      교환 장르 선택
                    </option>
                    <option value="genre">풍경</option>
                  </SelectField>
                </div>
              </div>

              {/* 교환 희망 관련 상세 내용 입력 (시안의 textarea) */}
              <section className='mb-15'>
                <p className='text-white text-base font-bold mb-2.5'>교환 희망 설명</p>
                <textarea
                  className="w-full bg-gray-500 text-white py-3 px-5 border border-gray-200 rounded-[2px] resize-none placeholder-gray-200 placeholder:text-sm placeholder:font-light"
                  placeholder="설명을 입력해 주세요"
                  rows={3}
                />
              </section>
              <div className='border-t border-gray-400 mb-7.5 sm:hidden md:block'></div>
              <footer className="flex gap-3.75">
                <Button intent="secondary" thickness='thin' size='L' onClick={() => setIsOpen(false)} >취소하기</Button>
                <Button thickness='thin' size='L' onClick={() => alert('교환희망 판매하기 버튼을 클릭하였습니다.')} >판매하기</Button>
              </footer>
            </section>
          </div>
        </div >
      </div>
    </section >
  )
}