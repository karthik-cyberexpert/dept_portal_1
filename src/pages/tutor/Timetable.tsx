import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar as CalendarIcon, 
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
import { cn } from '@/lib/utils';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const timeSlots = [
  '09:00 - 10:00',
  '10:00 - 11:00',
  '11:15 - 12:15',
  '12:15 - 01:15',
  '02:00 - 03:00',
  '03:00 - 04:00'
];

const schedule = {
  'Monday': [
    { subject: 'Data Structures', code: 'CS301', room: 'LH-01', type: 'Lecture', color: 'bg-primary/10 text-primary' },
    { subject: 'DBMS Lab', code: 'CS304', room: 'Lab-02', type: 'Practical', color: 'bg-accent/10 text-accent' },
    { subject: 'Practical', code: 'CS304', room: 'Lab-02', type: 'Practical', color: 'bg-accent/10 text-accent' },
    { subject: 'Lunch Break', type: 'Break', color: 'bg-muted text-muted-foreground' },
    { subject: 'Mathematics', code: 'MA301', room: 'LH-01', type: 'Lecture', color: 'bg-secondary/10 text-secondary' },
    { subject: 'OS', code: 'CS302', room: 'LH-03', type: 'Lecture', color: 'bg-success/10 text-success' }
  ],
  'Tuesday': [
    { subject: 'DBMS', code: 'CS303', room: 'LH-02', type: 'Lecture', color: 'bg-warning/10 text-warning' },
    { subject: 'OS', code: 'CS302', room: 'LH-03', type: 'Lecture', color: 'bg-success/10 text-success' },
    { subject: 'Java Lab', code: 'CS305', room: 'Lab-01', type: 'Practical', color: 'bg-primary/10 text-primary' },
    { subject: 'Lunch Break', type: 'Break', color: 'bg-muted text-muted-foreground' },
    { subject: 'Data Structures', code: 'CS301', room: 'LH-01', type: 'Lecture', color: 'bg-primary/10 text-primary' },
    { subject: 'Library', type: 'Library', color: 'bg-purple-500/10 text-purple-600' }
  ]
};

export default function Timetable() {
  const [activeDay, setActiveDay] = React.useState('Monday');

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold">Class Timetable 📅</h1>
          <p className="text-muted-foreground">Weekly academic schedule for CSE-A (Batch 2021-25)</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl">
            <Filter className="w-4 h-4 mr-2" />
            Class Selector
          </Button>
          <Button variant="gradient" className="rounded-xl shadow-lg shadow-primary/20">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </motion.div>

      {/* Day Selector */}
      <div className="flex bg-muted/50 p-1.5 rounded-2xl overflow-x-auto gap-2 no-scrollbar">
        {days.map((day) => (
          <Button
            key={day}
            variant={activeDay === day ? 'default' : 'ghost'}
            onClick={() => setActiveDay(day)}
            className={cn(
              "rounded-xl px-6 transition-all duration-300",
              activeDay === day ? "shadow-lg shadow-primary/25" : "hover:bg-background/50"
            )}
          >
            {day}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Schedule Grid */}
        <div className="lg:col-span-2 space-y-4">
          {timeSlots.map((slot, index) => {
            const item = schedule[activeDay]?.[index] || { subject: 'No Class Scheduled', type: 'Free', color: 'bg-muted/30 text-muted-foreground' };
            const isBreak = item.type === 'Break';

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={cn(
                  "glass-card border-none overflow-hidden transition-all duration-300 group hover:translate-x-2",
                  isBreak ? "opacity-60 grayscale-[0.5]" : "shadow-md hover:shadow-xl"
                )}>
                  <div className="flex items-stretch min-h-[80px]">
                    <div className={cn(
                      "w-2 flex-shrink-0",
                      isBreak ? "bg-muted-foreground/30" : "bg-gradient-to-b from-primary to-accent"
                    )} />
                    
                    <div className="flex-1 p-4 grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                      {/* Time Slot */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center">
                          <Clock className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-bold">{slot}</p>
                          <p className="text-xs text-muted-foreground">Session {index + 1}</p>
                        </div>
                      </div>

                      {/* Subject */}
                      <div className="md:col-span-2">
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg font-bold truncate">{item.subject}</h4>
                          {item.code && <Badge variant="outline" className="text-[10px] uppercase">{item.code}</Badge>}
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          {item.room && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {item.room}
                            </span>
                          )}
                          {item.type !== 'Free' && (
                            <Badge variant="secondary" className={cn("text-[10px] px-2 py-0 border-none", item.color)}>
                              {item.type}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Faculty / Status */}
                      <div className="hidden md:flex justify-end">
                         {item.type !== 'Break' && item.type !== 'Free' ? (
                           <div className="flex items-center gap-2">
                             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-primary/10">
                               <User className="w-4 h-4 text-primary" />
                             </div>
                             <span className="text-xs font-medium">Faculty Assigned</span>
                           </div>
                         ) : (
                           <span className="text-xs text-muted-foreground italic">Rest Interval</span>
                         )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card className="glass-card p-6 border-none shadow-lg">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Syllabus Tracking
            </h3>
            <div className="space-y-4">
               {[
                 { sub: 'Data Structures', prog: 75, color: 'bg-primary' },
                 { sub: 'DBMS', prog: 60, color: 'bg-accent' },
                 { sub: 'Operating Systems', prog: 85, color: 'bg-success' },
                 { sub: 'Mathematics III', prog: 40, color: 'bg-warning' }
               ].map((item, i) => (
                 <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span>{item.sub}</span>
                      <span>{item.prog}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                       <motion.div
                         initial={{ width: 0 }}
                         animate={{ width: `${item.prog}%` }}
                         transition={{ duration: 1, delay: i * 0.1 }}
                         className={cn("h-full rounded-full shadow-glow-sm", item.color)}
                       />
                    </div>
                 </div>
               ))}
            </div>
            <Button variant="outline" className="w-full mt-6 rounded-xl">View Full Syllabus</Button>
          </Card>

          <Card className="glass-card p-6 border-none shadow-lg bg-gradient-to-br from-success/5 to-primary/5">
            <h3 className="text-lg font-bold mb-2">Upcoming Events</h3>
            <p className="text-sm text-muted-foreground mb-4">Quick view of class activities</p>
            <div className="space-y-3">
               <div className="p-3 rounded-xl bg-background/50 border border-border/50">
                  <p className="text-xs font-bold text-primary uppercase">Tomorrow</p>
                  <p className="text-sm font-semibold mt-1">IA-2 Marks Verification</p>
               </div>
               <div className="p-3 rounded-xl bg-background/50 border border-border/50">
                  <p className="text-xs font-bold text-accent uppercase">Oct 15, 2024</p>
                  <p className="text-sm font-semibold mt-1">ECA - Symposium</p>
               </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
