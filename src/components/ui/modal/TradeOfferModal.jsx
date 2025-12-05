'use client';

import { useState } from 'react';
import Image from 'next/image';
import PhotoCard from '@/components/ui/card/PhotoCard';
import photoChange from '@/assets/images/svg/photoChange.png';

export default function PhotoCardExchangeModal({
  isOpen,
  onClose,
  onSubmit,
  cardTitle,
  cardElement,
}) {
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleClose = () => {
    setMessage('');
    onClose?.();
  };

  const handleSubmit = () => {
    onSubmit?.(message.trim());
    setMessage('');
  };

  const defaultCard = {
    status: 'AVAILABLE',
    title: cardTitle || '포토카드 제목',
    grade: 'SUPER_RARE',
    genre: '풍경',
    author: '랍스타',
    price: 4,
    quantity: 2,
    remaining: 2,
    total: 2,
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70">
      <div className="relative w-[1040px] max-w-[95vw] bg-[#111111] px-[64px] py-[40px] text-white shadow-2xl rounded-none text-left">
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-6 top-6 text-[20px] text-[#9ca3af] hover:text-white"
        >
          ✕
        </button>

        <div className="mb-8 ml-[35px]">
          <Image
            src={photoChange}
            width={128}
            height={20}
            alt="포토카드 교환하기"
            className="mb-3"
          />

          <h2 className="text-[30px] font-bold leading-tight">{cardTitle || '포토카드 제목'}</h2>

          <div className="mt-5 h-px w-[100%] bg-white mx-auto" />
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-14 items-start">
          <div className="flex justify-center ml-[40px]">
            <div className="w-full max-w-[440px] min-w-0">
              {cardElement ?? (
                <PhotoCard
                  card={defaultCard}
                  type="remain"
                  cardImage={{ width: 342, height: 342 }}
                  soldoutIcon={{ width: 120, height: 120 }}
                />
              )}
            </div>
          </div>

          <div className="flex flex-col -ml-[35px]">
            <label className="mb-3 text-[15px] font-semibold">교환 제시 내용</label>

            <textarea
              className="
                w-full
                min-h-[110px]
                border border-[#d1d5db]
                bg-transparent
                px-4 py-3
                text-[14px] text-[#f9fafb]
                placeholder:text-[#6b7280]
                outline-none
                resize-none
                rounded-none
              "
              placeholder="내용을 입력해 주세요"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <div className="mt-12 flex w-full gap-4">
              <button
                type="button"
                onClick={handleClose}
                className="
                  flex-1
                  h-[52px]
                  border border-[#d1d5db]
                  bg-[#111111]
                  text-[15px] font-medium text-[#f9fafb]
                  hover:bg-[#1f2937]
                  rounded-none
                "
              >
                취소하기
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                className="
                  flex-1
                  h-[52px]
                  bg-[#EFFF04]
                  text-[15px] font-bold text-black
                  rounded-none
                "
              >
                교환하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
