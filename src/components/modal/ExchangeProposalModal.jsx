'use client';

import { useState } from 'react';
import { CardExchange } from '@/components/ui/card/PhotoCardExchange';

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
    if (!message.trim()) return;
    onSubmit?.(message.trim());
    setMessage('');
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70">
      <div className="relative w-[1024px] max-w-[95vw] bg-[#111111] text-white rounded-2xl px-[64px] py-[40px] shadow-xl">
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-6 top-6 text-[#9ca3af] hover:text-white text-xl"
          aria-label="닫기"
        >
          ✕
        </button>

        <div className="mb-8">
          <div className="text-[16px] font-semibold text-[#d1d5db] mb-2">포토카드 교환하기</div>
          <h2 className="text-[32px] font-bold leading-tight">{cardTitle || '포토카드 제목'}</h2>
          <div className="mt-4 h-px w-full bg-[#e5e7eb33]" />
        </div>

        <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-12 items-start">
          <div className="bg-[#181818] rounded-2xl px-8 py-8 border border-[#27272a]">
            {cardElement ?? (
              <CardExchange
                grade="COMMON"
                category="풍경"
                price={4}
                nickname="프로여행러"
                title="스페인 여행"
                onApprove={() => {}}
                onReject={() => {}}
              />
            )}
          </div>

          <div className="flex flex-col">
            <label className="mb-3 text-[16px] font-semibold">교환 제시 내용</label>
            <textarea
              className="w-full min-h-[220px] resize-none rounded-xl border border-[#27272a] bg-[#050505] px-4 py-3 text-[14px] outline-none placeholder:text-[#6b7280]"
              placeholder="내용을 입력해 주세요"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <div className="mt-6 flex justify-end gap-4">
              <button
                type="button"
                onClick={handleClose}
                className="h-[52px] min-w-[140px] rounded-lg border border-[#4b5563] bg-[#111827] text-[15px] font-medium text-[#e5e7eb] hover:bg-[#1f2937]"
              >
                취소하기
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!message.trim()}
                className="h-[52px] min-w-[160px] rounded-lg bg-[#faff00] text-[15px] font-bold text-black disabled:opacity-60 disabled:cursor-not-allowed"
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
