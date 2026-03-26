import { motion, AnimatePresence } from 'motion/react'
import { useEffect, useLayoutEffect } from 'react'

interface LightboxProps {
  isOpen: boolean
  images: string[]
  currentIndex: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
  title: string
}

export function Lightbox({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
  title,
}: LightboxProps) {
  // Handle escape key to close lightbox
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowRight') {
        onNext()
      } else if (e.key === 'ArrowLeft') {
        onPrev()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onNext, onPrev, onClose])

  // Prevent scrolling when lightbox is open
  useLayoutEffect(() => {
    if (!isOpen) return

    const { body, documentElement } = document
    const prevOverflow = body.style.overflow
    const prevPaddingRight = body.style.paddingRight

    const scrollbarWidth = window.innerWidth - documentElement.clientWidth
    body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`
    }

    return () => {
      body.style.overflow = prevOverflow
      body.style.paddingRight = prevPaddingRight
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 bg-black/95 flex items-center justify-center"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 z-50 text-white/70 hover:text-white p-2 transition-colors"
          >
            <i className="fa-solid fa-x"></i>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onPrev()
            }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 text-white/50 hover:text-white p-4 transition-colors"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          <button
            type="button"
            className="w-full h-full p-4 md:p-12 flex items-center justify-center bg-transparent border-0"
            onClick={onClose}
          >
            <motion.img
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              src={images[currentIndex]}
              alt={`${title} - ${currentIndex + 1} of ${images.length}`}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 text-white/50 hover:text-white p-4 transition-colors"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 font-mono text-sm tracking-widest">
            {currentIndex + 1} / {images.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
