import React from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Award, 
  ExternalLink, 
  Plus, 
  Sparkles,
  Music,
  Code,
  Palette,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function ECAAchievements() {
  const achievements = [
    { 
      id: 1, 
      title: "1st Place - National Hackathon 2024", 
      org: "IEEE Computer Society", 
      date: "Aug 2024", 
      category: "Technical", 
      points: 50,
      icon: Code
    },
    { 
      id: 2, 
      title: "Cultural Excellence Award", 
      org: "College Fine Arts Club", 
      date: "May 2024", 
      category: "Cultural", 
      points: 30,
      icon: Palette
    },
    { 
      id: 3, 
      title: "Inter-College Cricket Winner", 
      org: "University Sports Board", 
      date: "Mar 2024", 
      category: "Sports", 
      points: 40,
      icon: Target
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold">ECA & Achievements</h1>
          <p className="text-muted-foreground">Document your extracurricular activities and earn academic credits</p>
        </div>
        <Button variant="gradient" className="rounded-xl shadow-lg">
          <Plus className="w-4 h-4 mr-2" />
          Add New Achievement
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="md:col-span-1 glass-card rounded-2xl p-8 text-center flex flex-col items-center justify-center space-y-4 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20"
        >
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-primary border-4 border-white/20">
              <Trophy className="w-12 h-12" />
            </div>
            <motion.div 
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center shadow-lg"
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
          </div>
          <div>
            <p className="text-4xl font-black text-primary font-mono tracking-tighter">150</p>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Total ECA Points</p>
          </div>
          <p className="text-sm text-muted-foreground max-w-[200px]">
            You've earned 80% of required credits for the current academic year.
          </p>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary w-[80%] rounded-full" />
          </div>
        </motion.div>

        <div className="md:col-span-2 space-y-4">
          <h3 className="text-sm font-black text-muted-foreground uppercase tracking-widest px-2">Recent Recognition</h3>
          {achievements.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group p-5 glass-card rounded-2xl flex items-center justify-between hover:border-primary/20 transition-all cursor-default"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-muted/50 text-muted-foreground flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{item.category}</p>
                      <Badge variant="outline" className="text-[9px] font-bold border-0 bg-primary/5 text-primary">+{item.points} PTS</Badge>
                    </div>
                    <h4 className="font-bold text-lg group-hover:text-primary transition-colors leading-tight">{item.title}</h4>
                    <p className="text-xs text-muted-foreground font-medium">{item.org} • {item.date}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {[
          { label: "Technical", count: 8, icon: Code, color: "text-blue-500 bg-blue-500/10" },
          { label: "Cultural", count: 5, icon: Palette, color: "text-purple-500 bg-purple-500/10" },
          { label: "Sports", count: 3, icon: Target, color: "text-orange-500 bg-orange-500/10" },
          { label: "Leadership", count: 2, icon: Award, color: "text-green-500 bg-green-500/10" },
        ].map((cat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + idx * 0.1 }}
            className="p-4 glass-card rounded-2xl flex items-center gap-4 border-transparent hover:border-white/10 transition-all"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cat.color}`}>
              <cat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-black leading-none">{cat.count}</p>
              <p className="text-[10px] font-bold text-muted-foreground uppercase mt-1">{cat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
