import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileUser, 
  Sparkles, 
  Download, 
  Eye, 
  Layout, 
  CheckCircle2,
  Rocket,
  Plus,
  Edit2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function ResumeBuilder() {
  const sections = [
    { name: "Personal Info", completion: 100 },
    { name: "Education", completion: 100 },
    { name: "Skills & Keywords", completion: 80 },
    { name: "Projects", completion: 60 },
    { name: "Achievements", completion: 90 },
    { name: "Certifications", completion: 40 },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold">AI Resume Builder</h1>
          <p className="text-muted-foreground">Craft a high-impact, ATS-friendly resume tailored for placements</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button variant="gradient" className="rounded-xl shadow-lg">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor Sections */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card rounded-2xl p-6 bg-primary/[0.02] border-primary/10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Layout className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Resume Progress</h2>
                <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                  <span className="font-bold text-primary">78% Complete</span>
                  <span>•</span>
                  <span>Good for initial screening</span>
                </div>
              </div>
            </div>
            <Progress value={78} className="h-2 mb-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sections.map((section, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-4 rounded-xl bg-background/50 border border-white/5 flex items-center justify-between group hover:border-primary/20 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${section.completion === 100 ? 'bg-success' : 'bg-primary animate-pulse'}`} />
                    <span className="text-sm font-bold tracking-tight">{section.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-muted-foreground">{section.completion}%</span>
                    <Edit2 className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </motion.div>
              ))}
              <Button variant="outline" className="rounded-xl h-auto py-4 border-dashed border-primary/20 text-primary hover:bg-primary/5">
                <Plus className="w-4 h-4 mr-2" />
                Add Custom Section
              </Button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="p-8 rounded-2xl bg-gradient-to-r from-accent to-primary text-white space-y-4 shadow-xl overflow-hidden relative"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5" />
                <h3 className="text-lg font-bold uppercase tracking-widest text-white/90">AI Optimization</h3>
              </div>
              <p className="text-2xl font-black mb-4 leading-tight">Your projects section needs more quantitative results.</p>
              <p className="text-white/70 text-sm mb-6 max-w-lg">
                Pro Tip: Instead of "Built a web app", try "Engineered a scalable React application reducing load times by 40%".
              </p>
              <Button variant="glass" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                <Rocket className="w-4 h-4 mr-2" />
                Auto-Optimize with AI
              </Button>
            </div>
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
          </motion.div>
        </div>

        {/* Templates & Tips */}
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-6">Choose Template</h3>
            <div className="space-y-4">
              {[
                { name: "Modern Professional", active: true },
                { name: "Minimalist Tech", active: false },
                { name: "Classic Academic", active: false },
              ].map((tpl, idx) => (
                <div 
                  key={idx}
                  className={`group relative aspect-[3/4] rounded-xl border-2 overflow-hidden transition-all cursor-pointer ${
                    tpl.active ? 'border-primary shadow-lg scale-105' : 'border-white/5 opacity-60 hover:opacity-100 hover:border-white/20'
                  }`}
                >
                  <div className="absolute inset-0 bg-muted/20" />
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent text-white">
                    <p className="text-xs font-bold truncate">{tpl.name}</p>
                  </div>
                  {tpl.active && (
                    <div className="absolute top-2 right-2 bg-primary text-white p-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 bg-accent/5">
            <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-4">Placements Tip</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Companies look for specific keywords in your resume. Ensure your skills match the job description for a higher ATS score.
            </p>
            <Button variant="link" className="p-0 text-accent font-bold h-auto mt-4 text-xs">Read Placement Guide</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
