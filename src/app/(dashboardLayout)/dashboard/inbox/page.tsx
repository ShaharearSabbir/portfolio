import InboxTable from "@/components/dashboard/InboxTable";

export default function InboxPage() {
  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="p-4 shrink-0">
        <h1 className="text-4xl font-black tracking-tighter uppercase italic">Communications <span className="text-primary">Hub</span></h1>
        <p className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold mt-1">Live Chat Sessions</p>
      </div>
      <InboxTable />
    </div>
  );
}
