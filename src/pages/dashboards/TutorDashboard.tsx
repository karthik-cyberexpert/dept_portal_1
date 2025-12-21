import React from 'react';
import { motion } from 'framer-motion';
import { StatCard, GlassStatCard, ProgressCard } from '@/components/dashboard/StatCards';
import { 
  Users, 
  ClipboardCheck, 
  FileCheck,
  AlertTriangle,
  Trophy,
  BarChart3,
  ChevronRight,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  BookOpen,
  FileText
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
} from 'recharts';

const classPerformance = [
  { month: 'Aug', attendance: 92, marks: 78 },
  { month: 'Sep', attendance: 88, marks: 82 },
  { month: 'Oct', attendance: 95, marks: 85 },
  { month: 'Nov', attendance: 90, marks: 80 },
  { month: 'Dec', attendance: 93, marks: 88 },
];

const pendingApprovals = [
  { type: 'Leave', student: 'Arun Prasath', reason: 'Medical Leave', days: 2, date: 'Today' },
  { type: 'Leave', student: 'Priya Sharma', reason: 'Family Function', days: 1, date: 'Yesterday' },
  { type: 'ECA', student: 'Karthik Raja', event: 'Hackathon Winner', date: '2 days ago' },
  { type: 'ECA', student: 'Divya Lakshmi', event: 'Paper Presentation', date: '3 days ago' },
];

const marksVerification = [
  { exam: 'IA1 - Data Structures', faculty: 'Mr. Senthil', status: 'pending', count: 58 },
  { exam: 'IA1 - DBMS', faculty: 'Prof. Lakshmi', status: 'verified', count: 60 },
  { exam: 'IA2 - OS', faculty: 'Dr. Ramesh', status: 'pending', count: 55 },
];

const academicAlerts = [
  { student: 'Rahul Kumar', issue: 'Low Attendance (65%)', severity: 'high' },
  { student: 'Sneha Patel', issue: 'Missing Assignments (3)', severity: 'medium' },
  { student: 'Vikram Singh', issue: 'Low IA Marks (<40)', severity: 'high' },
];

export default function TutorDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold">Good Morning, Lakshmi! 👩‍🏫</h1>
          <p className="text-muted-foreground">Class In-Charge • CSE-A (2021-2025 Batch)</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <BarChart3 className="w-4 h-4 mr-2" />
            Class Analytics
          </Button>
          <Button variant="gradient">
            <Users className="w-4 h-4 mr-2" />
            View Class
          </Button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Students"
          value="60"
          subtitle="In CSE-A Section"
          icon={Users}
          variant="primary"
          delay={0.1}
        />
        <StatCard
          title="Pending Approvals"
          value="6"
          subtitle="Leave & ECA"
          icon={Clock}
          variant="warning"
          delay={0.2}
        />
        <StatCard
          title="Marks to Verify"
          value="12"
          subtitle="From 3 subjects"
          icon={ClipboardCheck}
          variant="accent"
          delay={0.3}
        />
        <StatCard
          title="Academic Alerts"
          value="3"
          subtitle="Need attention"
          icon={AlertTriangle}
          variant="info"
          delay={0.4}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Class Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Class Performance Heatmap</h3>
              <p className="text-sm text-muted-foreground">Attendance vs Academic Performance</p>
            </div>
            <Button variant="outline" size="sm">Detailed Report</Button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={classPerformance}>
                <defs>
                  <linearGradient id="attendanceGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="marksGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="attendance"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="url(#attendanceGrad)"
                  name="Attendance %"
                />
                <Area
                  type="monotone"
                  dataKey="marks"
                  stroke="hsl(var(--accent))"
                  strokeWidth={2}
                  fill="url(#marksGrad)"
                  name="Avg Marks"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">Attendance</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span className="text-sm text-muted-foreground">Avg Marks</span>
            </div>
          </div>
        </motion.div>

        {/* Academic Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Academic Alerts</h3>
            <span className="px-2 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-medium">
              {academicAlerts.length} Active
            </span>
          </div>
          <div className="space-y-3">
            {academicAlerts.map((alert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className={`p-4 rounded-xl border ${
                  alert.severity === 'high' 
                    ? 'border-destructive/30 bg-destructive/5' 
                    : 'border-warning/30 bg-warning/5'
                }`}
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className={`w-5 h-5 flex-shrink-0 ${
                    alert.severity === 'high' ? 'text-destructive' : 'text-warning'
                  }`} />
                  <div>
                    <p className="font-medium text-sm">{alert.student}</p>
                    <p className="text-xs text-muted-foreground">{alert.issue}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4" size="sm">
            View All Alerts
          </Button>
        </motion.div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Approvals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Pending Approvals</h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-3">
            {pendingApprovals.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-xl bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    item.type === 'Leave' ? 'bg-info/10 text-info' : 'bg-success/10 text-success'
                  }`}>
                    {item.type === 'Leave' ? <Clock className="w-5 h-5" /> : <Trophy className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{item.student}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.type === 'Leave' ? `${item.reason} - ${item.days} day(s)` : item.event}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon-sm" className="text-success hover:bg-success/10">
                    <CheckCircle className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon-sm" className="text-destructive hover:bg-destructive/10">
                    <XCircle className="w-5 h-5" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Marks Verification */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Marks Verification</h3>
            <Button variant="ghost" size="sm">Verify All</Button>
          </div>
          <div className="space-y-3">
            {marksVerification.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-xl bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{item.exam}</p>
                    <p className="text-xs text-muted-foreground">{item.faculty} • {item.count} students</p>
                  </div>
                </div>
                {item.status === 'pending' ? (
                  <Button variant="gradient" size="sm">Verify</Button>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-success/10 text-success text-xs font-medium">
                    Verified
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ProgressCard
          title="Notes Completion"
          value={85}
          color="primary"
          delay={0.7}
        />
        <ProgressCard
          title="Assignment Submission"
          value={92}
          color="accent"
          delay={0.8}
        />
        <ProgressCard
          title="LMS Quiz Participation"
          value={78}
          color="success"
          delay={0.9}
        />
      </div>
    </div>
  );
}
