import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from '@/context/LocaleContext';

interface MobileMenuProps {
  open: boolean;
  menu: { name: string; id: string; link?: string; isNew?: boolean }[];
  scrollTo: (id: string) => void;
  session: any;
  handleLogout: () => void;
  onClose: () => void;
}

const NavbarMobileMenu = ({ open, menu, scrollTo, session, handleLogout, onClose }: MobileMenuProps) => {
  const { locale } = useLocale();

  if (!open) return null;

  return (
    <div className="md:hidden bg-brand-bg border-t border-gray-200">
      <div className="flex flex-col px-6 py-4 gap-4">
        {menu.map((item) => (
          item.link ? (
            <Link
              key={item.id}
              href={item.link}
              target="_blank"
              onClick={onClose}
              className="flex items-center gap-2 text-left text-brand-primary font-semibold text-lg hover:text-white transition w-fit relative"
            >
              {item.name}
              {item.isNew && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  New
                </span>
              )}
            </Link>
          ) : (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-left text-brand-primary font-semibold text-lg hover:text-white transition"
            >
              {item.name}
            </button>
          )
        ))}
      </div>
      {!!session && (
        <div className="border-t border-gray-200 px-6 py-4 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            {session.user?.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || 'User'}
                width={36}
                height={36}
                className="rounded-full"
              />
            ) : (
              <div className="w-9 h-9 flex items-center justify-center bg-gray-300 rounded-full text-sm font-semibold">
                {session.user?.name?.charAt(0)}
              </div>
            )}
            <div>
              <p className="font-semibold text-brand-primary">{session?.user?.name}</p>
              <p className="text-brand-primary text-xs truncate max-w-[200px]">{session?.user?.email}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2.5 pt-2 border-t border-gray-100">
            <Link
              href={`/${locale}/profile`}
              onClick={onClose}
              className="text-left text-brand-primary text-md hover:text-white transition"
            >
              Profile
            </Link>
            <Link
              href={`/${locale}/admin`}
              onClick={onClose}
              className="text-left text-brand-primary text-md hover:text-white transition"
            >
              Admin Dashboard
            </Link>
            <button
              onClick={() => {
                handleLogout();
                onClose();
              }}
              className="text-left text-red-500 text-md hover:text-red-400 transition"
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarMobileMenu;
