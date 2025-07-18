import React from "react";
import { Loader2 } from "lucide-react";
import TextConstant from "../constants/TextConstant";

type CustomButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "outlineWarning";
  onClick?: (e: any) => void;
  className?: string;
  isLoading?: boolean;
  isDisable?: boolean;
};

const CustomButtonComponent = ({
  children,
  variant = "primary",
  onClick,
  className = "",
  isLoading = false,
  isDisable = false,
}: CustomButtonProps) => {
  const baseStyles =
    "rounded-2xl w-full px-6 py-3.5 font-semibold text-sm transition-shadow shadow-sm flex justify-center items-center";

  const variants = {
    primary: "bg-teal-800 text-white hover:bg-teal-700",
    outline: "border border-blue-300 text-teal-800 hover:bg-blue-50",
    outlineWarning: "border border-red-300 text-red-500 hover:bg-red-50",
  };

  const isButtonDisabled = isLoading || isDisable;

  return (
    <button
      onClick={(e) => {
        if (!isButtonDisabled && onClick) {
          onClick(e);
        }
      }}
      className={`${baseStyles} ${variants[variant]} ${className} ${
        isButtonDisabled ? "opacity-60 cursor-not-allowed" : ""
      }`}
      disabled={isButtonDisabled}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
          {TextConstant.loading}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default CustomButtonComponent;
