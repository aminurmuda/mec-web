import Image from 'next/image';

interface MobileMenuProps {
  open: boolean;
  menu: { name: string; id: string }[];
  scrollTo: (id: string) => void;
  session: any;
  handleLogout: () => void;
}

const NavbarMobileMenu = ({ open, menu, scrollTo, session, handleLogout }: MobileMenuProps) => {
  if (!open) return null;

  return (
    <div className="md:hidden bg-brand-bg border-t border-gray-200">
      <div className="flex flex-col px-6 py-4 gap-4">
        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="text-left text-brand-primary font-semibold text-lg hover:text-white transition"
          >
            {item.name}
          </button>
        ))}
      </div>
      {!!session && (
        <div className="border border-t border-gray-200 px-5 py-4">
          <div className="flex items-center justify-between gap-4">
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
                <div className="w-8 h-8 flex items-center justify-center bg-gray-300 rounded-full text-sm font-medium">
                  {session.user?.name?.charAt(0)}
                </div>
              )}
              <div>
                <p className="font-semibold text-brand-primary">{session?.user?.name}</p>
                <p className="text-brand-primary mt-1 truncate">{session?.user?.email}</p>
              </div>
            </div>
            <span
              onClick={handleLogout}
              className="font-semibold text-left py-2.5 text-red-500 hover:bg-red-50 transition cursor-pointer"
            >
              Log out
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarMobileMenu;
