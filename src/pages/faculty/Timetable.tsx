import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Download,
  Filter,
  ChevronLeft,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
];

const facultyTimetable = [
  { day: 'Monday', slots: [
    { time: '09:00 AM', subject: 'Data Structures', class: 'CSE-A', room: 'LH-201', type: 'theory' },
    { time: '11:00 AM', subject: 'DBMS Lab', class: 'CSE-B', room: 'Lab-3', type: 'lab' },
    { time: '02:00 PM', subject: 'Operating Systems', class: 'CSE-C', room: 'LH-105', type: 'theory' }
  ]},
  { day: 'Tuesday', slots: [
    { time: '10:00 AM', subject: 'Data Structures', class: 'CSE-C', room: 'LH-105', type: 'theory' },
    { time: '12:00 PM', subject: 'Theory of Computation', class: 'CSE-A', room: 'LH-201', type: 'theory' },
    { time: '03:00 PM', subject: 'Project Review', class: 'Final Year', room: 'Project Lab', type: 'tutorial' }
  ]},
  { day: 'Wednesday', slots: [
    { time: '09:00 AM', subject: 'DBMS Lab', class: 'CSE-B', room: 'Lab-3', type: 'lab' },
    { time: '11:00 AM', subject: 'Operating Systems', class: 'CSE-A', room: 'LH-201', type: 'theory' },
    { time: '02:00 PM', subject: 'Data Structures', class: 'CSE-B', room: 'LH-202', type: 'theory' }
  ]},
  { day: 'Thursday', slots: [
    { time: '10:00 AM', subject: 'Theory of Computation', class: 'CSE-C', room: 'LH-105', type: 'theory' },
    { time: '01:00 PM', subject: 'Data Structures', class: 'CSE-A', room: 'LH-201', type: 'theory' },
    { time: '03:00 PM', subject: 'DBMS Lab', class: 'CSE-B', room: 'Lab-3', type: 'lab' }
  ]},
  { day: 'Friday', slots: [
    { time: '09:00 AM', subject: 'Operating Systems', class: 'CSE-C', room: 'LH-105', type: 'theory' },
    { time: '11:00 AM', subject: 'Theory of Computation', class: 'CSE-A', room: 'LH-201', type: 'theory' },
    { time: '02:00 PM', subject: 'Mentoring Session', class: 'CSE-A', room: 'Staff Room', type: 'tutorial' }
  ]}
];

const getSlotColor = (type: string) => {
  switch (type) {
    case 'theory': return 'bg-primary/10 text-primary border-primary/20';
    case 'lab': return 'bg-accent/10 text-accent border-accent/20';
    case 'tutorial': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
    default: return 'bg-muted text-muted-foreground border-border';
  }
};

