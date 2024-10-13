'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { sidebarOptions } from '@/app/data/sidebarOptions';
import { useAuth } from '@clerk/nextjs';

// Sidebar component definition
const Sidebar = () => {
  // Get the current pathname using Next.js hook
  const pathname = usePathname();
  // Check if the user is signed in using Clerk authentication
  const { isSignedIn } = useAuth();

  // If the user is not signed in, don't render the sidebar
  if (!isSignedIn) {
    return null;
  }

  return (
    // The root cause of the sidebar not showing on mobile is this line
    // The 'hidden md:block' classes hide the sidebar on small screens
    <aside className="w-64">
      <div className={`bg-card shadow-sm h-screen`}>
        <div className="p-4">
          {/* Logo and title */}
          <div className="flex flex-col items-center justify-center mb-8">
            <Image src="/logo.svg" alt="Logo" width={150} height={150} className="mb-2" />
            <h1 className="text-xl font-semibold text-center">القرءان الكريم</h1>
          </div>
          {/* Navigation menu */}
          <nav>
            {sidebarOptions.map((option, index) => {
              // Check if the current page matches the option's URL
              const isActive = pathname === option.url;
              return (
                <Link
                  href={option.url}
                  key={index}
                  className={`flex items-center p-2 rounded-lg mb-1 transition-colors ${
                    isActive
                      ? 'bg-accent text-black font-medium'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  {/* Icon for the menu item */}
                  <option.icon className={`h-5 w-5 mr-3 ${isActive ? 'text-black' : ''}`} />
                  {/* Name of the menu item */}
                  <span>{option.name}</span>
                  {/* Active indicator */}
                  {isActive && (
                    <div className="ml-auto w-1 h-5 bg-black rounded-full"></div>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
