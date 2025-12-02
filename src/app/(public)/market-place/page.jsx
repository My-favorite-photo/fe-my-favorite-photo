// src/app/(public)/market-place/page.jsx
'use client';

import { useState } from 'react';
import CardSeller from './_components/CardSeller';

export default function MarketplacePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  const [editTotalCount, setEditTotalCount] = useState(2);
  const [editPrice, setEditPrice] = useState(20);
  const [editWishGrade, setEditWishGrade] = useState('COMMON');
  const [editWishCategory, setEditWishCategory] = useState('풍경');
  const [editWishDescription, setEditWishDescription] = useState('');

  const cardData = {
    grade: 'LEGENDARY',
    category: '풍경',
    seller: '미쏘손',
    description:
      '우리집 앞마당 포토카드입니다. 우리집 앞마당 포토카드입니다. 우리집 앞마당 포토카드입니다.',
    price: 4,
    remaining: 2,
    total: 5,
  };

  const exchangeData = {
    grade: 'RARE',
    category: '풍경',
    description: '푸릇푸릇한 여름 풍경, 눈 앞에 내린 계절 풍경 사진에 관심이 많습니다.',
  };

  const gradeColors = {
    COMMON: 'text-[#85ff5b]',
    RARE: 'text-[#4cc3ff]',
    'SUPER RARE': 'text-[#ff6dd9]',
    LEGENDARY: 'text-[#ff3c7f]',
  };

  const handleEdit = () => {
    setEditTotalCount(cardData.total);
    setEditPrice(cardData.price * 5);
    setEditWishGrade('COMMON');
    setEditWishCategory('풍경');
    setEditWishDescription('');
    setModalType('edit');
    setIsModalOpen(true);
  };

  const handleUnlist = () => {
    setModalType('unlist');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  const maxCount = 3;
  const decreaseCount = () => setEditTotalCount((prev) => (prev > 1 ? prev - 1 : prev));
  const increaseCount = () => setEditTotalCount((prev) => (prev < maxCount ? prev + 1 : prev));

  const handleWheelCount = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) increaseCount();
    else decreaseCount();
  };

  const handleEditSubmit = () => {
    console.log('수정 완료', {
      totalCount: editTotalCount,
      price: editPrice,
      wishGrade: editWishGrade,
      wishCategory: editWishCategory,
      wishDescription: editWishDescription,
    });
    closeModal();
  };

  return (
    <>
      <div className="w-full min-h-screen bg-[#0a0a0a] text-white">
        <main className="max-w-[1080px] mx-auto px-6 py-8">
          <div className="mb-10">
            <div className="text-xs text-gray-500 mb-4">마켓플레이스</div>
            <h1 className="text-3xl font-bold mb-6">우리집 앞마당</h1>
            <div className="h-[1px] bg-[#2a2a2a]" />
          </div>

          <section className="grid grid-cols-[1fr_320px] gap-10 mb-16">
            <div>
              <div className="bg-black rounded-lg overflow-hidden">
                <div className="aspect-[4/3] bg-gradient-to-br from-amber-200 via-green-100 to-emerald-300" />
              </div>
            </div>

            <div className="bg-[#161616] border border-[#3d3d3d] rounded-md h-fit">
              <CardSeller
                grade={cardData.grade}
                category={cardData.category}
                title={cardData.seller}
                description={cardData.description}
                price={cardData.price}
                remaining={cardData.remaining}
                total={cardData.total}
                wishGrade={exchangeData.grade}
                wishCategory={exchangeData.category}
                wishDescription={exchangeData.description}
                onEdit={handleEdit}
                onUnlist={handleUnlist}
              />
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">교환 희망 정보</h2>
            <div className="h-[1px] bg-[#2a2a2a] mb-8" />

            <div className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-8">
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                {exchangeData.description}
              </p>

              <div className="flex items-center gap-3 text-sm">
                <span className={`${gradeColors[exchangeData.grade]} font-bold`}>
                  {exchangeData.grade}
                </span>
                <span className="text-gray-600">|</span>
                <span className="text-gray-400">{exchangeData.category}</span>
              </div>
            </div>
          </section>
        </main>
      </div>

      {isModalOpen && modalType === 'edit' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg bg-[#0c0c0c] border border-[#444] p-8 text-gray-100">
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex justify-center">
                <div className="w-16 h-1 rounded-full bg-[#555]" />
              </div>
              <div>
                <div className="text-xs text-gray-300 mb-2">수정하기</div>
                <h2 className="text-3xl font-bold text-white">우리집 앞마당</h2>
                <div className="h-[1px] bg-[#444]" />
              </div>
            </div>

            <div className="grid grid-cols-[280px_1fr] gap-10 mb-10">
              <div>
                <div className="bg-black rounded-lg overflow-hidden">
                  <div className="aspect-[4/3] bg-gradient-to-br from-amber-200 via-green-100 to-emerald-300" />
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-[#ff4c7d] font-extrabold text-lg">LEGENDARY</span>
                    <span className="h-[18px] w-px bg-[#666]" />
                    <span className="text-sm text-gray-200">풍경</span>
                  </div>
                  <div className="text-sm font-bold text-gray-100">유디</div>
                </div>

                <div className="h-[1px] bg-[#444]" />

                <div className="space-y-5 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-gray-200">총 판매 수량</span>
                    <div className="flex items-center gap-3">
                      <div
                        className="flex items-center border border-[#555] rounded-sm"
                        onWheel={handleWheelCount}
                      >
                        <button
                          type="button"
                          onClick={decreaseCount}
                          className="w-9 h-10 border-r border-[#555] text-lg text-gray-100"
                        >
                          −
                        </button>
                        <div className="w-12 text-center text-base select-none text-white">
                          {editTotalCount}
                        </div>
                        <button
                          type="button"
                          onClick={increaseCount}
                          className="w-9 h-10 border-l border-[#555] text-lg text-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-xs text-gray-400">
                        / {maxCount} <span className="ml-1">최대 {maxCount}장</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-gray-200">장당 가격</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={editPrice}
                        onChange={(e) => setEditPrice(Number(e.target.value) || 0)}
                        className="w-24 h-10 bg-transparent border border-[#555] px-3 text-sm text-white outline-none"
                      />
                      <span className="text-sm font-bold text-white">P</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold text-white mb-4">교환 희망 정보</h3>
              <div className="h-[1px] bg-[#444] mb-6" />

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="text-sm mb-2 text-gray-200">등급</div>
                  <select
                    value={editWishGrade}
                    onChange={(e) => setEditWishGrade(e.target.value)}
                    className="w-full h-11 bg-transparent border border-[#555] px-3 text-sm text-gray-100 outline-none"
                  >
                    <option value="COMMON">COMMON</option>
                    <option value="RARE">RARE</option>
                    <option value="SUPER_RARE">SUPER RARE</option>
                    <option value="LEGENDARY">LEGENDARY</option>
                  </select>
                </div>

                <div>
                  <div className="text-sm mb-2 text-gray-200">장르</div>
                  <select
                    value={editWishCategory}
                    onChange={(e) => setEditWishCategory(e.target.value)}
                    className="w-full h-11 bg-transparent border border-[#555] px-3 text-sm text-gray-100 outline-none"
                  >
                    <option value="풍경">풍경</option>
                    <option value="인물">인물</option>
                    <option value="도시">도시</option>
                    <option value="기타">기타</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="text-sm mb-2 text-gray-200">교환 희망 설명</div>
                <textarea
                  value={editWishDescription}
                  onChange={(e) => setEditWishDescription(e.target.value)}
                  className="w-full h-40 bg-transparent border border-[#555] p-3 text-sm text-gray-100 placeholder:text-gray-500 outline-none resize-none"
                  placeholder="설명을 입력해 주세요"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-4">
              <button
                type="button"
                onClick={closeModal}
                className="h-12 border border-[#555] text-sm font-semibold text-gray-100 hover:bg-[#1a1a1a]"
              >
                취소하기
              </button>
              <button
                type="button"
                onClick={handleEditSubmit}
                className="h-12 bg-[#faff00] text-black text-sm font-bold hover:bg-[#fdff4a]"
              >
                수정하기
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && modalType === 'unlist' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-[320px] rounded-lg bg-[#111] border border-[#444] p-6 text-sm text-gray-100">
            <h2 className="text-base font-bold mb-3 text-white">판매 내리기</h2>
            <p className="text-xs text-gray-200 leading-relaxed mb-6">
              정말 이 포토카드 판매를 내리시겠습니까?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 h-9 text-xs border border-[#555] rounded-sm text-gray-100 hover:bg-[#1a1a1a]"
              >
                취소
              </button>
              <button
                onClick={() => {
                  console.log('판매 내리기 확정');
                  closeModal();
                }}
                className="px-4 h-9 text-xs bg-[#faff00] text-black rounded-sm font-bold"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
