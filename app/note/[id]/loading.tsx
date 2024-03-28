export default function NoteSkeleton() {
  return (
    <div className="w-full h-full p-16 animate-pulse">
      <div className="h-8 flex">
        <div className="bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4" />
        <div className="bg-gray-200 rounded-full dark:bg-gray-700 w-1/6 mb-4" />
      </div>
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5" />
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5" />
    </div>
  );
}