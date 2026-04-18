'use client'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return (
    <TooltipPrimitive.Provider delayDuration={200}>
      {children}
    </TooltipPrimitive.Provider>
  )
}

export function Tooltip({ children }: { children: React.ReactNode }) {
  return <TooltipPrimitive.Root>{children}</TooltipPrimitive.Root>
}

export function TooltipTrigger({
  children,
  asChild,
}: {
  children: React.ReactNode
  asChild?: boolean
}) {
  return (
    <TooltipPrimitive.Trigger asChild={asChild}>
      {children}
    </TooltipPrimitive.Trigger>
  )
}

export function TooltipContent({ children }: { children: React.ReactNode }) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        sideOffset={8}
        className="z-50 max-w-[200px] rounded-xl bg-[#1a1a2e] border border-white/10
          px-3 py-2 text-xs text-white/80 shadow-xl leading-relaxed text-center
          animate-in fade-in-0 zoom-in-95"
      >
        {children}
        <TooltipPrimitive.Arrow className="fill-[#1a1a2e]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}
