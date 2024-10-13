'use client'

// Import necessary components and icons
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import Sidebar from "./Sidebar";

// Topbar component definition
const Topbar = () => {
  return (
    // Main header container
    <header className="bg-card dark:bg-black shadow-sm">
      <div className="flex items-center justify-between p-4">
        {/* Mobile menu button (only visible on small screens) */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden mr-2">
              <Menu className="h-6 w-6 dark:text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <Sidebar />
          </SheetContent>
        </Sheet>

        {/* Page title container */}
        <div className="flex-1 flex justify-center">
          <h2 className="text-xl font-semibold dark:text-white">القرءان الكريم</h2>
        </div>

        {/* User profile button (Clerk authentication) */}
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatar: "h-10 w-10",
            },
          }}
        />
      </div>
    </header>
  );
};

export default Topbar;
