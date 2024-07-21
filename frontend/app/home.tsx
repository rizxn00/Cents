import Navigation from "@/components/Navigation";

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={`flex flex-col md:flex-row min-h-screen h-full overflow-hidden`}>
            <Navigation />
            <main className="flex-1 overflow-auto md:ml-16 p-5">
                {children}
            </main>
        </div>
    );
}
