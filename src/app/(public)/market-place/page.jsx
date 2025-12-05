import { CardTitle } from '@/components/common/card-title/CardTitle';
import MarketFilter from './_components/MarketFilter';
import PhotoCardList from '@/components/ui/card/PhotoCardList';

export default function MarketPlacePage() {
  return (
    <div className="sm:mb-[80px] md:mb-[110px] lg:mb-[140px]">
      <div className="hidden md:w-full md:block md:mt-[60px] lg-w-full lg:block lg:mt-[60px]">
        {/* lg일 때 */}
        <div className="font-normal font-br hidden lg:block lg:text-[62px]">
          <CardTitle
            size="L"
            titleMessage="마켓 플레이스"
            buttonSize="L"
            buttonMessage="나의 포토카드 판매하기"
            className="w-full mx-auto"
          />
        </div>

        {/* md일 때 */}
        <div className="font-normal font-br hidden md:block md:text-[48px] lg:hidden">
          <CardTitle
            size="M"
            titleMessage="마켓 플레이스"
            buttonSize="S"
            buttonMessage="나의 포토카드 판매하기"
            className="w-full mx-auto"
          />
        </div>
      </div>
      <MarketFilter />
      <PhotoCardList />
    </div>
  );
}
