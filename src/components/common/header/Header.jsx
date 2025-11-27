import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex w-full  justify-between items-center py-7 px-[220px]">
      <div>
        <Link href="/">
          <Image src="/header-img/logo.png" alt="headerLogoImg" width={120} height={40} />
        </Link>
      </div>

      <nav className="flex items-center gap-[30px] font-noto text-right text-gray-200 font-medium leading-normal">
        <Link href="/login">로그인</Link>
        <Link href="/signup">회원가입</Link>
      </nav>
    </header>
  );
}
