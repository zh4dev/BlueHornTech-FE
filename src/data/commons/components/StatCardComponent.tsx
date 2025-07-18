import { useNavigate } from "react-router-dom";
import { AppRouteConstant } from "../constants/AppRouteConstant";

const StatCardComponent = ({
  value,
  valueColor,
  label,
  className = "",
}: {
  value: string | number;
  valueColor: string;
  label: React.ReactNode;
  className?: string;
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={`rounded-2xl p-4 bg-white shadow text-center ${className}`}
      onClick={() => navigate(AppRouteConstant.schedules)}
    >
      <p className={`text-3xl font-bold ${valueColor}`}>{value}</p>
      <p className="text-sm text-gray-500 mt-2">{label}</p>
    </div>
  );
};

export default StatCardComponent;
