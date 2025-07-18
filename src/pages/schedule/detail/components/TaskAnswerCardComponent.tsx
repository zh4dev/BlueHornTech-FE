import { Check, X } from "lucide-react";
import type { Answer } from "../../../../data/commons/constants/GlobalTypeConstant";
import TextConstant from "../../../../data/commons/constants/TextConstant";
import CustomButtonComponent from "../../../../data/commons/components/CustomButtonComponent";
import { useState } from "react";

type Props = {
  id: number;
  title: string;
  description: string;
  answer: Answer;
  enableModifyTask: boolean;
  isLoading: boolean;
  onSelect: (id: number, value: boolean | null) => void;
  onReasonChange: (id: number, value: string) => void;
  onConfirmReason: (id: number) => void;
};

export default function TaskAnswerCardComponent({
  id,
  title,
  description,
  answer,
  enableModifyTask,
  isLoading,
  onSelect,
  onReasonChange,
  onConfirmReason,
}: Props) {
  const [isUpdatingReason, setIsUpdatingReason] = useState(false);

  return (
    <div className="bg-white w-full rounded-xl shadow p-4 flex flex-col mb-4">
      <span className="text-primary font-bold">{title}</span>
      <span className="mt-1">{description}</span>
      <div className="space-y-2 mt-3">
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={() => onSelect(id, true)}
            disabled={!enableModifyTask}
            className={`flex items-center gap-1 px-2 py-1 rounded-full ${
              answer.selected === true && answer.selected !== null
                ? "bg-green-100 text-green-700"
                : "text-green-700"
            }`}
          >
            <Check className="w-4 h-4" />
            {TextConstant.yes}
          </button>
          <span className="text-gray-400">|</span>
          <button
            onClick={() => onSelect(id, false)}
            disabled={!enableModifyTask}
            className={`flex items-center gap-1 px-2 py-1 rounded-full ${
              answer.selected === false && answer.selected !== null
                ? "bg-blue-100 text-red-600"
                : "text-red-600"
            }`}
          >
            <X className="w-4 h-4" />
            {TextConstant.no}
          </button>
        </div>

        {answer.selected === false && (enableModifyTask || answer.reason) && (
          <div className="flex flex-col">
            <input
              type="text"
              disabled={!enableModifyTask}
              placeholder={TextConstant.addReason}
              value={answer.reason || ""}
              onChange={(e) => {
                setIsUpdatingReason(true);
                onReasonChange(id, e.target.value);
              }}
              className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            {enableModifyTask && isUpdatingReason && (
              <div className="flex flex-row gap-5 mt-5">
                <CustomButtonComponent
                  variant="outline"
                  onClick={() => onSelect(id, null)}
                  isDisable={isLoading}
                >
                  {TextConstant.cancel}
                </CustomButtonComponent>
                <CustomButtonComponent
                  variant="primary"
                  onClick={() => {
                    setIsUpdatingReason(false);
                    onConfirmReason(id);
                  }}
                  isLoading={isLoading}
                >
                  {TextConstant.confirm}
                </CustomButtonComponent>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
