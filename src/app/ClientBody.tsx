"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

interface ClientBodyProps {
  children: ReactNode;
}

export function ClientBody({ children }: ClientBodyProps) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
