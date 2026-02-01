import Sidebar from "@/components/Sidebar";

export default function BVVsZZPLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
}
