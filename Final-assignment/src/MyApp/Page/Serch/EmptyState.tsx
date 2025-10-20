const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-20">
    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
      <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    <p className="text-xl font-semibold text-gray-600">No images found</p>
    <p className="text-gray-500 mt-2">Try searching for something else</p>
  </div>
)
export default EmptyState
