import "./globals.css";

import SessionWrapper from "./componet/SessionWrapper";
export const metadata = {
  title: 'Ai Based ',
  description: 'Ai Based ',
}

export default function RootLayout({ children}) {
  return (
    <html lang="en">
      <SessionWrapper >
      <body>
      
        {children}
       
        </body>
        </SessionWrapper>
    </html>
  )
}

