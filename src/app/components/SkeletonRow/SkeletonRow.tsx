
export default function SkeletonRow() {
  return (
    <div className="w-full grow grid grid-cols-3 h-[54px] px-6">
        <div className="flex gap-2 w-full items-center">
            <div className="w-[25px] aspect-square bg-gray-100 rounded-full flex items-center justify-center"/>
            <div className="w-[100px] h-4 bg-gray-100"/>
        </div>
        <div className="flex w-full items-center">
            <div className="w-[150px] h-4 bg-slate-100" />
        </div>
        <div className="flex items-center justify-between">
          <div className="w-[100px] h-4 bg-slate-100"/>
          <button className="w-[8.67px] h-[13.59px] bg-gray-100"></button>
        </div>
    </div>
  )
}