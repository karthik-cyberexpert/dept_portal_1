import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  GraduationCap,
  Calendar,
  Filter,
  Download,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
} from 'recharts';

const attendanceData = [
  { day: 'Mon', attendance: 58 },
  { day: 'Tue', attendance: 55 },
  { day: 'Wed', attendance: 60 },
  { day: 'Thu', attendance: 57 },
  { day: 'Fri', attendance: 54 },
];

const gradeDistribution = [
  { name: 'O (90-100)', value: 12, color: '#f59e0b' },
  { name: 'A+ (80-89)', value: 18, color: '#10b981' },
  { name: 'A (70-79)', value: 15, color: '#3b82f6' },
  { name: 'B+ (60-69)', value: 10, color: '#8b5cf6' },
  { name: 'B (50-59)', value: 3, color: '#ec4899' },
  { name: 'U (<50)', value: 2, color: '#ef4444' },
];

const subjectPerformance = [
  { subject: 'Data Structures', avg: 82, pass: 95 },
  { subject: 'DBMS', avg: 78, pass: 92 },
  { subject: 'OS', avg: 75, pass: 88 },
  { subject: 'Maths', avg: 68, pass: 82 },
  { subject: 'Java', avg: 85, pass: 100 },
];

export default function ClassAnalytics() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold">Class Analytics 📊</h1>
          <p className="text-muted-foreground">Comprehensive performance insights for CSE-A</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
          <Button variant="gradient">
            <BarChart3 className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Attendance Heatmap */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-6 rounded-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Weekly Attendance</h3>
            <span className="text-sm text-muted-foreground font-medium">Week 12 • Avg: 93%</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" domain={[0, 60]} />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--muted)/0.5)' }}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="attendance" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} barSize={40}>
                  {attendanceData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.attendance < 55 ? 'hsl(var(--destructive))' : 'hsl(var(--primary))'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Grade Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-6 rounded-2xl"
        >
          <h3 className="text-lg font-bold mb-6">IA-1 Grade Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gradeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {gradeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
            {gradeDistribution.map((grade, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: grade.color }} />
                <span className="text-xs text-muted-foreground whitespace-nowrap">{grade.name}: {grade.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Subject Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 rounded-2xl text-card-foreground"
      >
        <h3 className="text-lg font-bold mb-6">Subject-wise Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {subjectPerformance.map((sub, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-xl border border-border/50 bg-muted/30 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-full group-hover:scale-150 transition-transform" />
              <p className="text-sm font-bold truncate pr-4">{sub.subject}</p>
              <div className="mt-4 space-y-3">
                <div>
                   <div className="flex justify-between text-xs mb-1">
                     <span className="text-muted-foreground">Class Average</span>
                     <span className="font-bold">{sub.avg}%</span>
                   </div>
                   <div className="h-1.5 bg-muted rounded-full">
                     <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${sub.avg}%` }} />
                   </div>
                </div>
                <div>
                   <div className="flex justify-between text-xs mb-1">
                     <span className="text-muted-foreground">Pass %</span>
                     <span className="font-bold text-success">{sub.pass}%</span>
                   </div>
                   <div className="h-1.5 bg-muted rounded-full">
                     <div className="h-full bg-success rounded-full transition-all duration-1000" style={{ width: `${sub.pass}%` }} />
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
