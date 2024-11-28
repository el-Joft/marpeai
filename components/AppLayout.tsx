// layout.tsx
import '../globals.css'
interface LayoutProps {
  children: React.ReactNode;
}


function AppLayout({ children }: LayoutProps) {
  return (
    <div className='lato-regular'>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,100..900;1,100..900&display=swap');
      `}</style>
      <main>{children}</main>
    </div>
  );
}

export default AppLayout;
