
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import "./globals.css";
import Header from '@/components/Header';



export default function RootLayout({ children }) {
  return (
  
    <ClerkProvider afterSignOutUrl='/'>
    <html lang="en">
      <body>
      <Header/>
        {children}
      </body>
    </html>
  </ClerkProvider>
  
  );
}
