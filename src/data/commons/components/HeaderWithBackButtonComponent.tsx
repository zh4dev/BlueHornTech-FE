import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "../../hooks/useIsMobile";

type Props = {
  title: string;
  onBackPressed?: () => void;
};

export default function HeaderWithBackButtonComponent({
  title,
  onBackPressed,
}: Props) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div
      className={`flex  h-14 ${
        isMobile
          ? "relative items-center justify-center"
          : "items-center flex-row"
      }`}
    >
      <button
        className={`left-0 p-1 ${!isMobile ? "mr-4" : "absolute "}`}
        onClick={() => (onBackPressed ? onBackPressed() : navigate(-1))}
      >
        <ArrowLeft className="w-5 h-5 text-gray-700" />
      </button>
      <h2 className="text-lg font-semibold">{title}</h2>
    </div>
  );
}
