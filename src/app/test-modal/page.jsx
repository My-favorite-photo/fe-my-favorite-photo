'use client';

import { useState } from 'react';
import PhotoCardExchangeModal from '@/components/ui/modal/TradeOfferModal';

export default function TestModalPage() {
  const [isOpen, setIsOpen] = useState(true);

  const handleSubmit = (message) => {
    console.log('제출된 메시지:', message);
    alert(`제출됨: ${message}`);
    setIsOpen(false);
  };

  const handleClose = () => {
    console.log('모달 닫힘');
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#ffffff] flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-white text-2xl mb-4">모달 테스트 페이지</h1>

        <button
          onClick={() => setIsOpen(true)}
          className="px-8 py-4 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500"
        >
          모달 열기
        </button>

        <PhotoCardExchangeModal
          isOpen={isOpen}
          onClose={handleClose}
          onSubmit={handleSubmit}
          cardTitle="우리집 앞마당"
        />
      </div>
    </div>
  );
}
