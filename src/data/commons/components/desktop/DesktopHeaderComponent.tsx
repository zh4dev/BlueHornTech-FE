import { useEffect, useState } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import UserInfoCardComponent from "../UserInfoCardComponent";
import TextConstant from "../../constants/TextConstant";
import Logo from "../../assets/svg/logo.svg?react";

interface DesktopHeaderProps {
  name: string;
  email: string;
  avatarUrl: string;
  onSignOut: () => void;
  isForceOpenMenu?: boolean;
}

export default function DesktopHeaderComponent({
  name,
  email,
  avatarUrl,
  onSignOut,
  isForceOpenMenu = false,
}: DesktopHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isForceOpenMenu) {
      setIsOpen(true);
    }
  }, [isForceOpenMenu]);

  return (
    <div>
      <div className="flex flex-row justify-between items-center bg-sky-200 p-3 rounded-xl">
        <Logo />
        <div
          className="flex flex-row items-center gap-5 cursor-pointer relative"
          onClick={() => setIsOpen(!isOpen)}
        >
          <UserInfoCardComponent
            name={name ?? TextConstant.unknown}
            avatarUrl={avatarUrl ?? TextConstant.unknown}
            additionalValue={email ?? TextConstant.unknown}
            size="small"
          />
          <ChevronDown className="w-3 h-3" />

          {isOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow z-50">
              <button
                onClick={() => {
                  setIsOpen(!isOpen);
                  onSignOut();
                }}
                className="flex items-center gap-2 text-red-500 px-4 py-3 hover:bg-gray-100 w-full text-sm font-medium"
              >
                <LogOut className="w-4 h-4" />
                {TextConstant.signOut}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
