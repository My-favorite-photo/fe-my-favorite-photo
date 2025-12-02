import PhotoCardList from '@/components/ui/card/PhotoCardList';
import CardGradeStatus from '@/components/ui/label/CardGradeStatus';
import SellingFilter from './_components/SellingFilter';

export default function MySelling() {
  return (
    <div className="sm:mb-[80px] md:mb-[110px] lg:mb-[140px]">
      <CardGradeStatus />
      <SellingFilter />
      <PhotoCardList type="hideTotal" showSaleLabel={true} />
    </div>
  );
}
