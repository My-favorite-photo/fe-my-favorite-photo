export default function GradeLabel({ grade }) {
  const gradeStyle = {
    COMMON: 'text-main',
    RARE: 'text-blue',
    SUPER_RARE: 'text-purple',
    LEGENDARY: 'text-pink',
  };

  return (
    <div className="sm:text-[10px] font-light md:text-[16px] font-bold lg:text-[16px] font-bold">
      <span className={gradeStyle[grade]}>{grade.replace('_', ' ')}</span>
    </div>
  );
}
