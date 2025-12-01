import BoxDropDown from '@/components/ui/drop-down/BoxDropDown';
import DefaultDropDown from '@/components/ui/drop-down/DefaultDropDown';
import MobileFilter from '@/components/ui/drop-down/MobileFilter';
import SearchBar from '@/components/ui/search/SearchBar';

export default function MarketFilter() {
  const gradeData = ['COMMON', 'RARE', 'SUPER RARE', 'LEGENDARY'];
  const genreData = ['여행', '풍경', '인물', '사물'];
  const saleData = ['판매 중', '판매 완료'];
  const priceData = ['낮은 가격순', '높은 가격순', '최신순'];

  return (
    <div
      className="w-full mx-auto
        sm:max-w-[305px]
        md:max-w-[704px]
        lg:max-w-[1480px]"
    >
      {/* 모바일 */}
      <div className="flex justify-between mb-5 md:hidden">
        <MobileFilter />
        <BoxDropDown items={priceData} filterKey="price" />
      </div>

      {/* 기본 */}
      <div className="hidden md:flex justify-between mb-[60px]">
        <div className="flex items-center">
          <div className="mr-[60px]">
            <SearchBar />
          </div>

          <div className="flex gap-[45px]">
            <DefaultDropDown items={gradeData} placeholder="등급" filterKey="grade" />
            <DefaultDropDown items={genreData} placeholder="장르" filterKey="genre" />
            <DefaultDropDown items={saleData} placeholder="매진여부" filterKey="status" />
          </div>
        </div>

        <BoxDropDown items={priceData} filterKey="price" />
      </div>
    </div>
  );
}
