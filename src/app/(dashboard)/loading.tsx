export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 h-10 w-1/3 animate-pulse rounded-md bg-gray-300"></div>
      <div className="space-y-8">
        <div className="h-32 animate-pulse rounded-lg bg-gray-200 p-6 shadow-md"></div>
        <div className="h-48 animate-pulse rounded-lg bg-gray-200 p-6 shadow-md"></div>
      </div>
    </div>
  );
}
