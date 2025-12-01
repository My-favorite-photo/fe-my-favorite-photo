export default function GradeLabel({ grade, size = '', fontWeight = '' }) {
  const sizeStyle = size === 'sm' ? 'text-[10px]' : 'text-[16px]';

  const fontWeightStyle = fontWeight === 'bold' ? 'font-bold' : 'font-light';

  const gradeStyle = {
    COMMON: 'text-main',
    RARE: 'text-blue',
    SUPER_RARE: 'text-purple',
    LEGENDARY: 'text-pink',
  };

  return (
    <div className={`${sizeStyle} ${fontWeightStyle}`}>
      <span className={`${gradeStyle[grade]}`}>{grade.replace('_', ' ')}</span>
    </div>
  );
}
