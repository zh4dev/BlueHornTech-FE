type UserInfoCardProps = {
  name: string;
  additionalValue?: string;
  avatarUrl: string;
  className?: string;
  size?: "small" | "default";
};

export default function UserInfoCardComponent({
  name,
  additionalValue,
  avatarUrl,
  className = "",
  size = "default",
}: UserInfoCardProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src={avatarUrl}
        alt={name}
        className={`${
          size == "default" ? "w-10 h-10" : "w-8 h-8"
        } rounded-full object-cover`}
      />
      <div>
        <p
          className={`font-semibold ${
            size == "default" ? "text-sm" : "text-xs"
          }`}
        >
          {name}
        </p>
        {additionalValue && (
          <p className="text-xs text-gray-500">{additionalValue}</p>
        )}
      </div>
    </div>
  );
}
