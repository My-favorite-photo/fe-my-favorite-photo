export default function GradeLabel({ grade, size }) {
  const gradeStyle = {
    COMMON: 'text-main',
    RARE: 'text-blue',
    SUPER_RARE: 'text-purple',
    LEGENDARY: 'text-pink',
  };

  const textClass = size
    ? 'text-[16px] font-bold'
    : 'sm:text-[10px] sm:font-light md:text-[16px] lg:text-[16px]';

  return (
    <div className={textClass}>
      <span className={gradeStyle[grade]}>{grade.replace('_', ' ')}</span>
    </div>
  );
}
