"use client";

import { createContext, useContext, useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Story", href: "/story" },
  { name: "Updates", href: "/updates" },
  { name: "Projects", href: "/projects" },
  { name: "Articles", href: "/articles" },
  { name: "Contact", href: "/contact" },
  { name: "Recruit", href: "/recruit" },
  { name: "Endorse", href: "/endorse" },
  { name: "Connect", href: "/connect" },
];

const PageTransitionContext = createContext<{
  previousIndex: number;
  currentIndex: number;
}>({ previousIndex: -1, currentIndex: -1 });

export const usePageTransition = () => useContext(PageTransitionContext);

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [state, setState] = useState({
    lastPathname: pathname,
    previousIndex: -1,
    currentIndex: navLinks.findIndex(link => link.href === pathname)
  });

  if (pathname !== state.lastPathname) {
    const newIndex = navLinks.findIndex(link => link.href === pathname);
    setState({
      lastPathname: pathname,
      previousIndex: state.currentIndex,
      currentIndex: newIndex
    });
  }

  return (
    <PageTransitionContext.Provider value={{ 
      previousIndex: state.previousIndex, 
      currentIndex: state.currentIndex 
    }}>
      {children}
    </PageTransitionContext.Provider>
  );
}
