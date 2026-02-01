import Sidebar from "@/components/Sidebar";

export default function ProjectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <main className="relative min-h-screen">
        {children}
      </main>
    </>
  );
}
