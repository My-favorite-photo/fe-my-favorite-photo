import Image from 'next/image';
import img_card from '@/assets/images/img_card.svg';
import img_logo from '@/assets/images/logo.png';
import GradeLabel from '../label/GradeLabel';
import PhotoCardInfo from './PhotoCardInfo';

export default function PhotoCard({ card, type = 'remain', size = 'lg' }) {
  const sizeStyle = {
    sm: {
      container: 'w-[170px] p-[10px]',
      img: 'w-[150px] h-[112px] px-[40px] pt-[40px] pb-[25px]',
    },
    md: {
      container: 'w-[342px] h-[517px] p-[20px]',
      img: 'w-[302px] h-[227px]',
    },
    lg: {
      container: 'w-[440px] h-[600px] p-[40px]',
      img: 'w-[360px] h-[270px] pb-[25px]',
    },
  };

  const sizeClass = sizeStyle[size];

  return (
    <div
      className={`relative flex flex-col items-center bg-gray-500 border border-gray-400 rounded-[2px]
        ${sizeClass.container}`}
    >
      <Image
        src={img_card}
        alt="카드 이미지"
        width={`${sizeClass.img}`}
        height={`${sizeClass.img}`}
        className={`${size === 'sm' ? 'mb-[10px]' : 'mb-[25px]'}`}
      />

      <div
        className={`w-full flex flex-col
        ${size === 'sm' ? 'gap-[5px]' : 'gap-[10px]'}`}
      >
        <p
          className={`text-white font-bold whitespace-nowrap overflow-hidden text-ellipsis
            ${size === 'sm' ? 'text-[14px]' : 'text-[22px]'}`}
        >
          {card.title}
        </p>
        <div className="flex justify-between items-center">
          <div
            className={`flex items-center gap-[10px]
              ${size === 'sm' ? 'text-[10px]' : 'text-[16px]'}`}
          >
            <GradeLabel grade={card.grade} size={size === 'sm' ? 'sm' : ''} />
            <span
              className={`border border-l-gray-400 text-4 font-normal
                ${size === 'sm' ? 'h-[14px]' : 'h-[23px]'}`}
            />
            <span className="text-4 font-normal text-gray-300">{card.genre}</span>
          </div>
          <span
            className={`text-white text-4 font-normal text-right underline underline-offset-2 decoration-0
              ${size === 'sm' ? 'text-[10px]' : 'text-[16px]'}`}
          >
            {card.author}
          </span>
        </div>
      </div>

      <div
        className={`w-full border border-b-gray-400
          ${size === 'sm' ? 'my-[10px]' : 'my-[20px]'}`}
      />

      <div
        className={`w-full flex flex-col justify-between items-center
          ${size === 'sm' ? 'gap-[5px] text-[10px]' : 'gap-[10px] text-[16px]'}`}
      >
        <PhotoCardInfo card={card} size={size} type={type} />
      </div>

      {size === 'sm' ? (
        ''
      ) : (
        <Image src={img_logo} alt="로고" width={99} height={18} className="absolute bottom-10" />
      )}
    </div>
  );
}
