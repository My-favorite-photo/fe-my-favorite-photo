import Header from '@/components/common/header/Header';

export default function layout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
