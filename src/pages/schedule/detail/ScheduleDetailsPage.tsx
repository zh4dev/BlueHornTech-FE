import UserInfoCardComponent from "../../../data/commons/components/UserInfoCardComponent";
import ScheduleTimeBoxComponent from "./components/ScheduleTimeBoxComponent";
import MapLocationCardComponent from "./components/MapLocationCardComponent";
import { useEffect, useState } from "react";
import type { Answer } from "../../../data/commons/constants/GlobalTypeConstant";
import HeaderWithBackButtonComponent from "../../../data/commons/components/HeaderWithBackButtonComponent";
import ClientInfoSectionComponent from "./components/ClientInfoSectionComponent";
import TaskAnswerCardComponent from "./components/TaskAnswerCardComponent";
import TimerComponent from "../../../data/commons/components/TimerComponent";
import DefaultLayout from "../../../data/commons/components/layout/DefaultLayout";
import { useIsMobile } from "../../../data/hooks/useIsMobile";
import { useNavigate, useParams } from "react-router-dom";
import type { iScheduleDetail } from "../../../data/interfaces/schedule/iScheduleDetail";
import { scheduleService } from "../../../data/services/scheduleService";
import GlobalHelper from "../../../data/commons/helpers/GlobalHelper";
import TextConstant from "../../../data/commons/constants/TextConstant";
import GlobalConstant from "../../../data/commons/constants/GlobalConstant";
import { AppRouteConstant } from "../../../data/commons/constants/AppRouteConstant";
import DateHelper from "../../../data/commons/helpers/DateHelper";
import { renderSkeletons } from "../../../data/commons/components/HelperComponent";
import SkeletonCardComponent from "../../../data/commons/components/loading/SkeletonCardComponent";
import { eventBus } from "../../../data/commons/helpers/EventBusHelper";
import EventBusConstant from "../../../data/commons/constants/EventBusConstant";
import type { iTask } from "../../../data/interfaces/task/iTask";
import { taskService } from "../../../data/services/taskService";
import type { iTaskUpdateRequest } from "../../../data/interfaces/task/iTaskUpdateRequest";
import { toast } from "react-toastify";
import { PlusIcon } from "lucide-react";
import type { iTaskCreateRequest } from "../../../data/interfaces/task/iTaskCreateRequest";
import CustomButtonComponent from "../../../data/commons/components/CustomButtonComponent";
import ScheduleActionComponent from "../../../data/commons/components/ScheduleActionComponent";
import { useScheduleModalStore } from "../../../data/stores/useScheduleModalStore";

