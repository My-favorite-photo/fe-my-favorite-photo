'use client';

import Image from 'next/image';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';

import CardImg from '@/assets/images/img_card.svg';
import MarketplaceLogo from '@/assets/images/svg/marketplacelogo.png';

import { useAuth } from '@/providers/AuthProvider';
import { useModal } from '@/providers/ModalProvider';
import CardSeller from '@/app/(public)/market-place/[id]/_components/CardSeller';
import CardPopupModal from '@/app/(public)/market-place/_components/CardPopupModal';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3005';
const PAGE_TITLE = '우리집 앞마당';
const CARD_NAME = '미쓰손';

const DUMMY_SALE = {
  id: 'dummy-sale-id',
  sellerId: 'dummy-user-id',
  grade: 'LEGENDARY',
  genre: '풍경',
  description:
    '우리집 앞마당 포토카드입니다. 우리집 앞마당 포토카드입니다. 우리집 앞마당 포토카드입니다.',
  price: 4,
  quantity: 5,
  remaining: 2,
  wishGrade: 'RARE',
  wishGenre: '풍경',
  wishDescription: '푸릇푸릇한 여름 풍경, 눈 많이 내린 겨울 풍경 사진에 관심이 많습니다.',
  userCard: {
    photoCard: { name: CARD_NAME },
  },
};

function useBreakpoint() {
  const [w, setW] = useState(typeof window === 'undefined' ? 9999 : window.innerWidth);

  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return {
    isMobile: w <= 375,
    isTablet: w >= 376 && w <= 744,
    isPC: w >= 745,
  };
}

export default function MarketDetailPage() {
  const router = useRouter();
  const { id: userCardId } = useParams();

  const { isLoggedIn } = useAuth();
  const { openModal, MODAL_TYPES } = useModal();
  const { isMobile, isTablet, isPC } = useBreakpoint();

  const [sale, setSale] = useState(DUMMY_SALE);
  const [isLoading, setIsLoading] = useState(true);
  const [isUnlistOpen, setIsUnlistOpen] = useState(false);
  const [isUnlisting, setIsUnlisting] = useState(false);

  const isDummy = sale?.id === DUMMY_SALE.id;

  const fetchSaleData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/sales/user-card/${userCardId}`);
      if (!res.ok) return;
      const data = await res.json();
      if (data?.sale) setSale(data.sale);
      else if (data) setSale(data);
    } finally {
      setIsLoading(false);
    }
  }, [userCardId]);

  useEffect(() => {
    if (userCardId) fetchSaleData();
    else setIsLoading(false);
  }, [userCardId, fetchSaleData]);

  const view = useMemo(() => {
    const s = sale ?? DUMMY_SALE;
    return {
      grade: s.grade ?? 'COMMON',
      category: s.genre ?? '풍경',
      cardName: s.userCard?.photoCard?.name ?? CARD_NAME,
      description: s.description ?? '',
      price: Number(s.price ?? 0),
      total: Number(s.quantity ?? 0),
      remaining: Number(s.remaining ?? s.quantity ?? 0),
      wishGrade: s.wishGrade ?? 'RARE',
      wishCategory: s.wishGenre ?? '풍경',
      wishDescription: s.wishDescription ?? '',
    };
  }, [sale]);

  const handleEditSuccess = async () => {
    await fetchSaleData();
  };

  const openEditModal = () => {
    if (!isLoggedIn && !isDummy) {
      router.push('/login');
      return;
    }

    openModal(MODAL_TYPES.CARD_MODAL, {
      type: 'edit',
      card: {
        ...sale,
        saleId: sale.id,
        title: view.cardName,
        genre: view.category,
        quantity: view.total,
      },
      exchangeData: {
        grade: view.wishGrade,
        category: view.wishCategory,
        description: view.wishDescription,
      },
      onSuccess: handleEditSuccess,
    });
  };

  const confirmUnlist = async () => {
    if (isDummy) {
      setIsUnlistOpen(false);
      return;
    }

    setIsUnlisting(true);
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      await fetch(`${API_BASE}/sales/${sale.id}/unlist`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });

      setIsUnlistOpen(false);
      await fetchSaleData();
    } finally {
      setIsUnlisting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <p className="text-3xl font-bold">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] text-white">
      <main className="mx-auto w-full max-w-[1280px] px-4 min-[376px]:px-6 min-[745px]:px-8">
        <div className="py-6 min-[376px]:py-8 min-[745px]:py-10">
          <div className="mb-7 min-[376px]:mb-8 min-[745px]:mb-10">
            <Image
              src={MarketplaceLogo}
              alt="마켓플레이스"
              width={120}
              height={25}
              className="mb-4 w-[96px] min-[376px]:w-[110px] min-[745px]:w-[120px]"
            />
            <h1 className="font-bold mb-4 text-[30px] min-[376px]:text-[40px] min-[745px]:text-[44px]">
              {PAGE_TITLE}
            </h1>
            <div className="h-[1px] bg-white/70" />
          </div>

          <section className="mb-12 flex flex-col gap-6 min-[376px]:flex-row min-[745px]:gap-8">
            <div className="flex-shrink-0 w-[342px] h-[245px] min-[745px]:w-[960px] min-[745px]:h-[720px]">
              <div className="relative w-full h-full overflow-hidden rounded-md">
                <Image
                  src={typeof CardImg === 'string' ? CardImg : CardImg.src}
                  alt="카드 이미지"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <CardSeller
                saleId={sale.id}
                grade={view.grade}
                category={view.category}
                title={view.cardName}
                description={view.description}
                price={view.price}
                remaining={view.remaining}
                total={view.total}
                wishGrade={view.wishGrade}
                wishCategory={view.wishCategory}
                wishDescription={view.wishDescription}
                onEdit={openEditModal}
                onUnlist={() => setIsUnlistOpen(true)}
                isMyCard
              />
            </div>
          </section>
        </div>
      </main>

      {isUnlistOpen && (
        <CardPopupModal
          onClose={() => setIsUnlistOpen(false)}
          onConfirm={confirmUnlist}
          isLoading={isUnlisting}
        />
      )}
    </div>
  );
}
