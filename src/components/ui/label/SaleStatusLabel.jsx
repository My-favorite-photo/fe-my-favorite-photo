export default function SaleStatusLabel({ status, size = 'sm' }) {
  const sizeStyle = {
    sm: 'px-[8px] py-[4px] text-[10px]',
    md: 'px-[8px] py-[4px] text-[14px]',
    lg: 'px-[10px] py-[4px] text-[16px]',
  };

  const saleStatus = {
    AVAILABLE: { text: '판매 중', color: 'text-white' },
    EXCHANGE_OFFER: { text: '교환 제시 대기 중', color: 'text-main' },
    //SOLD_OUT : sold out 아이콘 처리
  };

  const cardStatus = saleStatus[status];

  return (
    <div
      className={`bg-black/50 inline-flex items-center gap-[10px] rounded-[2px] font-normal ${sizeStyle[size]}`}
    >
      <p className={`${cardStatus.color}`}>{cardStatus.text}</p>
    </div>
  );
}
