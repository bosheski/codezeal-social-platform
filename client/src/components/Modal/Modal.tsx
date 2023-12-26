'use client'
import { useCallback, useRef, useEffect, MouseEventHandler } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import styles from './Modal.module.scss'

export default function Modal({ children }: { children: React.ReactNode }) {
 const overlay = useRef(null)
 const wrapper = useRef(null)
 const router = useRouter()
 const pathname = usePathname();
 const onDismiss = useCallback(() => {
  if (pathname === '/feed/posts/create') {
   router.push('/feed/posts');
  } else if (pathname === '/feed/articles/create') {
   router.push('/feed/articles');
  }
 }, [router])

 const onClick: MouseEventHandler = useCallback(
  (e) => {
   if (e.target === overlay.current || e.target === wrapper.current) {
    if (onDismiss) onDismiss()
   }
  },
  [onDismiss, overlay, wrapper]
 )

 const onKeyDown = useCallback(
  (e: KeyboardEvent) => {
   if (e.key === 'Escape') onDismiss()
  },
  [onDismiss]
 )
 useEffect(() => {
  document.addEventListener('keydown', onKeyDown)
  return () => document.removeEventListener('keydown', onKeyDown)
 }, [onKeyDown])

 return (
  <div
   ref={overlay}
   className={styles.overlay}
   onClick={onClick}
  >
   <div
    ref={wrapper}
    className={styles.wrapper}
   >
    {children}
   </div>
  </div>
 )
}