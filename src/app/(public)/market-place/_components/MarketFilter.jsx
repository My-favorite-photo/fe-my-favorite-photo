'use client';

import BoxDropDown from '@/components/ui/drop-down/BoxDropDown';
import DefaultDropDown from '@/components/ui/drop-down/DefaultDropDown';
import MobileFilter from '@/components/ui/drop-down/MobileFilter';
import SearchBar from '@/components/ui/search/SearchBar';
import { useFilter } from '@/providers/FilterProvider';

export default function MarketFilter() {
  const { filterLabels } = useFilter();

  return (
    <div className="w-full mx-auto sm:max-w-[345px] md:max-w-[704px] lg:max-w-[1480px]">
      {/* 모바일 */}
      <div className="md:hidden">
        <SearchBar />
        <div className="w-full border border-b-gray-400 my-[15px]" />
        <div className="flex justify-between items-center mb-5">
          <MobileFilter />
          <BoxDropDown items={filterLabels.price} filterKey="price" isMobile={true} />
        </div>
      </div>

      {/* 기본 */}
      <div className="hidden md:flex md:justify-between md:mb-[40px] lg:flex lg:justify-between lg:mb-[60px]">
        <div className="flex items-center">
          <div className="md:mr-[30px] lg:mr-[60px]">
            <SearchBar />
          </div>

          <div className="flex md:gap-[25px] lg:gap-[45px]">
            <DefaultDropDown items={filterLabels.grade} placeholder="등급" filterKey="grade" />
            <DefaultDropDown items={filterLabels.genre} placeholder="장르" filterKey="genre" />
            <DefaultDropDown
              items={filterLabels.status}
              placeholder="매진여부"
              filterKey="status"
            />
          </div>
        </div>

        <BoxDropDown items={filterLabels.price} filterKey="price" isMobile={false} size="35" />
      </div>
    </div>
  );
}
