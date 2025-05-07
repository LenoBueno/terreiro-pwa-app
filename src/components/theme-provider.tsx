
'use client'

import * as React from 'react'

// Simple theme provider for the project
export function ThemeProvider({ children, ...props }: { children: React.ReactNode }) {
  return <div className="theme-provider" {...props}>{children}</div>
}
