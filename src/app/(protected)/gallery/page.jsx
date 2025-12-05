import PhotoCardList from '@/components/ui/card/PhotoCardList';
import GalleryFilter from './_components/GalleryFilter';
import CardGradeStatus from '@/components/ui/label/CardGradeStatus';
import { CardTitle } from '@/components/common/card-title/CardTitle';

export default function MyGalleryPage() {
  return (
    <div className="sm:mb-[80px] md:mb-[110px] lg:mb-[140px]">
      <div className="hidden md:w-full md:block md:mt-[60px] lg-w-full lg:block lg:mt-[60px]">
        {/* lg일 때 */}
        <div className="font-normal font-br hidden lg:block lg:text-[62px]">
          <CardTitle
            size="L"
            titleMessage="마이갤러리"
            buttonSize="L"
            buttonMessage="포토카드 생성하기"
            className="w-full mx-auto"
          />
        </div>

        {/* md일 때 */}
        <div className="font-normal font-br hidden md:block md:text-[48px] lg:hidden">
          <CardTitle
            size="M"
            titleMessage="마이갤러리"
            buttonSize="S"
            buttonMessage="포토카드 생성하기"
            className="w-full mx-auto"
          />
        </div>
      </div>
      <CardGradeStatus />
      <GalleryFilter />
      <PhotoCardList type="count" />
    </div>
  );
}
