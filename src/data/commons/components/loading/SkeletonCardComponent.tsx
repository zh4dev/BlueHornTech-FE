export default function SkeletonCardComponent() {
  return (
    <div className="flex flex-col gap-2 flex-1 animate-pulse rounded-xl border border-gray-200 p-4 shadow-sm bg-white">
      <div className="h-6 w-24 bg-gray-200 rounded-md" />
      <div className="h-4 w-16 bg-gray-100 rounded-md" />
    </div>
  );
}
