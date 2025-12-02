// C:\fe-my-favorite-photo\components\CardBuyer.jsx
'use client';

import { useState } from 'react';

/**
 * 포토카드 구매 모달
 *
 * @param {Object} card - 카드 정보
 * @param {string} card.grade - 등급 (COMMON, RARE, SUPER RARE, LEGENDARY)
 * @param {string} card.category - 카테고리 (풍경 등)
 * @param {string} card.seller - 판매자 닉네임
 * @param {string} card.description - 설명
 * @param {number} card.price - 가격 (P)
 * @param {number} card.remaining - 잔여 수량
 * @param {number} card.total - 총 수량
 * @param {Function} onClose - 닫기 핸들러
 * @param {Function} onPurchase - 구매 핸들러 (quantity) => void
 */
export default function CardBuyer({ card, onClose, onPurchase }) {
  const [quantity, setQuantity] = useState(1);

  // 등급별 색상 매핑
  const gradeColors = {
    COMMON: 'text-[#85ff5b]',
    RARE: 'text-[#4cc3ff]',
    'SUPER RARE': 'text-[#ff6dd9]',
    LEGENDARY: 'text-[#ff3c7f]',
  };

  const gradeColor = gradeColors[card.grade] || 'text-white';

  // 수량 감소
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // 수량 증가
  const handleIncrease = () => {
    if (quantity < card.remaining) {
      setQuantity(quantity + 1);
    }
  };

  // 총 가격 계산
  const totalPrice = card.price * quantity;

  // 구매 확인
  const handlePurchase = () => {
    if (onPurchase) {
      onPurchase(quantity);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-[320px] bg-[#161616] border border-[#3d3d3d] rounded-md">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[#3d3d3d]">
          <div className="flex items-center gap-3 text-xs">
            <span className={`${gradeColor} font-semibold`}>{card.grade}</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-300">{card.category}</span>
          </div>
          <button className="text-xs text-gray-300">{card.seller}</button>
        </div>

        {/* 본문 */}
        <div className="px-6 py-5">
          {/* 설명 */}
          <p className="text-xs text-gray-300 leading-relaxed mb-6">{card.description}</p>

          {/* 가격 */}
          <div className="flex items-center justify-between mb-4 text-sm">
            <span className="text-gray-400">가격</span>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-semibold text-white">{card.price}</span>
              <span className="text-xs text-gray-300">P</span>
            </div>
          </div>

          {/* 잔여 */}
          <div className="flex items-center justify-between mb-6 text-sm pb-6 border-b border-[#3d3d3d]">
            <span className="text-gray-400">잔여</span>
            <div>
              <span className="font-semibold text-white">{card.remaining}</span>
              <span className="text-sm text-gray-400"> / {card.total}</span>
            </div>
          </div>

          {/* 구매 수량 */}
          <div className="flex items-center justify-between mb-4 text-sm">
            <span className="text-gray-300">구매수량</span>
            <div className="flex items-center border border-[#555] rounded-sm">
              <button
                onClick={handleDecrease}
                disabled={quantity <= 1}
                className="w-8 h-9 text-sm border-r border-[#555] disabled:opacity-30 disabled:cursor-not-allowed"
              >
                -
              </button>
              <div className="w-12 text-center text-sm">{quantity}</div>
              <button
                onClick={handleIncrease}
                disabled={quantity >= card.remaining}
                className="w-8 h-9 text-sm border-l border-[#555] disabled:opacity-30 disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>
          </div>

          {/* 총 가격 */}
          <div className="flex items-center justify-between mb-6 text-sm">
            <span className="text-gray-300">총 가격</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-semibold text-white">{totalPrice}</span>
              <span className="text-xs text-gray-300">P</span>
              <span className="text-xs text-gray-400 ml-1">({quantity}장)</span>
            </div>
          </div>

          {/* 구매 버튼 */}
          <button
            type="button"
            onClick={handlePurchase}
            className="w-full h-11 text-sm font-semibold bg-[#f5ff00] text-black hover:bg-[#f7ff4d] transition"
          >
            포토카드 구매하기
          </button>
        </div>
      </div>
    </div>
  );
}
