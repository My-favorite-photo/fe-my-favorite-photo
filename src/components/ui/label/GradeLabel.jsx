export default function GradeLabel({ grade, size = 'sm', fontWeight = '' }) {
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

// 부모에서 item.grade 형태로 전달받기
// DB에 저장된 대문자 그대로 렌더링
