import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Megaphone, 
  Calendar, 
  FileText, 
  ArrowRight, 
  Plus,
  Search,
  Filter,
  Pin,
  Clock,
  MoreVertical,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const circulars = [
  {
    id: 1,
    title: 'IA-2 Examination Schedule - Revised',
    content: 'The Internal Assessment 2 schedule has been revised for all secondary year students. Please check the attachment for detailed timing and room allocation.',
    date: 'Oct 12, 2024',
    category: 'Exam',
    priority: 'high',
    pinned: true,
    author: 'HOD - CSE'
  },
  {
    id: 2,
    title: 'Department Tech Symposium - Rendezvous 2024',
    content: 'Registration is now open for the annual department tech symposium. Interesting workshops and paper presentations scheduled.',
    date: 'Oct 10, 2024',
    category: 'Event',
    priority: 'medium',
    pinned: false,
    author: 'Event Coordinator'
  },
  {
    id: 3,
    title: 'Scholarship Applications for Final Year',
    content: 'Eligible final year students can now apply for the Merit-cum-Means scholarship. Last date for submission is Oct 25.',
    date: 'Oct 08, 2024',
    category: 'Academic',
    priority: 'medium',
    pinned: false,
    author: 'Admin Office'
  }
];

export default function Circulars() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold">Circulars & Notices 📢</h1>
          <p className="text-muted-foreground">Stay updated with the latest department announcements</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl">
             <Filter className="w-4 h-4 mr-2" />
             Category
          </Button>
          <Button variant="gradient" className="rounded-xl shadow-lg shadow-primary/20">
             <Plus className="w-4 h-4 mr-2" />
             Create Notice
          </Button>
        </div>
      </motion.div>

      {/* Featured Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 p-8 border border-primary/10"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
          <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center shadow-glow shadow-primary/30">
             <Megaphone className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1 text-center md:text-left">
             <Badge variant="secondary" className="mb-2 bg-primary/20 text-primary border-none">IMPORTANT ANNOUNCEMENT</Badge>
             <h2 className="text-2xl font-black mb-2 uppercase tracking-tight">University Lab Audit 2024</h2>
             <p className="text-muted-foreground max-w-2xl">All lab records must be verified by respective tutors before Oct 15th. Mock audit scheduled for Monday morning.</p>
          </div>
          <Button variant="default" className="rounded-xl h-12 px-8">Read More <ChevronRight className="ml-2 w-4 h-4" /></Button>
        </div>
      </motion.div>

      {/* Pinned Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold flex items-center gap-2 px-2">
          <Pin className="w-4 h-4 text-primary" />
          Pinned Notices
        </h3>
        <div className="grid grid-cols-1 gap-4">
           {circulars.filter(c => c.pinned).map(notice => (
             <NoticeCard key={notice.id} notice={notice} />
           ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold flex items-center gap-2 px-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          Recent Circulars
        </h3>
        <div className="grid grid-cols-1 gap-4">
           {circulars.filter(c => !c.pinned).map(notice => (
             <NoticeCard key={notice.id} notice={notice} />
           ))}
        </div>
      </div>
    </div>
  );
}

function NoticeCard({ notice }: { notice: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.01 }}
      className="group"
    >
      <Card className="glass-card border-none p-5 shadow-lg group-hover:shadow-2xl transition-all overflow-hidden relative">
        {notice.priority === 'high' && (
          <div className="absolute top-0 left-0 w-1.5 h-full bg-destructive" />
        )}
        <div className="flex gap-6 items-start">
          <div className="hidden md:flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-muted/50 text-muted-foreground">
             <Calendar className="w-6 h-6 mb-1" />
             <span className="text-[10px] font-black uppercase text-center leading-tight">{notice.date.split(',')[0]}</span>
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
               <Badge variant="outline" className="text-[10px] uppercase font-bold px-2 py-0">{notice.category}</Badge>
               {notice.pinned && <Pin className="w-3 h-3 text-primary" />}
            </div>
            <h4 className="text-lg font-bold group-hover:text-primary transition-colors">{notice.title}</h4>
            <p className="text-sm text-muted-foreground line-clamp-2">{notice.content}</p>
            <div className="flex items-center justify-between pt-2">
               <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                     <FileText className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-xs font-bold text-muted-foreground">By {notice.author}</span>
               </div>
               <Button variant="ghost" size="sm" className="group-hover:bg-primary/10 group-hover:text-primary rounded-xl">
                  Details <ArrowRight className="w-3 h-3 ml-1.5" />
               </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
