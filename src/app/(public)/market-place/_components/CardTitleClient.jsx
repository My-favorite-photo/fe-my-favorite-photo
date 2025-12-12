'use client';
import { CardTitle } from '@/components/common/card-title/CardTitle';
import { MODAL_TYPES, useModal } from '@/providers/ModalProvider';

export function CardTitleClient({ size }) {
  const { openModal } = useModal();
  return (
    <>
      <CardTitle
        onClick={() => openModal(MODAL_TYPES.SELL_PHOTO_CARD)}
        titleMessage="마켓 플레이스"
        buttonMessage="나의 포토카드 판매하기"
        className="w-full mx-auto"
        size={size ? 'M' : ''}
        buttonSize={size ? 'S' : ''}
      />
    </>
  );
}
