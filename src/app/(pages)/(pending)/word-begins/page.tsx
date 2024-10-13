'use client'

import dynamic from 'next/dynamic';


const DynamicTopbar = dynamic(() => import("@/components/Dashboard/Topbar"), {
  ssr: false
});



export default function SearchPage() {
  return (
    <div className="flex h-screen bg-background text-foreground">
      <div className="flex-1 flex flex-col overflow-hidden">
        <DynamicTopbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-4 md:p-6">
          COMMING SOON
        </main>
      </div>
    </div>
  );
}