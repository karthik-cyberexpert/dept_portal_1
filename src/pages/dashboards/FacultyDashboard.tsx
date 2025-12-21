import React from 'react';
import { motion } from 'framer-motion';
import { StatCard, GlassStatCard, ProgressCard } from '@/components/dashboard/StatCards';
import { 
  BookOpen, 
  Users, 
  ClipboardCheck, 
  FileUp,
  Calendar,
  Clock,
  ChevronRight,
  Upload,
  CheckCircle,
  AlertCircle,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const classesData = [
  { subject: 'Data Structures', section: 'CSE-A', time: '9:00 AM', room: 'LH-201', status: 'upcoming' },
  { subject: 'DBMS Lab', section: 'CSE-B', time: '11:00 AM', room: 'Lab-3', status: 'upcoming' },
  { subject: 'Data Structures', section: 'CSE-C', time: '2:00 PM', room: 'LH-105', status: 'upcoming' },
];

const pendingSubmissions = [
  { assignment: 'DS Assignment 3', section: 'CSE-A', submitted: 42, total: 60 },
  { assignment: 'DBMS Assignment 2', section: 'CSE-B', submitted: 55, total: 60 },
  { assignment: 'DS Quiz 2', section: 'CSE-C', submitted: 38, total: 58 },
];

const marksEntryStatus = [
  { exam: 'IA1', section: 'CSE-A', status: 'completed', percentage: 100 },
  { exam: 'IA1', section: 'CSE-B', status: 'pending', percentage: 75 },
  { exam: 'IA2', section: 'CSE-A', status: 'pending', percentage: 0 },
];

const weeklyStats = [
  { day: 'Mon', classes: 4, hours: 5 },
  { day: 'Tue', classes: 3, hours: 4 },
  { day: 'Wed', classes: 5, hours: 6 },
  { day: 'Thu', classes: 4, hours: 5 },
  { day: 'Fri', classes: 3, hours: 4 },
];

export default function FacultyDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold">Good Morning, Senthil! 👨‍🏫</h1>
          <p className="text-muted-foreground">You have 3 classes scheduled for today</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            My Timetable
          </Button>
          <Button variant="gradient">
            <Upload className="w-4 h-4 mr-2" />
            Upload Notes
          </Button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Today's Classes"
          value="3"
          subtitle="4 hours total"
          icon={Clock}
          variant="primary"
          delay={0.1}
        />
        <StatCard
          title="Subjects Handled"
          value="4"
          subtitle="Across 6 sections"
          icon={BookOpen}
          variant="accent"
          delay={0.2}
        />
        <StatCard
          title="Pending Evaluation"
          value="12"
          subtitle="Submissions to review"
          icon={ClipboardCheck}
          variant="warning"
          delay={0.3}
        />
        <StatCard
          title="Notes Uploaded"
          value="28"
          subtitle="This semester"
          icon={FileUp}
          variant="success"
          delay={0.4}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Today's Schedule</h3>
              <p className="text-sm text-muted-foreground">Your classes for today</p>
            </div>
            <Button variant="outline" size="sm">Full Timetable</Button>
          </div>
          <div className="space-y-4">
            {classesData.map((cls, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-all cursor-pointer group"
              >
                <div className="w-16 text-center">
                  <p className="text-sm font-bold text-primary">{cls.time}</p>
                </div>
                <div className="w-1 h-12 bg-gradient-primary rounded-full" />
                <div className="flex-1">
                  <p className="font-semibold">{cls.subject}</p>
                  <p className="text-sm text-muted-foreground">{cls.section} • Room {cls.room}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    Upcoming
                  </span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Weekly Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Weekly Overview</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="classes" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-3 rounded-xl bg-primary/10">
            <p className="text-sm text-center">
              <span className="font-semibold text-primary">19 classes</span>
              <span className="text-muted-foreground"> this week</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Submissions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Pending Evaluations</h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {pendingSubmissions.map((item, index) => {
              const percentage = (item.submitted / item.total) * 100;
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{item.assignment}</p>
                      <p className="text-xs text-muted-foreground">{item.section}</p>
                    </div>
                    <span className="text-sm font-medium">
                      {item.submitted}/{item.total}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                      className="h-full bg-gradient-accent rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Marks Entry Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Marks Entry Status</h3>
            <Button variant="ghost" size="sm">Enter Marks</Button>
          </div>
          <div className="space-y-3">
            {marksEntryStatus.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-xl bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  {item.status === 'completed' ? (
                    <CheckCircle className="w-5 h-5 text-success" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-warning" />
                  )}
                  <div>
                    <p className="font-medium text-sm">{item.exam} - {item.section}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.percentage}% completed
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  item.status === 'completed' 
                    ? 'bg-success/10 text-success' 
                    : 'bg-warning/10 text-warning'
                }`}>
                  {item.status === 'completed' ? 'Done' : 'Pending'}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="glass-card rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Upload, label: 'Upload Notes', color: 'primary' },
            { icon: FileText, label: 'Create Assignment', color: 'accent' },
            { icon: ClipboardCheck, label: 'Enter Marks', color: 'warning' },
            { icon: Users, label: 'View Students', color: 'success' },
          ].map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-all text-center group"
              >
                <div className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3 bg-${action.color}/10 text-${action.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium">{action.label}</p>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
