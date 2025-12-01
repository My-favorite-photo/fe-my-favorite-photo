import MarketFilter from './_components/MarketFilter';
import PhotoCardList from '@/components/ui/card/PhotoCardList';

export default function MarketPlace() {
  return (
    <div className="sm:mb-[80px] md:mb-[110px] lg:mb-[140px]">
      <MarketFilter />
      <PhotoCardList />
    </div>
  );
}
