import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  Search, 
  Plus, 
  Pin, 
  Calendar, 
  Filter, 
  ArrowRight,
  Clock,
  ChevronRight,
  Megaphone,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const circulars = [
  {
    id: 1,
    title: 'Semester End Examination Guidelines',
    content: 'Please find the updated guidelines for the upcoming semester end examinations. Faculty members are requested to submit question banks by Oct 20.',
    date: 'Oct 14, 2024',
    category: 'Exam',
    priority: 'high',
    pinned: true,
    author: 'Principal Office'
  },
  {
    id: 2,
    title: 'New Research Grant Opportunities',
    content: 'The department is pleased to announce new research grant opportunities for senior faculty members specializing in AI and IoT.',
    date: 'Oct 12, 2024',
    category: 'Research',
    priority: 'medium',
    pinned: false,
    author: 'R&D Cell'
  },
  {
    id: 3,
    title: 'Faculty Development Program - Cloud Ops',
    content: 'A 3-day FDP on Cloud Operations and DevOps will be held from Oct 28-30. Mandatory for CSE and IT faculty.',
    date: 'Oct 10, 2024',
    category: 'FDP',
    priority: 'medium',
    pinned: false,
    author: 'HOD - CSE'
  }
];

export default function Circulars() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-black tracking-tight italic">Circulars & Notices 📢</h1>
          <p className="text-muted-foreground mt-1 font-medium italic">Official announcements from the department and institution</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-white/10">Archive</Button>
          <Button variant="gradient" className="rounded-xl shadow-lg shadow-primary/20">Subscribe Alerts</Button>
        </div>
      </motion.div>

      {/* Featured Notification */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-primary/5 to-accent/20 p-10 border border-primary/10 shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
           <div className="w-24 h-24 rounded-3xl bg-primary flex items-center justify-center text-white shadow-glow shadow-primary/40 rotate-3">
              <Megaphone className="w-12 h-12" />
           </div>
           <div className="flex-1 text-center md:text-left">
              <Badge className="bg-primary/20 text-primary border-none text-[10px] font-black tracking-widest uppercase mb-3 px-3 py-1">System Alert</Badge>
              <h2 className="text-3xl font-black mb-2 uppercase tracking-tighter italic">LMS Maintenance Scheduled</h2>
              <p className="text-muted-foreground font-medium max-w-xl">The Learning Management System will be offline for scheduled maintenance on Sunday, Oct 20th from 02:00 AM to 06:00 AM. Faculty are requested to schedule their quizzes accordingly.</p>
           </div>
           <Button className="rounded-2xl h-14 px-10 font-bold group">View Details <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" /></Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         <div className="lg:col-span-1 space-y-6">
            <Card className="glass-card p-6 border-none shadow-xl">
               <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-6">Categories</h3>
               <div className="space-y-2">
                  {['All Notices', 'Academic', 'Examinations', 'Events', 'Research', 'Administrative'].map((cat, idx) => (
                    <Button key={idx} variant="ghost" className={`w-full justify-between font-bold rounded-xl ${idx === 0 ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}>
                       {cat}
                       {idx === 0 && <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] flex items-center justify-center">12</span>}
                    </Button>
                  ))}
               </div>
            </Card>

            <Card className="glass-card p-6 border-none shadow-xl bg-gradient-to-br from-secondary/5 to-transparent">
               <h3 className="text-xs font-black uppercase tracking-widest text-secondary mb-4">Quick Search</h3>
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                     placeholder="Search..." 
                     className="pl-10 rounded-xl bg-white/5 border-white/10"
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                  />
               </div>
            </Card>
         </div>

         <div className="lg:col-span-3 space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <AnimatePresence>
                 {circulars.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase())).map((item, idx) => (
                    <motion.div
                       key={item.id}
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ delay: idx * 0.1 }}
                    >
                       <Card className="glass-card border-none p-6 group hover:shadow-2xl transition-all relative overflow-hidden">
                          {item.pinned && (
                             <div className="absolute top-0 right-0 p-4">
                                <Pin className="w-4 h-4 text-primary animate-pulse" />
                             </div>
                          )}
                          <div className="flex gap-6 items-start">
                             <div className="hidden md:flex flex-col items-center justify-center w-20 h-20 rounded-3xl bg-muted/30 text-muted-foreground group-hover:bg-primary/5 transition-colors">
                                <Calendar className="w-6 h-6 mb-1" />
                                <span className="text-[9px] font-black uppercase leading-tight text-center">{item.date.split(',')[0]}</span>
                             </div>
                             <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                   <Badge variant="outline" className="text-[9px] font-black bg-primary/5 text-primary border-primary/20">{item.category}</Badge>
                                   <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-50 tracking-widest">By {item.author}</span>
                                </div>
                                <h4 className="text-xl font-black mb-2 group-hover:text-primary transition-colors tracking-tight">{item.title}</h4>
                                <p className="text-sm font-medium text-muted-foreground line-clamp-2 mb-4 leading-relaxed">{item.content}</p>
                                <div className="flex items-center justify-between">
                                   <div className="flex gap-4 items-center text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">
                                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 2 hours ago</span>
                                      <span className="flex items-center gap-1 font-bold text-primary underline decoration-primary/20 cursor-pointer">Read Full Notice</span>
                                   </div>
                                   <Button variant="ghost" size="sm" className="rounded-xl hover:bg-primary/10 hover:text-primary">
                                      Archive <ArrowRight className="w-4 h-4 ml-2" />
                                   </Button>
                                </div>
                             </div>
                          </div>
                       </Card>
                    </motion.div>
                 ))}
              </AnimatePresence>
            </div>

            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="p-8 rounded-[2rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-center opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer hover:border-primary/20"
            >
               <h4 className="font-black uppercase tracking-tight mb-2">Caught up!</h4>
               <p className="text-sm font-medium text-muted-foreground italic">You've read all the important circulars for today.</p>
            </motion.div>
         </div>
      </div>
    </div>
  );
}
