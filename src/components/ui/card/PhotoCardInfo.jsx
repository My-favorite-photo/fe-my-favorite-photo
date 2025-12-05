export default function PhotoCardInfo({ card, type }) {
  const totalRemain = card.saleOptions.reduce((sum, item) => sum + item.remain, 0);

  const typeMap = {
    remain: {
      label: '잔여',
      left: totalRemain,
      right: ` / ${card.total}`,
    },
    count: {
      label: '수량',
      left: totalRemain,
      right: '',
    },
    hideTotal: {
      label: '잔여',
      left: '',
      right: `${card.total}`,
    },
  };

  const info = typeMap[type];

  return (
    <div className="w-full flex flex-col sm:gap-[5px] sm:text-[10px] md:gap-[10px] md:text-[16px] lg:gap-[10px] lg:text-[16px]">
      <div className="w-full flex justify-between items-center">
        <span className="text-gray-300 font-light">가격</span>
        <span className="text-white font-normal">{card.price} P</span>
      </div>

      {info && (
        <div className="w-full flex justify-between items-center">
          <span className="text-gray-300 font-light">{info.label}</span>
          <div className="text-right">
            {info.left && <span className="text-white font-normal">{info.left}</span>}
            {info.right && <span className="text-gray-300 font-light">{info.right}</span>}
          </div>
        </div>
      )}
    </div>
  );
}
