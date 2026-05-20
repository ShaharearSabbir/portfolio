"use client";

import { useEffect, useState } from "react";
import { getSettings, updateSettings } from "@/actions/settings.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { VscSave } from "react-icons/vsc";

export default function SettingsTable() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSettings().then(setSettings);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    const res = await updateSettings(data);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl space-y-12">
      <div>
        <h2 className="text-3xl font-black tracking-tighter uppercase italic">System Configuration</h2>
        <p className="text-muted-foreground text-xs font-bold tracking-widest uppercase">Global Parameters & Environment Overrides</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="grid gap-8 p-8 bg-card border border-border rounded-[2.5rem] shadow-xl">
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Identity</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input name="site_name" defaultValue={settings.site_name} className="rounded-xl" placeholder="Shaharear Rahman Sabbir" />
              </div>
              <div className="space-y-2">
                <Label>Professional Title</Label>
                <Input name="site_title" defaultValue={settings.site_title} className="rounded-xl" placeholder="Full Stack Developer" />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-border/50">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary">External Nodes (Socials)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>GitHub URL</Label>
                <Input name="github_url" defaultValue={settings.github_url} className="rounded-xl" placeholder="https://github.com/..." />
              </div>
              <div className="space-y-2">
                <Label>LinkedIn URL</Label>
                <Input name="linkedin_url" defaultValue={settings.linkedin_url} className="rounded-xl" placeholder="https://linkedin.com/in/..." />
              </div>
              <div className="space-y-2">
                <Label>Twitter URL</Label>
                <Input name="twitter_url" defaultValue={settings.twitter_url} className="rounded-xl" placeholder="https://twitter.com/..." />
              </div>
              <div className="space-y-2">
                <Label>Resume Link</Label>
                <Input name="resume_url" defaultValue={settings.resume_url} className="rounded-xl" placeholder="Google Drive Link" />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-border/50">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Global Meta</h3>
            <div className="space-y-2">
              <Label>Footer Text</Label>
              <Input name="footer_text" defaultValue={settings.footer_text} className="rounded-xl" placeholder="Built with Next.js & TypeScript" />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={loading} className="rounded-full px-12 h-14 shadow-lg shadow-primary/20 gap-3">
            <VscSave size={20} />
            {loading ? "Writing to disk..." : "Commit Configuration"}
          </Button>
        </div>
      </form>
    </div>
  );
}
