import Navigation from "@/components/Navigation";
import { ReactNode } from "react";

interface MainLayoutProps {
    children: React.ReactNode;
  }

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="flex h-screen overflow-hidden">
            <Navigation />
            <main className="flex-1 overflow-auto md:ml-16 p-2 md:p-5">
                {children}
            </main>
        </div>
    );
};

export default MainLayout;
