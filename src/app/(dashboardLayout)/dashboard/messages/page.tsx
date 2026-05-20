import MessagesTable from "@/components/dashboard/MessagesTable";

export const metadata = {
  title: "Messages | Dashboard",
};

export default function MessagesPage() {
  return (
    <div className="space-y-8">
      <MessagesTable />
    </div>
  );
}
