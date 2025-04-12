// app/dashboard/page.tsx (or any page)
import MockDataButton from "@/components/MockDataButton";

export default function DashboardPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Mock Data Generator</h1>
      <MockDataButton />
    </div>
  );
}
