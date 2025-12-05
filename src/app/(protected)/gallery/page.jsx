import PhotoCardList from '@/components/ui/card/PhotoCardList';
import GalleryFilter from './_components/GalleryFilter';
import CardGradeStatus from '@/components/ui/label/CardGradeStatus';

export default function MyGalleryPage() {
  return (
    <div className="sm:mb-[80px] md:mb-[110px] lg:mb-[140px]">
      <CardGradeStatus />
      <GalleryFilter />
      <PhotoCardList type="count" />
    </div>
  );
}
