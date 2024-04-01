export default function EditSkeleton() {
  return (
    <div className="flex w-full h-full animate-pulse">
      <div className="flex-1">
        <div className="bg-gray-200 rounded-2xl dark:bg-gray-700 w-full h-full"/>
      </div>
      <div className="flex-1">
        <div className="h-8 flex">
          <div className="bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"/>
          <div className="bg-gray-200 rounded-full dark:bg-gray-700 w-1/6 mb-4"/>
        </div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"/>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"/>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"/>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"/>
      </div>
    </div>
  )
}