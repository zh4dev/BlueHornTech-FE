import StatCardComponent from "../../../data/commons/components/StatCardComponent";
import { useIsMobile } from "../../../data/hooks/useIsMobile";
import type { iStatItem } from "../../../data/interfaces/iStatItem";
import SkeletonCardComponent from "../../../data/commons/components/loading/SkeletonCardComponent";
import { renderSkeletons } from "../../../data/commons/components/HelperComponent";

type Props = {
  stats: iStatItem[];
  isLoading: boolean;
};

export default function UserStatSectionComponent({ stats, isLoading }: Props) {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <div className="flex flex-row gap-4">
        {isLoading
          ? renderSkeletons(3, SkeletonCardComponent)
          : stats.map((stat, i) => (
              <StatCardComponent
                key={i}
                value={stat.value}
                valueColor={stat.color}
                label={stat.label}
                className="flex-1"
              />
            ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {isLoading ? (
        <>
          <SkeletonCardComponent />
          <div className="flex flex-row gap-4">
            {renderSkeletons(2, SkeletonCardComponent)}
          </div>
        </>
      ) : (
        <>
          <StatCardComponent
            value={stats[0].value}
            valueColor={stats[0].color}
            label={stats[0].label}
          />
          <div className="flex flex-row gap-4">
            {stats.slice(1).map((stat, i) => (
              <StatCardComponent
                key={i}
                value={stat.value}
                valueColor={stat.color}
                label={stat.label}
                className="flex-1"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
