import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { VscEllipsis } from "react-icons/vsc";
import { AddSkillDropdown } from "@/components/dashboard/AddSkillDropdown";

export default async function Page() {
  // Fetching directly from PostgreSQL on your Ubuntu server
  const skills = await prisma.skill.findMany({
    orderBy: [
      { status: "asc" }, // Groups Working With, then Learning, then Future
      { priority: "desc" },
    ],
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tech Stack</h1>
          <p className="text-muted-foreground">
            Manage your global skills and roadmap.
          </p>
        </div>
        <AddSkillDropdown />
      </div>

      <div className="border rounded-2xl bg-card overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-bold">Name</TableHead>
              <TableHead className="font-bold">Category</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="font-bold text-center">Priority</TableHead>
              <TableHead className="font-bold text-center">
                Proficiency
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skills.length > 0 ? (
              skills.map((skill) => (
                <TableRow
                  key={skill.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <TableCell className="font-medium">{skill.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="rounded-lg capitalize">
                      {skill.category.toLowerCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`rounded-lg ${
                        skill.status === "WORKING_WITH"
                          ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                          : skill.status === "LEARNING"
                            ? "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
                            : "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20"
                      }`}
                      variant="secondary"
                    >
                      {skill.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center font-mono">
                    {skill.priority}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm font-bold">
                        {skill.proficiency}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="rounded-lg">
                      <VscEllipsis />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-muted-foreground italic"
                >
                  No skills found in your database.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
