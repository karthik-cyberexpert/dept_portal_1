import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Plus, 
  Search, 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical,
  ArrowRight,
  TrendingUp,
  FileEdit
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const assignments = [
  { 
    id: 1, 
    title: 'Linked List Implementation', 
    subject: 'Data Structures', 
    class: 'CSE-A', 
    dueDate: 'Oct 25, 2024',
    submitted: 45,
    total: 62,
    priority: 'high',
    status: 'active'
  },
  { 
    id: 2, 
    title: 'SQL Join Exercises', 
    subject: 'DBMS', 
    class: 'CSE-B', 
    dueDate: 'Oct 28, 2024',
    submitted: 30,
    total: 58,
    priority: 'medium',
    status: 'active'
  },
  { 
    id: 3, 
    title: 'Process Synchronization', 
    subject: 'Operating Systems', 
    class: 'CSE-A', 
    dueDate: 'Oct 20, 2024',
    submitted: 60,
    total: 62,
    priority: 'high',
    status: 'closed'
  },
];

export default function Assignments() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-black tracking-tight">Assignment Management 📝</h1>
          <p className="text-muted-foreground mt-1 font-medium">Create, track and evaluate student submissions</p>
        </div>
        <Button variant="gradient" className="rounded-xl shadow-lg shadow-primary/20">
           <Plus className="w-4 h-4 mr-2" />
           Create Assignment
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card p-6 border-none shadow-xl bg-gradient-to-br from-primary/5 to-transparent">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                 <FileText className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Active Tasks</p>
                 <h3 className="text-2xl font-black">08 Tasks</h3>
              </div>
           </div>
        </Card>
        <Card className="glass-card p-6 border-none shadow-xl bg-gradient-to-br from-orange-500/5 to-transparent">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                 <Clock className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Due Today</p>
                 <h3 className="text-2xl font-black text-orange-500">02 Approaching</h3>
              </div>
           </div>
        </Card>
        <Card className="glass-card p-6 border-none shadow-xl bg-gradient-to-br from-emerald-500/5 to-transparent">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                 <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Evaluation Rate</p>
                 <h3 className="text-2xl font-black text-emerald-500">92%</h3>
              </div>
           </div>
        </Card>
      </div>

      <div className="space-y-4">
         <div className="flex gap-4 items-center mb-6">
            <div className="relative flex-1">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
               <Input 
                  placeholder="Filter assignments..." 
                  className="pl-10 rounded-2xl bg-white/5 border-white/10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
            <Button variant="outline" className="rounded-2xl border-white/10">Active Only</Button>
         </div>

         <div className="grid grid-cols-1 gap-4">
            {assignments.filter(a => a.title.toLowerCase().includes(searchTerm.toLowerCase())).map((assignment, idx) => (
               <motion.div
                  key={assignment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
               >
                  <Card className="glass-card border-none p-6 group hover:shadow-2xl transition-all">
                     <div className="flex flex-col lg:flex-row items-center gap-8">
                        <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                           <FileEdit className="w-8 h-8" />
                        </div>
                        
                        <div className="flex-1 space-y-2 text-center lg:text-left">
                           <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-1">
                              <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest border-white/10">{assignment.subject}</Badge>
                              <Badge className={assignment.priority === 'high' ? 'bg-destructive/10 text-destructive border-none' : 'bg-orange-500/10 text-orange-500 border-none'}>
                                 {assignment.priority.toUpperCase()} PRIORITY
                              </Badge>
                           </div>
                           <h4 className="text-lg font-black group-hover:text-primary transition-colors">{assignment.title}</h4>
                           <div className="flex items-center justify-center lg:justify-start gap-6 text-xs font-bold text-muted-foreground">
                              <span className="flex items-center gap-1.5 uppercase tracking-tighter"><Users className="w-3.5 h-3.5" /> {assignment.class}</span>
                              <span className="flex items-center gap-1.5 uppercase tracking-tighter"><Clock className="w-3.5 h-3.5 text-orange-500" /> Due: {assignment.dueDate}</span>
                           </div>
                        </div>

                        <div className="w-full lg:w-48 space-y-2">
                           <div className="flex items-center justify-between text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                              <span>Submission Rate</span>
                              <span className="text-primary">{Math.round((assignment.submitted/assignment.total)*100)}%</span>
                           </div>
                           <Progress value={(assignment.submitted/assignment.total)*100} className="h-1.5 bg-primary/10" indicatorClassName="bg-primary" />
                           <p className="text-right text-[10px] font-bold text-muted-foreground">{assignment.submitted} / {assignment.total} Students</p>
                        </div>

                        <div className="flex gap-2">
                           <Button className="rounded-xl px-6 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all shadow-glow shadow-primary/10">Evaluate</Button>
                           <Button variant="ghost" size="icon" className="rounded-xl"><MoreVertical className="w-5 h-5" /></Button>
                        </div>
                     </div>
                  </Card>
               </motion.div>
            ))}
         </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="rounded-3xl bg-primary/10 border border-primary/20 p-8 flex flex-col md:flex-row items-center gap-8 shadow-glow shadow-primary/5"
      >
        <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover:rotate-12 transition-transform">
           <TrendingUp className="w-10 h-10" />
        </div>
        <div className="flex-1 text-center md:text-left">
           <h3 className="text-xl font-black mb-2 uppercase tracking-tight">Submission Trends</h3>
           <p className="text-sm text-muted-foreground font-medium">Overall assignment submission rate has improved by <span className="text-emerald-500 font-black">12.5%</span> this week. Peer-to-peer collaboration seems to be high in CSE-A.</p>
        </div>
        <Button variant="outline" className="rounded-xl h-12 px-8 border-primary/20 text-primary hover:bg-primary hover:text-white transition-all">Detailed Insights <ArrowRight className="ml-2 w-4 h-4" /></Button>
      </motion.div>
    </div>
  );
}