export default function Timetable() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Academic Timetable 🗓️</h1>
          <p className="text-muted-foreground mt-1">Your weekly teaching schedule and lab sessions</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl"><Download className="w-4 h-4 mr-2" /> Download PDF</Button>
          <Button variant="gradient" className="rounded-xl shadow-lg shadow-primary/20">Sync Calendar</Button>
        </div>
      </motion.div>

      <Card className="glass-card border-none shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex flex-wrap items-center justify-between gap-4 bg-muted/20">
           <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-full"><ChevronLeft className="w-5 h-5" /></Button>
              <h2 className="text-lg font-black uppercase tracking-widest">March 2024</h2>
              <Button variant="ghost" size="icon" className="rounded-full"><ChevronRight className="w-5 h-5" /></Button>
           </div>
           <div className="flex gap-2">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-3 py-1">Theory</Badge>
              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20 px-3 py-1">Lab</Badge>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 px-3 py-1">Tutorial</Badge>
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted/30">
                <th className="p-4 border-b border-r border-white/5 text-xs font-black uppercase tracking-tighter text-muted-foreground w-32">Time / Day</th>
                {facultyTimetable.map(day => (
                  <th key={day.day} className="p-4 border-b border-white/5 text-sm font-black uppercase tracking-widest">{day.day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map(time => (
                <tr key={time} className="group hover:bg-white/5 transition-colors">
                  <td className="p-4 border-r border-b border-white/5 text-xs font-bold text-muted-foreground text-center bg-muted/10">{time}</td>
                  {facultyTimetable.map(day => {
                    const slot = day.slots.find(s => s.time === time);
                    return (
                      <td key={`${day.day}-${time}`} className="p-2 border-b border-white/5 min-w-[160px]">
                        {slot ? (
                          <motion.div
                            whileHover={{ scale: 1.02, y: -2 }}
                            className={`p-4 rounded-2xl border ${getSlotColor(slot.type)} shadow-lg transition-all cursor-pointer`}
                          >
                            <div className="flex items-center justify-between mb-2">
                               <Badge className="bg-background/50 backdrop-blur-sm text-[10px] font-black uppercase tracking-tighter border-none">{slot.type}</Badge>
                               <BookOpen className="w-3 h-3 opacity-50" />
                            </div>
                            <h4 className="text-sm font-black leading-tight mb-1">{slot.subject}</h4>
                            <div className="space-y-1">
                               <p className="text-[10px] font-bold opacity-80 flex items-center gap-1 uppercase">
                                  <User className="w-2.5 h-2.5" /> {slot.class}
                               </p>
                               <p className="text-[10px] font-bold opacity-80 flex items-center gap-1 uppercase tracking-widest">
                                  <MapPin className="w-2.5 h-2.5" /> {slot.room}
                                </p>
                            </div>
                          </motion.div>
                        ) : (
                          <div className="h-full min-h-[80px] rounded-2xl border border-dashed border-white/5 group-hover:border-white/10 transition-colors" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <Card className="glass-card p-8 border-none shadow-xl bg-gradient-to-br from-primary/5 to-transparent">
            <h3 className="text-xl font-black mb-6 uppercase tracking-tight flex items-center gap-3">
               <Calendar className="w-6 h-6 text-primary" />
               Upcoming Highlights
            </h3>
            <div className="space-y-4">
               {[
                 { event: 'Guest Lecture: AI Trends', date: 'Mar 22, 10:00 AM', status: 'Confirmed' },
                 { event: 'Board of Studies Meeting', date: 'Mar 25, 02:30 PM', status: 'Mandatory' },
                 { event: 'Internal Audit - Lab 3', date: 'Mar 28, 09:00 AM', status: 'Pending' }
               ].map((item, idx) => (
                 <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div>
                       <p className="text-sm font-bold">{item.event}</p>
                       <p className="text-xs text-muted-foreground font-medium">{item.date}</p>
                    </div>
                    <Badge variant="secondary" className="bg-primary/20 text-primary border-none text-[10px] uppercase font-black">{item.status}</Badge>
                 </div>
               ))}
            </div>
         </Card>

         <Card className="glass-card p-8 border-none shadow-xl bg-gradient-to-br from-accent/5 to-transparent">
            <h3 className="text-xl font-black mb-6 uppercase tracking-tight flex items-center gap-3">
               <Clock className="w-6 h-6 text-accent" />
               Teaching Load Summary
            </h3>
            <div className="space-y-6">
               <div className="flex justify-between items-end">
                  <div>
                     <p className="text-3xl font-black tracking-tighter">16 hrs</p>
                     <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Weekly Contact Hours</p>
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-500 border-none">Optimal Load</Badge>
               </div>
               <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 rounded-2xl bg-white/5">
                     <p className="text-lg font-black">9</p>
                     <p className="text-[10px] font-bold text-muted-foreground uppercase">Theory</p>
                  </div>
                  <div className="text-center p-3 rounded-2xl bg-white/5">
                     <p className="text-lg font-black">6</p>
                     <p className="text-[10px] font-bold text-muted-foreground uppercase">Lab</p>
                  </div>
                  <div className="text-center p-3 rounded-2xl bg-white/5">
                     <p className="text-lg font-black">1</p>
                     <p className="text-[10px] font-bold text-muted-foreground uppercase">Tutorial</p>
                  </div>
               </div>
            </div>
         </Card>
      </div>
    </div>
  );
}
