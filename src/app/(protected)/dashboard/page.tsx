import { QuickDraft } from "@/components/dashboard/QuickDraft";

function DashboardPage() {
  return (
    <div className="flex flex-col flex-1 w-full py-6">
      <h1 className="text-3xl mb-8 font-[550] md:font-bold font-display text-foreground">
        Dashboard
      </h1>
      <div className="grid gap-4 xl:grid-cols-2">
        <QuickDraft />
      </div>
    </div>
  );
}

export default DashboardPage;
