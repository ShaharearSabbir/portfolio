import Overview from "@/components/dashboard/Overview";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-5xl font-black tracking-tighter uppercase italic">Control <span className="text-primary">Center</span></h1>
        <p className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold mt-2">Systems Audit & Fleet Management</p>
      </div>
      <Overview />
    </div>
  );
}