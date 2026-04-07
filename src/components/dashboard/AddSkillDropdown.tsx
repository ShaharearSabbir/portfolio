/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VscAdd, VscSave, VscLoading } from "react-icons/vsc";
import { toast } from "sonner";
import { createSkill } from "@/actions/skills.action";

type SkillCategory =
  | "FRONTEND"
  | "BACKEND"
  | "DATABASE"
  | "DEVOPS"
  | "TOOLS"
  | "LANGUAGE";

type SkillStatus = "WORKING_WITH" | "LEARNING" | "FUTURE_PLAN";

export function AddSkillDropdown() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<{
    name: string;
    category: SkillCategory;
    status: SkillStatus;
    proficiency: number;
    priority: number;
  }>({
    name: "",
    category: "FRONTEND",
    status: "WORKING_WITH",
    proficiency: 80,
    priority: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await createSkill(formData);
      if (result.success) {
        toast.success("Skill injected successfully");
        setOpen(false);
        setFormData({
          name: "",
          category: "FRONTEND".toLowerCase() as SkillCategory,
          status: "WORKING_WITH"
            .toLowerCase()
            .split("_")
            .join(" ") as SkillStatus,
          proficiency: 80,
          priority: 1,
        });
      }
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to save skill");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="flex px-4 py-2 text-background bg-primary hover:bg-primary/80 rounded-2xl items-center gap-2">
        <VscAdd size={18} /> Add Skill
      </PopoverTrigger>
      <PopoverContent
        className="w-80 p-5 rounded-2xl shadow-2xl border-primary/10"
        align="end"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-bold leading-none">New Technology</h4>
            <p className="text-xs text-muted-foreground italic">
              Add to your global tech stack.
            </p>
          </div>

          <div className="grid gap-3">
            <div className="space-y-1">
              <Label
                htmlFor="name"
                className="text-[11px] uppercase opacity-70"
              >
                Name
              </Label>
              <Input
                id="name"
                placeholder="e.g. Docker"
                className="h-9 rounded-lg"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label className="text-[11px] uppercase opacity-70">
                  Category
                </Label>
                <Select
                  onValueChange={(v) =>
                    setFormData({
                      ...formData,
                      category: v as SkillCategory,
                    })
                  }
                  defaultValue={formData.category}
                >
                  <SelectTrigger className="h-9 rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FRONTEND">Frontend</SelectItem>
                    <SelectItem value="BACKEND">Backend</SelectItem>
                    <SelectItem value="DATABASE">Database</SelectItem>
                    <SelectItem value="DEVOPS">DevOps</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-[11px] uppercase opacity-70">
                  Status
                </Label>
                <Select
                  onValueChange={(v) =>
                    setFormData({
                      ...formData,
                      status: v as SkillStatus,
                    })
                  }
                  defaultValue={formData.status}
                >
                  <SelectTrigger className="h-9 rounded-lg text-[11px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WORKING_WITH">Working</SelectItem>
                    <SelectItem value="LEARNING">Learning</SelectItem>
                    <SelectItem value="FUTURE_PLAN">Roadmap</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label className="text-[11px] uppercase opacity-70">
                  Proficiency (%)
                </Label>
                <Input
                  type="number"
                  className="h-9 rounded-lg"
                  value={formData.proficiency}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      proficiency: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="space-y-1">
                <Label className="text-[11px] uppercase opacity-70">
                  Priority
                </Label>
                <Input
                  type="number"
                  className="h-9 rounded-lg"
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      priority: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-10 rounded-xl gap-2 font-bold"
          >
            {isLoading ? <VscLoading className="animate-spin" /> : <VscSave />}
            Save to Database
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