export default function ScheduleDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const showModal = useScheduleModalStore((state) => state.showModal);
  const [taskLoading, setTaskLoading] = useState<Record<number, boolean>>({});
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [scheduleDetail, setScheduleDetail] = useState<iScheduleDetail | null>(
    null
  );
  const [isLoading, setLoading] = useState(false);
  const [isLoadingNewTask, setIsLoadingNewTask] = useState(false);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  const isMobile = useIsMobile();

  const setTaskLoadingById = (id: number, isLoading: boolean) => {
    setTaskLoading((prev) => ({
      ...prev,
      [id]: isLoading,
    }));
  };

  useEffect(() => {
    initializeData();
  }, []);

  useEffect(() => {
    eventBus.on(EventBusConstant.refreshScheduleDetail, initializeData);
    return () => {
      eventBus.off(EventBusConstant.refreshScheduleDetail, initializeData);
    };
  }, []);

  const initializeData = async () => {
    if (!id) {
      navigate(-1);
      return;
    }

    try {
      setLoading(true);
      setScheduleDetail(null);
      const value = await scheduleService.getById(parseInt(id));
      if (value.data) {
        setScheduleDetail(value.data);
        initAnswer(value.data.tasks);
      }
    } catch (e) {
      GlobalHelper.onCatchErrorMessage(e);
      navigate(AppRouteConstant.mainPage);
    } finally {
      setLoading(false);
    }
  };

  const initAnswer = (tasks: iTask[]) => {
    const initialAnswers: Record<number, Answer> = {};
    tasks.forEach((task) => {
      initialAnswers[task.id] = {
        selected: task.completed,
        reason: task.reason,
      };
    });
    setAnswers(initialAnswers);
  };

  const onUpdateTask = async (id: number, value: Answer): Promise<void> => {
    setTaskLoadingById(id, true);
    try {
      const request = {
        completed: value.selected,
        reason: value.reason,
      } as iTaskUpdateRequest;
      const result = await taskService.update(id, request);
      if (result.success) {
        toast(result.message);
      }
    } catch (e) {
      GlobalHelper.onCatchErrorMessage(e);
    } finally {
      setTaskLoadingById(id, false);
    }
  };

  const handleSelect = (id: number, value: boolean | null) => {
    if (value != null) {
      setAnswers((prev) => ({
        ...prev,
        [id]: { ...prev[id], selected: value },
      }));
      if (value == true) {
        onUpdateTask(id, {
          selected: value,
        });
      }
    } else {
      setAnswers((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    }
  };

  const isStatusProgress = (): boolean => {
    return scheduleDetail?.status == "in-progress";
  };

  const handleReasonChange = (id: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: { ...prev[id], reason: value },
    }));
  };

  const onConfirmReason = async (id: number) => {
    await onUpdateTask(id, answers[id]);
  };

  const onConfirmAdd = async () => {
    if (!newTask.title.trim() || !newTask.description.trim()) return;
    try {
      setIsLoadingNewTask(true);
      const request = {
        scheduleId: scheduleDetail?.id,
        title: newTask.title,
        description: newTask.description,
      } as iTaskCreateRequest;
      const result = await taskService.create(request);
      if (result.success && result.data) {
        toast(result.message);
        initializeData();
      }
    } catch (e) {
      GlobalHelper.onCatchErrorMessage(e);
    } finally {
      setIsAddingTask(false);
      setIsLoadingNewTask(false);
    }
  };

  return (
    <div className="flex flex-col m-5">
      <DefaultLayout>
        <HeaderWithBackButtonComponent title={TextConstant.scheduleDetails} />

        {scheduleDetail?.visitLog?.startTime && isStatusProgress() && (
          <TimerComponent
            startDateTime={scheduleDetail?.visitLog.startTime}
            className="mt-5"
          ></TimerComponent>
        )}

        {isLoading ? (
          <div className="mt-5 mb-2 flex flex-col gap-5">
            {renderSkeletons(2, SkeletonCardComponent)}
          </div>
        ) : (
          <div className="flex- flex-col">
            <div className="bg-sky-50 p-3 rounded-xl mt-5 mb-2 flex flex-col items-center">
              <span className="text-primary font-bold">
                {GlobalHelper.capitalizeEachWord(
                  scheduleDetail?.serviceName.replaceAll("_", " ") ??
                    TextConstant.unknown
                )}
              </span>
              <UserInfoCardComponent
                name={scheduleDetail?.caregiver?.name ?? TextConstant.unknown}
                avatarUrl={
                  scheduleDetail?.caregiver?.picture ??
                  GlobalConstant.dummyImage
                }
                className="mt-3"
              />
              {scheduleDetail?.date &&
                scheduleDetail.startTime &&
                scheduleDetail.endTime && (
                  <ScheduleTimeBoxComponent
                    date={DateHelper.getFormattedDate(scheduleDetail!.date)}
                    time={DateHelper.getFormattedTime(
                      scheduleDetail?.startTime,
                      scheduleDetail!.endTime
                    )}
                    className="flex flex-row mt-4 w-full"
                  />
                )}
            </div>
            <ClientInfoSectionComponent
              email={scheduleDetail?.client.email ?? TextConstant.unknown}
              phone={scheduleDetail?.client.phone ?? TextConstant.unknown}
              address={scheduleDetail?.client.address ?? TextConstant.unknown}
            />
          </div>
        )}

        <div className="mt-5"></div>
        <h3 className="font-bold mt-2 mb-3">{TextConstant.tasks}:</h3>
        {isLoading ? (
          <div className="flex flex-col gap-5">
            {renderSkeletons(3, SkeletonCardComponent)}
          </div>
        ) : (
          <div className="flex flex-col">
            {scheduleDetail?.tasks.map((task: any) => (
              <TaskAnswerCardComponent
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                enableModifyTask={isStatusProgress()}
                answer={answers[task.id] || {}}
                onSelect={handleSelect}
                onReasonChange={handleReasonChange}
                onConfirmReason={onConfirmReason}
                isLoading={taskLoading[task.id] === true}
              />
            ))}

            {isAddingTask && !isLoadingNewTask && (
              <div className="flex flex-col  mb-5 mt-3 border p-4 rounded-xl border-sky-200 bg-sky-50 gap-4">
                <input
                  type="text"
                  placeholder="Task Title"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="border border-sky-300 rounded-xl px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
                <textarea
                  placeholder="Task Description"
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="border border-sky-300 rounded-xl px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-sky-500 resize-none"
                  rows={3}
                />
                <div className="flex flex-row gap-5">
                  <CustomButtonComponent
                    onClick={() => setIsAddingTask(false)}
                    isDisable={isLoadingNewTask}
                    variant="outlineWarning"
                  >
                    {TextConstant.cancel}
                  </CustomButtonComponent>
                  <CustomButtonComponent
                    onClick={onConfirmAdd}
                    isLoading={isLoadingNewTask}
                    isDisable={!newTask.description || !newTask.title}
                    variant="primary"
                  >
                    {TextConstant.confirm}
                  </CustomButtonComponent>
                </div>
              </div>
            )}

            {isLoadingNewTask && (
              <div className="flex flex-row mb-5 mt-3 gap-2 animate-pulse items-center">
                <div className="w-6 h-6 bg-sky-200 rounded" />
                <div className="h-4 w-24 bg-sky-100 rounded" />
              </div>
            )}

            {!isAddingTask && !isLoadingNewTask && isStatusProgress() && (
              <div
                className="flex flex-row mb-5 mt-3 gap-2 cursor-pointer hover:opacity-80 items-center"
                onClick={() => setIsAddingTask(true)}
              >
                <PlusIcon className="text-sky-500" width={23} height={23} />
                <p className="text-sky-500">Add New Task</p>
              </div>
            )}
          </div>
        )}
        {scheduleDetail?.visitLog?.startLat &&
          scheduleDetail?.visitLog?.startLng &&
          (!isMobile || (isMobile && !showModal)) && (
            <div className="flex flex-col">
              <h3 className="font-bold mt-5 mb-3">
                {TextConstant.checkInLocation}
              </h3>
              <MapLocationCardComponent
                lat={scheduleDetail?.visitLog?.startLat}
                lng={scheduleDetail?.visitLog?.startLng}
                address={
                  scheduleDetail?.visitLog.address ?? TextConstant.unknown
                }
              />
            </div>
          )}
        <h3 className="font-bold mt-8 mb-3">{TextConstant.serviceNotes}</h3>
        {isLoading ? (
          renderSkeletons(1, SkeletonCardComponent)
        ) : (
          <span className="text-sm leading-relaxed whitespace-pre-line">
            {scheduleDetail?.serviceNotes ?? TextConstant.unknown}
          </span>
        )}
        {scheduleDetail?.status && (
          <div className="flex flex-row mt-30 gap-5">
            <ScheduleActionComponent
              id={scheduleDetail.id}
              status={scheduleDetail.status}
            />
          </div>
        )}
      </DefaultLayout>
    </div>
  );
}
