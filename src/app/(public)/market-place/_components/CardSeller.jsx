// C:\fe-my-favorite-photo\components\CardSeller.jsx
'use client';

const GRADE_CONFIG = {
  COMMON: {
    label: 'COMMON',
    colorClass: 'text-[#faff00]', // 노랑
  },
  RARE: {
    label: 'RARE',
    colorClass: 'text-[#46c6ff]', // 파랑
  },
  SUPER_RARE: {
    label: 'SUPER RARE',
    colorClass: 'text-[#c88bff]', // 보라
  },
  LEGENDARY: {
    label: 'LEGENDARY',
    colorClass: 'text-[#ff4c7d]', // 핑크
  },
};

export default function CardSeller({
  // 상단 내 카드 정보
  grade = 'COMMON', // COMMON | RARE | SUPER_RARE | LEGENDARY
  category = '풍경',
  title = '미쏘손', // 우측 상단 제목 (셀러 닉네임)
  description = '우리집 앞마당 포토카드입니다. 우리집 앞마당 포토카드입니다. 우리집 앞마당 포토카드입니다.',
  price = 4,
  remaining = 2,
  total = 5,

  // 교환 희망 카드 정보
  wishGrade = 'RARE',
  wishCategory = '풍경',
  wishDescription = '푸릇푸릇한 여름 풍경, 눈 많이 내린 겨울 풍경 사진에 관심이 많습니다.',

  // 버튼 액션
  onEdit,
  onUnlist,
}) {
  const myGrade = GRADE_CONFIG[grade] ?? GRADE_CONFIG.COMMON;
  const wishGradeConfig = GRADE_CONFIG[wishGrade] ?? GRADE_CONFIG.RARE;

  return (
    // 부모에서 이미 bg / border / rounded 주고 있음
    <div className="w-full text-white flex flex-col">
      {/* 내용 영역 */}
      <div className="flex-1 px-4 pt-6 pb-5">
        {/* 상단 등급 / 카테고리 / 제목 */}
        <header className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className={`text-[22px] font-extrabold leading-none ${myGrade.colorClass}`}>
              {myGrade.label}
            </span>
            <span className="h-[18px] w-px bg-[#4b5563]" />
            <span className="text-[18px] font-semibold text-[#d1d5db]">{category}</span>
          </div>

          <button
            type="button"
            className="text-[18px] font-extrabold underline underline-offset-[6px] whitespace-nowrap"
          >
            {title}
          </button>
        </header>

        {/* 설명 */}
        <section className="mt-6 text-[13px] leading-relaxed text-[#e5e7eb]">{description}</section>

        {/* 가격 / 잔여 */}
        <section className="mt-10 space-y-5 text-[13px]">
          <div className="flex items-center justify-between">
            <span className="text-[#d1d5db]">가격</span>
            <span className="text-[15px] font-bold">
              {price} <span className="text-[11px]">P</span>
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#d1d5db]">잔여</span>
            <span className="text-[15px] font-bold">
              {remaining} / {total}
            </span>
          </div>
        </section>

        {/* 구분선 */}
        <div className="mt-8 border-t border-[#3f3f3f]" />

        {/* 교환 희망 정보 타이틀 */}
        <section className="mt-4 flex items-center gap-2 text-[14px] font-bold">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#e5e7eb] text-[11px]">
            ↻
          </span>
          <span>교환 희망 정보</span>
        </section>

        {/* 교환 희망 카드 요약 */}
        <section className="mt-6">
          <div className="flex items-center gap-3">
            <span
              className={`text-[16px] font-extrabold leading-none ${wishGradeConfig.colorClass}`}
            >
              {wishGradeConfig.label}
            </span>
            <span className="h-[16px] w-px bg-[#4b5563]" />
            <span className="text-[14px] font-semibold text-[#d1d5db]">{wishCategory}</span>
          </div>

          <p className="mt-4 text-[13px] leading-relaxed text-[#e5e7eb]">{wishDescription}</p>
        </section>
      </div>

      {/* 하단 버튼 영역 – 모바일 스샷처럼 꽉 차게 */}
      <div className="w-full border-t border-[#3f3f3f]">
        <button
          type="button"
          onClick={onEdit}
          className="w-full py-3 text-[15px] font-bold bg-[#faff00] text-black"
        >
          수정하기
        </button>
        <button
          type="button"
          onClick={onUnlist}
          className="w-full py-3 text-[14px] font-bold bg-black text-white border-t border-[#111827]"
        >
          판매 내리기
        </button>
      </div>
    </div>
  );
}
