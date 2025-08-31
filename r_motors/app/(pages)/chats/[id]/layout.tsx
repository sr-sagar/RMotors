import { ScreenSizeContextProvider } from '@/components/context/ScreenSizeContext'
import { StateContextProvider } from '@/components/context/useStateContext'
import React from 'react'

export default function chatLayout({children}: {children: Readonly<React.ReactNode>}) {
  return (
    <html>
        <body>
            <main>
                <ScreenSizeContextProvider>
                    <StateContextProvider>
                        {children}
                    </StateContextProvider>
                </ScreenSizeContextProvider>
            </main>
        </body>
    </html>
  )
}
