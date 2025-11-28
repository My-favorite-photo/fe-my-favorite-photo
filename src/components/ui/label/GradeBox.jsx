export default function GradeBox({ grade, count, size = 'sm' }) {
  const sizeStyle = {
    sm: 'h-[30px] px-[10px] py-[6px] text-[12px]',
    md: 'h-[32px] px-[10px] py-[6px] text-[14px]',
    lg: 'h-[40px] px-[20px] py-[8px] text-[16px]',
  };

  const gradeStyle = {
    COMMON: 'text-main border-main',
    RARE: 'text-blue border-blue',
    SUPER_RARE: 'text-purple border-purple',
    LEGENDARY: 'text-pink border-pink',
  };

  return (
    <div
      className={`bg-black inline-flex items-center gap-[10px] border-[1px] font-light ${sizeStyle[size]} ${gradeStyle[grade]}`}
    >
      <span>{grade.replace('_', ' ')}</span>
      <span>{count}장</span>
    </div>
  );
}
