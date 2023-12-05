import { Heebo, Fira_Mono } from 'next/font/google';


export const heebo = Heebo({
 weight: ['500', '600', '700'],
 subsets: ['latin'],
 variable: '--font-heebo',
 display: 'swap'
})

export const firaMono = Fira_Mono({
 weight: ['400', '500', '700'],
 subsets: ['latin'],
 variable: '--font-fira-mono',
 display: 'swap'
})
