// Прежний дизайн сайта сохранён по адресу /classic; в поиск не отдаём, главная версия - неоновая
export const metadata = { robots: { index: false, follow: false } };

export default function ClassicLayout({ children }: { children: React.ReactNode }) {
  return children;
}
