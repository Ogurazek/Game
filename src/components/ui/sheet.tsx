'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

export const Sheet       = Dialog.Root
export const SheetTrigger = Dialog.Trigger

export function SheetContent({ children }: { children: React.ReactNode }) {
  return (
    <Dialog.Portal>
      {/* Overlay */}
      <Dialog.Overlay
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm
          data-[state=open]:animate-in data-[state=closed]:animate-out
          data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
      />

      {/* Panel */}
      <Dialog.Content
        className="fixed top-0 right-0 z-50 h-full w-80 bg-[#0c0e1a] border-l border-white/10
          shadow-2xl flex flex-col
          data-[state=open]:animate-in data-[state=closed]:animate-out
          data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right
          duration-300"
      >
        <Dialog.Title className="sr-only">Menú</Dialog.Title>

        {/* Cerrar */}
        <Dialog.Close
          className="absolute top-4 right-4 p-1.5 rounded-lg text-white/30
            hover:text-white hover:bg-white/10 transition-all cursor-pointer"
        >
          <X size={18} />
        </Dialog.Close>

        {children}
      </Dialog.Content>
    </Dialog.Portal>
  )
}
