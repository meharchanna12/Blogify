import { Circle } from "./BlogCard";

export default function BlogSkeleton() {
  return (
    <div role="status" className="w-full max-w-xl animate-pulse p-4 rounded-xl shadow-sm">
      <div className="flex items-center space-x-3 mb-4">
        {/* Avatar Circle */}
        <Circle />

        {/* Author Info */}
        <div className="flex-1">
          <div className="h-3 bg-gray-200 rounded-full w-24 mb-2"></div>
          <div className="h-2 bg-gray-200 rounded-full w-16"></div>
        </div>
      </div>

      {/* Blog Title */}
      <div className="h-4 bg-gray-200 rounded-full w-3/4 mb-3"></div>

      {/* Blog Content  */}
      <div className="space-y-2">
        <div className="h-2 bg-gray-200 rounded-full w-full"></div>
        <div className="h-2 bg-gray-200 rounded-full w-5/6"></div>
        <div className="h-2 bg-gray-200 rounded-full w-2/3"></div>
      </div>

      {/* Footer */}
      <div className="flex justify-between mt-4">
        <div className="h-2 bg-gray-200 rounded-full w-20"></div>
        <div className="h-2 bg-gray-200 rounded-full w-12"></div>
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
}
