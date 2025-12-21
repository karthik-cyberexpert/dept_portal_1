import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Users,
  Search,
  Filter,
  ArrowUpRight,
  TrendingUp,
  BarChart2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

const assignmentData = [
  {
    id: 1,
    title: 'Process Scheduling Algorithms',
    subject: 'Operating Systems',
    dueDate: '2024-10-20',
    submissions: 52,
    totalStudents: 60,
    evaluated: 45,
    status: 'Active',
    faculty: 'Mr. Vigneshwar'
  },
  {
    id: 2,
    title: 'Normalization in DBMS',
    subject: 'DBMS',
    dueDate: '2024-10-15',
    submissions: 60,
    totalStudents: 60,
    evaluated: 60,
    status: 'Completed',
    faculty: 'Ms. Priya Dharshini'
  },
  {
    id: 3,
    title: 'Binary Tree Traversals',
    subject: 'Data Structures',
    dueDate: '2024-10-25',
    submissions: 28,
    totalStudents: 60,
    evaluated: 0,
    status: 'Upcoming',
    faculty: 'Dr. Ramesh Kumar'
  }
];

const analyticsData = [
  { name: 'OS', rate: 86 },
  { name: 'DBMS', rate: 100 },
  { name: 'DS', rate: 46 },
  { name: 'Maths', rate: 92 },
  { name: 'Java', rate: 78 },
];

export default function AssignmentStatus() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold">Assignment Tracking 📝</h1>
          <p className="text-muted-foreground">Detailed overview of class assignments and evaluation progress</p>
        </div>
        <div className="flex gap-3">
           <Button variant="outline" className="rounded-xl">
             <BarChart2 className="w-4 h-4 mr-2" />
             Evaluation Report
           </Button>
           <Button variant="gradient" className="rounded-xl shadow-lg shadow-primary/20">
             Notify Pending
           </Button>
        </div>
      </motion.div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass-card p-6 border-none shadow-xl lg:col-span-2">
           <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Submission Rates by Subject</h3>
              <div className="flex items-center gap-2 text-success text-sm font-bold">
                <TrendingUp className="w-4 h-4" />
                +12.5% this week
              </div>
           </div>
           <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    cursor={{ fill: 'hsl(var(--primary)/0.05)' }}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="rate" radius={[4, 4, 0, 0]}>
                    {analyticsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.rate > 90 ? 'hsl(var(--success))' : 'hsl(var(--primary))'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
           </div>
        </Card>

        <div className="space-y-4">
           {[
             { label: 'Total Pending', value: '12', icon: Clock, color: 'text-warning' },
             { label: 'Classes Overdue', value: '2', icon: AlertCircle, color: 'text-destructive' },
             { label: 'Avg. Grade', value: 'B+', icon: CheckCircle, color: 'text-success' }
           ].map((stat, i) => (
             <Card key={i} className="glass-card p-4 border-none shadow-md flex items-center gap-4">
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center bg-background/50 shadow-inner", stat.color)}>
                   <stat.icon className="w-5 h-5" />
                </div>
                <div>
                   <p className="text-xs text-muted-foreground font-bold uppercase">{stat.label}</p>
                   <p className="text-lg font-bold">{stat.value}</p>
                </div>
             </Card>
           ))}
        </div>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
           <h3 className="text-xl font-bold">Ongoing Assignments</h3>
           <div className="flex gap-2">
              <Input placeholder="Filter by subject..." className="w-[200px] h-9 rounded-lg glass-card" />
           </div>
        </div>

        {assignmentData.map((task, index) => {
          const submissionRate = (task.submissions / task.totalStudents) * 100;
          const evaluationRate = (task.evaluated / task.submissions) * 100 || 0;

          return (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-card border-none p-5 shadow-lg group hover:shadow-2xl transition-all duration-300">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                  <div className="md:col-span-1">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold truncate max-w-[150px]">{task.title}</h4>
                        <p className="text-xs text-muted-foreground">{task.subject}</p>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2 grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <div className="flex justify-between text-xs font-medium">
                         <span className="text-muted-foreground">Submissions</span>
                         <span>{task.submissions}/{task.totalStudents}</span>
                       </div>
                       <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${submissionRate}%` }}
                            className="h-full bg-primary rounded-full shadow-glow-sm shadow-primary/20"
                          />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <div className="flex justify-between text-xs font-medium">
                         <span className="text-muted-foreground">Evaluated</span>
                         <span>{task.evaluated}/{task.submissions}</span>
                       </div>
                       <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${evaluationRate}%` }}
                            className="h-full bg-success rounded-full shadow-glow-sm shadow-success/20"
                          />
                       </div>
                    </div>
                  </div>

                  <div className="md:col-span-1 flex items-center justify-between md:justify-end gap-4">
                    <div className="text-right">
                       <p className="text-[10px] text-muted-foreground uppercase font-bold">Due Date</p>
                       <p className="text-xs font-bold">{task.dueDate}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                       <ArrowUpRight className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
