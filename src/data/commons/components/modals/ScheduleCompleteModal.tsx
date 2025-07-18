import { CalendarDays, Clock, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CustomButtonComponent from "../CustomButtonComponent";
import { useIsMobile } from "../../../hooks/useIsMobile";
import { AppRouteConstant } from "../../constants/AppRouteConstant";
import TextConstant from "../../constants/TextConstant";
import Success from "../../assets/svg/success.svg?react";

type Props = {
  onClose: () => void;
  date: string;
  time: string;
  duration: string;
};

export default function ScheduleCompletedModal({
  onClose,
  date,
  time,
  duration,
}: Props) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="fixed inset-0  min-h-screen bg-primary text-white  flex flex-col items-center justify-center p-6">
        <button onClick={onClose} className="absolute top-5 right-5 p-2">
          <X className="w-6 h-6 text-white" />
        </button>
        <div className="mb-8">
          <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center relative">
            <Success />
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-6">
          {TextConstant.scheduleCompleted}
        </h2>
        <div className="bg-teal-700/80 rounded-2xl px-5 py-4 w-full max-w-md space-y-2 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-sm">
            <CalendarDays className="w-4 h-4 text-white" />
            <span>{date}</span>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <Clock className="w-4 h-4 text-white mt-0.5" />
            <div className="flex flex-col">
              <span>{time}</span>
              <div className="text-sm text-gray-300">(1 hour)</div>
            </div>
          </div>
        </div>
        <div className="fixed bottom-5 min-w-screen px-5">
          <CustomButtonComponent
            variant="outline"
            className="text-white border-white hover:bg-transparent"
            onClick={() => navigate(AppRouteConstant.mainPage)}
          >
            {TextConstant.goToHome}
          </CustomButtonComponent>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-sm p-6 relative animate-fade-in">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>
        <div className="w-20 h-20 bg-orange-100 rounded-full mx-auto flex items-center justify-center mb-4">
          <span className="text-4xl">✅</span>
        </div>
        <h2 className="text-center text-lg font-semibold mb-6">
          Schedule Completed
        </h2>
        <div className="rounded-2xl px-5 py-4  space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{time}</span>
          </div>
          <div className="text-gray-300">{duration}</div>
        </div>

        <CustomButtonComponent
          variant="outline"
          onClick={() => {
            onClose();
            navigate(-1);
          }}
          className="border-black border text-black mt-5"
        >
          Go to Home
        </CustomButtonComponent>
      </div>
    </div>
  );
}
