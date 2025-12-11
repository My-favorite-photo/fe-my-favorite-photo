'use client';

import GradeBox from '@/components/ui/label/GradeBox';
import { useAuth } from '@/providers/AuthProvider';
import { usePhotoCards } from '@/providers/PhotoCardProvider';

export default function CardGradeStatus({ cards: propsCards }) {
  const { cards: contextCards } = usePhotoCards();
  const { user } = useAuth();

  const cards = propsCards && propsCards.length > 0 ? propsCards : contextCards;

  if (!cards || cards.length === 0) return null;

  const gradeCount = {
    COMMON: 0,
    RARE: 0,
    SUPER_RARE: 0,
    LEGENDARY: 0,
  };

  cards.forEach((card) => {
    const grade = card.grade || card.photoCard?.grade;
    if (!grade) return;

    const remain = card.saleOptions
      ? card.saleOptions.reduce((sum, option) => sum + option.remain, 0)
      : 1;

    gradeCount[grade] += remain;
  });

  const totalRemain = Object.values(gradeCount).reduce((a, b) => a + b, 0);

  return (
    <div className="w-full mx-auto flex flex-col sm:max-w-[345px] sm:mt-[20px] md:max-w-[704px] md:mt-[40px] lg:max-w-[1480px] lg:mt-[40px]">
      <div className="flex items-center gap-[10px] mb-[20px]">
        <span className="text-gray-200 sm:text-[14px] md:text-[20px] lg:text-[24px] font-bold">
          {user?.nickname ?? '유저'} 님이 보유한 포토카드
        </span>
        <span className="text-gray-300 text-right sm:text-[12px] lg:text-[18px] lg:text-[20px] font-normal">
          ({totalRemain}장)
        </span>
      </div>
      <div className="flex sm:gap-[10px] md:gap-[10px] lg:gap-[20px]">
        <GradeBox grade="COMMON" count={gradeCount.COMMON} />
        <GradeBox grade="RARE" count={gradeCount.RARE} />
        <GradeBox grade="SUPER_RARE" count={gradeCount.SUPER_RARE} />
        <GradeBox grade="LEGENDARY" count={gradeCount.LEGENDARY} />
      </div>

      <div className="border-b border-gray-400 sm:my-[15px] md:mt-[40px] md:mb-[20px] lg:mt-[40px] lg:mb-[20px]" />
    </div>
  );
}
