import React from 'react'

const SceneViewRoomPage = () => {
  return (
    <section className="h-full w-full overflow-hidden flex flex-col bg-[#0d0e24]">
      {/* Content Area */}
      <div className="flex-1 w-full bg-gray-800/30 flex items-center justify-center overflow-hidden">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-400 text-sm">3D Scene View Placeholder</p>
          <p className="text-gray-500 text-xs mt-2">Ready for 3D content</p>
        </div>
      </div>
    </section>
  );
}

export default SceneViewRoomPage