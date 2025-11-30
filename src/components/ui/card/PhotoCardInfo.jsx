export default function PhotoCardInfo({ card, size, type }) {
  const textSize = size === 'sm' ? 'text-[10px]' : 'text-[16px]';
  const gap = size === 'sm' ? 'gap-[5px]' : 'gap-[10px]';

  const typeMap = {
    remain: {
      label: '잔여',
      left: card.remain,
      right: ` / ${card.total}`,
    },
    count: {
      label: '수량',
      left: card.remain,
      right: '',
    },
    hideRemain: {
      label: '잔여',
      left: '',
      right: `${card.total}`,
    },
  };

  const info = typeMap[type];

  return (
    <div className={`w-full flex flex-col ${gap} ${textSize}`}>
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
