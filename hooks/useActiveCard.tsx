'use client';
import { useEffect } from "react";

export default function useActiveCard(containerRef: React.RefObject<HTMLUListElement |null>) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const cards = Array.from(container.children)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("size-70", entry.isIntersecting)
          entry.target.classList.toggle("size-64", !entry.isIntersecting)
          entry.target.classList.toggle("saturate-[0.37]", !entry.isIntersecting)
        })
      },
      {
        threshold: 0.60
      }
    )

    cards.forEach(card => observer.observe(card))

    return () => observer.disconnect()
  }, [containerRef])
}