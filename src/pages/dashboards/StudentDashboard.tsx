import React from 'react';
import { motion } from 'framer-motion';
import { StatCard, GlassStatCard, ProgressCard } from '@/components/dashboard/StatCards';
import { 
  TrendingUp, 
  BookOpen, 
  ClipboardCheck, 
  Trophy,
  Calendar,
  FileText,
  Clock,
  Target,
  Award,
  Sparkles,
  ChevronRight
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
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const attendanceData = [
  { month: 'Aug', value: 92 },
  { month: 'Sep', value: 88 },
  { month: 'Oct', value: 95 },
  { month: 'Nov', value: 90 },
  { month: 'Dec', value: 93 },
];

const marksData = [
  { name: 'IA1', marks: 85 },
  { name: 'IA2', marks: 78 },
  { name: 'IA3', marks: 92 },
  { name: 'Assignment', marks: 88 },
];

const subjectDistribution = [
  { name: 'Data Structures', value: 35, color: '#6366f1' },
  { name: 'DBMS', value: 25, color: '#14b8a6' },
  { name: 'OS', value: 20, color: '#f59e0b' },
  { name: 'Networks', value: 20, color: '#ec4899' },
];

const upcomingItems = [
  { title: 'Data Structures Assignment', type: 'assignment', due: '2 days', icon: FileText },
  { title: 'DBMS Quiz', type: 'quiz', due: 'Tomorrow', icon: Clock },
  { title: 'OS Mid Exam', type: 'exam', due: '5 days', icon: Target },
];

const recentNotes = [
  { subject: 'Data Structures', topic: 'Binary Trees', faculty: 'Dr. Ramesh' },
  { subject: 'DBMS', topic: 'Normalization', faculty: 'Prof. Lakshmi' },
  { subject: 'OS', topic: 'Process Scheduling', faculty: 'Mr. Senthil' },
];

export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold">Welcome back, Arun! 👋</h1>
          <p className="text-muted-foreground">Here's your academic overview for today</p>
        </div>
        <Button variant="gradient" className="w-fit">
          <Calendar className="w-4 h-4 mr-2" />
          View Timetable
        </Button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Attendance"
          value="92%"
          subtitle="This semester"
          icon={TrendingUp}
          trend={{ value: 3, isPositive: true }}
          variant="primary"
          delay={0.1}
        />
        <StatCard
          title="Internal Average"
          value="85.5"
          subtitle="Out of 100"
          icon={ClipboardCheck}
          variant="accent"
          delay={0.2}
        />
        <StatCard
          title="Pending Tasks"
          value="4"
          subtitle="Assignments & Quizzes"
          icon={BookOpen}
          variant="warning"
          delay={0.3}
        />
        <StatCard
          title="ECA Points"
          value="150"
          subtitle="This year"
          icon={Trophy}
          variant="success"
          delay={0.4}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Attendance Trend</h3>
              <p className="text-sm text-muted-foreground">Monthly attendance percentage</p>
            </div>
            <Button variant="outline" size="sm">View Details</Button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceData}>
                <defs>
                  <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis domain={[70, 100]} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  fill="url(#attendanceGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Subject Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Subject Distribution</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={subjectDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {subjectDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {subjectDistribution.map((subject, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: subject.color }}
                />
                <span className="text-xs text-muted-foreground truncate">{subject.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Cards */}
        <div className="space-y-4">
          <ProgressCard
            title="Resume Completion"
            value={75}
            color="primary"
            delay={0.5}
          />
          <ProgressCard
            title="Course Progress"
            value={68}
            color="accent"
            delay={0.6}
          />
        </div>

        {/* Upcoming Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Upcoming</h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-3">
            {upcomingItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer group"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    item.type === 'assignment' ? 'bg-primary/10 text-primary' :
                    item.type === 'quiz' ? 'bg-warning/10 text-warning' :
                    'bg-destructive/10 text-destructive'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.title}</p>
                    <p className="text-xs text-muted-foreground">Due: {item.due}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Notes</h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-3">
            {recentNotes.map((note, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{note.topic}</p>
                  <p className="text-xs text-muted-foreground">{note.subject} • {note.faculty}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ECA & Achievements Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-primary p-6 text-white"
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Level Up Your Profile!</h3>
              <p className="text-white/80">Add your ECA achievements and build your resume</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="glass" className="bg-white/20 hover:bg-white/30 text-white border-0">
              <Sparkles className="w-4 h-4 mr-2" />
              Add Achievement
            </Button>
            <Button variant="glass" className="bg-white/20 hover:bg-white/30 text-white border-0">
              Build Resume
            </Button>
          </div>
        </div>
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -right-5 -bottom-10 w-32 h-32 bg-white/10 rounded-full blur-xl" />
      </motion.div>
    </div>
  );
}
