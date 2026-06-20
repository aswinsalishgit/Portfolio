"use client";

import React from "react";

interface MainImageWrapperProps {
  children: React.ReactNode;
}

export default function MainImageWrapper({ children }: MainImageWrapperProps) {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent("open-project-lightbox", { detail: { index: 0 } }));
  };

  return (
    <div onClick={handleClick} className="cursor-pointer w-full">
      {children}
    </div>
  );
}
