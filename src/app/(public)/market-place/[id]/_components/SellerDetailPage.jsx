'use client';

import Image from 'next/image';
import { useState } from 'react';

import CardImg from '@/assets/images/img_card.svg';
import MarketplaceLogo from '@/assets/images/svg/marketplacelogo.png';
import { CardExchange } from '@/components/ui/card/PhotoCardExchange';
import CardSeller from '@/app/(protected)/gallery/[id]/_components/CardSeller';

const exchangeData = {
  grade: 'RARE',
  category: '풍경',
  description: '푸릇푸릇한 여름 풍경, 눈 앞에 내린 계절 풍경 사진에 관심이 많습니다.',
};

const maxCount = 3;

const exchangeOffer = {
  grade: 'COMMON',
  title: '스페인 여행',
};

const pageTitle = '우리집 앞마당';

export default function BuyerDetailPage({ card }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  const [editTotalCount, setEditTotalCount] = useState(card.total);
  const [editPrice, setEditPrice] = useState(card.price * 5);
  const [editWishGrade, setEditWishGrade] = useState('COMMON');
  const [editWishCategory, setEditWishCategory] = useState('풍경');
  const [editWishDescription, setEditWishDescription] = useState('');

  const handleEdit = () => {
    setEditTotalCount(card.total);
    setEditPrice(card.price * 5);
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

  const openExchangeApprove = () => {
    setModalType('exchangeApprove');
    setIsModalOpen(true);
  };

  const openExchangeReject = () => {
    setModalType('exchangeReject');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  const decreaseCount = () => {
    setEditTotalCount((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const increaseCount = () => {
    setEditTotalCount((prev) => (prev < maxCount ? prev + 1 : prev));
  };

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

  const cardData = card.userCard.photoCard;

  const baseHost = process.env.NEXT_PUBLIC_IMAGE_HOST || 'http://127.0.0.1:3005';
  const fullImageUrl = cardData?.imageUrl
    ? cardData.imageUrl.startsWith('http')
      ? cardData.imageUrl
      : `${baseHost}/${cardData.imageUrl}`
    : img_card; // 기본 이미지는 폴백

  return (
    <>
      <div className="w-full min-h-screen bg-[#0a0a0a] text-white">
        <main className="max-w-[1080px] mx-auto px-6 py-8">
          <div className="mb-10">
            <div className="mb-6">
              <Image
                src={MarketplaceLogo}
                alt="마켓플레이스"
                width={120}
                height={25}
                className="object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold mb-6">{cardData.name}</h1>
            <div className="h-[1px] bg-[#2a2a2a]" />
          </div>

          <section className="grid grid-cols-[1fr_320px] gap-10 mb-16">
            <div>
              <div className="relative w-full h-full object-cover aspect-4/3 bg-black rounded-lg overflow-hidden">
                <Image src={fullImageUrl} alt="카드 이미지" fill />
              </div>
            </div>

            <div>
              <div className="bg-[#161616] rounded-md h-fit mb-6">
                <CardSeller
                  grade={cardData.grade}
                  category={cardData.category}
                  title={card.seller.nickname}
                  description={cardData.description}
                  price={cardData.price}
                  remaining={card.quantity}
                  total={cardData.totalQuantity - card.userCard.totalQuantity}
                  wishGrade={card.grade}
                  wishCategory={card.category}
                  wishDescription={card.description}
                  onEdit={handleEdit}
                  onUnlist={handleUnlist}
                />
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">교환 제시 목록</h2>
            </div>

            <div className="h-[1px] bg-[#2a2a2a] mb-8" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <CardExchange
                grade="COMMON"
                nickname="프로여행러"
                onApprove={openExchangeApprove}
                onReject={openExchangeReject}
              />

              <CardExchange
                grade="SUPER_RARE"
                nickname="랍스타"
                onApprove={openExchangeApprove}
                onReject={openExchangeReject}
              />
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
                <h2 className="text-3xl font-bold text-white">{cardData.title}</h2>
                <div className="h-[1px] bg-[#444]" />
              </div>
            </div>

            <div className="grid grid-cols-[280px_1fr] gap-10 mb-10">
              <div>
                <div className="bg-black rounded-lg overflow-hidden">
                  <img
                    src={typeof CardImg === 'string' ? CardImg : CardImg.src}
                    alt="카드 이미지"
                    className="w-full h-full object-cover aspect-[4/3]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-[#ff4c7d] font-extrabold text-lg">{cardData.grade}</span>
                    <span className="h-[18px] w-px bg-[#666]" />
                    <span className="text-sm text-gray-200">{cardData.category}</span>
                  </div>
                  <div className="text-sm font-bold text-gray-100">{cardData.seller}</div>
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
              <h3 className="text-lg font-bold text-white mb-4">교환 제시 목록</h3>
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
                <div className="text-sm mb-2 text-gray-200">교환 제시 설명</div>
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

      {isModalOpen && modalType === 'exchangeApprove' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-full max-w-[520px] rounded-lg bg-[#111] border border-[#444] px-10 py-12 text-sm text-gray-100 relative">
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-6 top-6 text-2xl leading-none text-gray-400 hover:text-gray-200"
            >
              ×
            </button>

            <div className="text-center mb-10 mt-4">
              <h2 className="text-xl font-bold text-white mb-6">교환 제시 승인</h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                [{exchangeOffer.grade} | {exchangeOffer.title}] 카드와의 교환을 승인하시겠습니까?
              </p>
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => {
                  console.log('교환 제시 승인 확정');
                  closeModal();
                }}
                className="w-[520px] h-28 bg-[#faff00] text-black font-bold text-base rounded-none hover:bg-[#fdff4a]"
              >
                승인하기
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && modalType === 'exchangeReject' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-full max-w-[520px] rounded-lg bg-[#111] border border-[#444] px-10 py-12 text-sm text-gray-100 relative">
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-6 top-6 text-2xl leading-none text-gray-400 hover:text-gray-200"
            >
              ×
            </button>

            <div className="text-center mb-10 mt-4">
              <h2 className="text-xl font-bold text-white mb-6">교환 제시 거절</h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                [{exchangeOffer.grade} | {exchangeOffer.title}] 카드와의 교환을 거절하시겠습니까?
              </p>
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => {
                  console.log('교환 제시 거절 확정');
                  closeModal();
                }}
                className="w-[520px] h-28 bg-black border border-[#888] text-white font-bold text-base rounded-none hover:bg-[#111]"
              >
                거절하기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
