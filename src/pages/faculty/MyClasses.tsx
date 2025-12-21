import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  Clock, 
  MapPin, 
  ChevronRight,
  TrendingUp,
  Award,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const myClasses = [
  {
    id: 1,
    subject: 'Data Structures & Algorithms',
    code: 'CS301',
    section: 'CSE-A',
    students: 62,
    attendance: 88,
    progress: 75,
    nextClass: 'Today, 2:00 PM',
    room: 'LH-201'
  },
  {
    id: 2,
    subject: 'Database Management Systems',
    code: 'CS302',
    section: 'CSE-B',
    students: 58,
    attendance: 92,
    progress: 60,
    nextClass: 'Tomorrow, 9:00 AM',
    room: 'Lab-3'
  },
  {
    id: 3,
    subject: 'Operating Systems',
    code: 'CS303',
    section: 'CSE-A',
    students: 60,
    attendance: 85,
    progress: 45,
    nextClass: 'Monday, 11:00 AM',
    room: 'LH-105'
  }
];

export default function MyClasses() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Classes & Courses 📚</h1>
          <p className="text-muted-foreground mt-1">Monitor course progress and student engagement</p>
        </div>
        <div className="flex gap-3">
           <Button variant="outline" className="rounded-xl">Course Syllabus</Button>
           <Button variant="gradient" className="rounded-xl shadow-lg shadow-primary/20">Bulk Attendance</Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card p-6 border-none shadow-xl bg-gradient-to-br from-primary/10 to-transparent">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-glow shadow-primary/20">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-black text-muted-foreground uppercase">Total Courses</p>
              <h3 className="text-2xl font-black">4 Courses</h3>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Including 2 lab sessions this week</p>
        </Card>

        <Card className="glass-card p-6 border-none shadow-xl bg-gradient-to-br from-accent/10 to-transparent">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center text-white shadow-glow shadow-accent/20">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-black text-muted-foreground uppercase">Total Students</p>
              <h3 className="text-2xl font-black">240 Active</h3>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Across all handled sections</p>
        </Card>

        <Card className="glass-card p-6 border-none shadow-xl bg-gradient-to-br from-emerald-500/10 to-transparent">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-glow shadow-emerald-500/20">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-black text-muted-foreground uppercase">Avg Attendance</p>
              <h3 className="text-2xl font-black">89.4%</h3>
            </div>
          </div>
          <p className="text-xs text-emerald-500 font-bold">+2.4% from last week</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {myClasses.map((cls, idx) => (
          <motion.div
            key={cls.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="glass-card border-none hover:shadow-2xl transition-all group overflow-hidden">
               <div className="flex flex-col lg:flex-row items-stretch">
                  <div className="lg:w-72 p-8 bg-muted/30 flex flex-col justify-center border-r border-white/5">
                     <Badge className="w-fit mb-3 bg-primary/20 text-primary border-none text-[10px] font-black uppercase tracking-widest">{cls.code}</Badge>
                     <h3 className="text-xl font-black leading-tight mb-2 group-hover:text-primary transition-colors">{cls.subject}</h3>
                     <p className="text-sm font-bold text-muted-foreground">{cls.section}</p>
                  </div>
                  
                  <div className="flex-1 p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-center">
                     <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-black text-muted-foreground uppercase tracking-wider">
                           <span>Syllabus Progress</span>
                           <span className="text-primary">{cls.progress}%</span>
                        </div>
                        <Progress value={cls.progress} className="h-2 rounded-full bg-primary/10" indicatorClassName="bg-primary shadow-glow shadow-primary/20" />
                     </div>

                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                           <Users className="w-5 h-5" />
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-muted-foreground uppercase">Strength</p>
                           <p className="text-sm font-bold">{cls.students} Enrolled</p>
                        </div>
                     </div>

                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                           <Clock className="w-5 h-5" />
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-muted-foreground uppercase">Next Class</p>
                           <p className="text-sm font-bold text-accent">{cls.nextClass}</p>
                        </div>
                     </div>

                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground group-hover:bg-emerald-500/10 group-hover:text-emerald-500 transition-colors">
                           <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-muted-foreground uppercase">Location</p>
                           <p className="text-sm font-bold uppercase tracking-wider">{cls.room}</p>
                        </div>
                     </div>
                  </div>

                  <div className="p-4 flex flex-row lg:flex-col justify-center gap-2 border-t lg:border-t-0 lg:border-l border-white/5">
                     <Button variant="ghost" size="icon" className="rounded-xl hover:bg-primary/10 hover:text-primary"><ChevronRight className="w-5 h-5" /></Button>
                  </div>
               </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Analytics Insight */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="rounded-3xl bg-secondary/5 border border-secondary/20 p-8 flex flex-col md:flex-row items-center gap-8"
      >
        <div className="w-20 h-20 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary">
           <Award className="w-10 h-10" />
        </div>
        <div className="flex-1 text-center md:text-left">
           <h3 className="text-xl font-black mb-2 uppercase tracking-tight">Academic Spotlight</h3>
           <p className="text-sm text-muted-foreground font-medium">Section CSE-B has shown a significant improvement in assignments submission rate this week. They are currently leading with a 94.5% completion rate.</p>
        </div>
        <div className="flex items-center gap-2 text-secondary font-black text-sm group cursor-pointer">
           View Full Analytics <TrendingUp className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </div>
      </motion.div>
    </div>
  );
}
