import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Clock, CheckCircle2, AlertCircle, Users,
  Search, Filter, Calendar, Download, Eye, BarChart3,
  TrendingUp, BookOpen, Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from 'recharts';

interface Assignment {
  id: string;
  title: string;
  subject: string;
  subjectCode: string;
  faculty: string;
  class: string;
  section: string;
  dueDate: string;
  totalStudents: number;
  submitted: number;
  evaluated: number;
  status: 'active' | 'overdue' | 'completed';
  maxMarks: number;
  avgMarks: number;
}

const assignments: Assignment[] = [
  { id: '1', title: 'Binary Tree Implementation', subject: 'Data Structures', subjectCode: 'CS301', faculty: 'Dr. Rajesh K', class: '4th Year', section: 'A', dueDate: '2024-03-25', totalStudents: 60, submitted: 45, evaluated: 30, status: 'active', maxMarks: 25, avgMarks: 18.5 },
  { id: '2', title: 'SQL Query Optimization', subject: 'Database Systems', subjectCode: 'CS302', faculty: 'Dr. Priya S', class: '4th Year', section: 'A', dueDate: '2024-03-22', totalStudents: 60, submitted: 58, evaluated: 58, status: 'completed', maxMarks: 20, avgMarks: 16.2 },
  { id: '3', title: 'Process Scheduling Algorithms', subject: 'Operating Systems', subjectCode: 'CS303', faculty: 'Prof. Anand K', class: '4th Year', section: 'B', dueDate: '2024-03-20', totalStudents: 60, submitted: 42, evaluated: 42, status: 'overdue', maxMarks: 25, avgMarks: 17.8 },
  { id: '4', title: 'Network Topology Design', subject: 'Computer Networks', subjectCode: 'CS304', faculty: 'Dr. Meena I', class: '4th Year', section: 'B', dueDate: '2024-03-28', totalStudents: 60, submitted: 20, evaluated: 0, status: 'active', maxMarks: 30, avgMarks: 0 },
  { id: '5', title: 'UML Diagrams for E-commerce', subject: 'Software Engineering', subjectCode: 'CS305', faculty: 'Prof. Suresh B', class: '4th Year', section: 'C', dueDate: '2024-03-18', totalStudents: 60, submitted: 55, evaluated: 50, status: 'completed', maxMarks: 20, avgMarks: 15.5 },
  { id: '6', title: 'Linked List Operations', subject: 'Data Structures', subjectCode: 'CS301', faculty: 'Dr. Rajesh K', class: '3rd Year', section: 'A', dueDate: '2024-03-30', totalStudents: 60, submitted: 10, evaluated: 0, status: 'active', maxMarks: 25, avgMarks: 0 },
];

const submissionTrends = [
  { day: 'Mon', submissions: 45, onTime: 40 },
  { day: 'Tue', submissions: 62, onTime: 55 },
  { day: 'Wed', submissions: 78, onTime: 70 },
  { day: 'Thu', submissions: 55, onTime: 48 },
  { day: 'Fri', submissions: 90, onTime: 85 },
  { day: 'Sat', submissions: 30, onTime: 28 },
  { day: 'Sun', submissions: 15, onTime: 14 },
];

const subjectStats = [
  { subject: 'CS301', pending: 15, submitted: 45, evaluated: 30 },
  { subject: 'CS302', pending: 2, submitted: 58, evaluated: 58 },
  { subject: 'CS303', pending: 18, submitted: 42, evaluated: 42 },
  { subject: 'CS304', pending: 40, submitted: 20, evaluated: 0 },
  { subject: 'CS305', pending: 5, submitted: 55, evaluated: 50 },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    case 'active': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'overdue': return 'bg-red-500/20 text-red-400 border-red-500/30';
    default: return 'bg-muted text-muted-foreground';
  }
};

export default function Assignments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedClass, setSelectedClass] = useState('all');

  const stats = {
    total: assignments.length,
    active: assignments.filter(a => a.status === 'active').length,
    overdue: assignments.filter(a => a.status === 'overdue').length,
    completed: assignments.filter(a => a.status === 'completed').length,
    totalSubmissions: assignments.reduce((sum, a) => sum + a.submitted, 0),
    totalEvaluated: assignments.reduce((sum, a) => sum + a.evaluated, 0),
  };

  const filteredAssignments = assignments.filter(a => {
    const matchesSearch = 
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    const matchesClass = selectedClass === 'all' || a.class === selectedClass;
    return matchesSearch && matchesStatus && matchesClass;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Assignments Management
          </h1>
          <p className="text-muted-foreground mt-1">Track and manage all class assignments</p>
        </div>
        <Button className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90">
          <Plus className="w-4 h-4" />
          Create Assignment
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Total', value: stats.total, icon: FileText, color: 'from-blue-500 to-cyan-500' },
          { label: 'Active', value: stats.active, icon: Clock, color: 'from-emerald-500 to-teal-500' },
          { label: 'Overdue', value: stats.overdue, icon: AlertCircle, color: 'from-red-500 to-rose-500' },
          { label: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'from-purple-500 to-pink-500' },
          { label: 'Submissions', value: stats.totalSubmissions, icon: Users, color: 'from-amber-500 to-orange-500' },
          { label: 'Evaluated', value: stats.totalEvaluated, icon: TrendingUp, color: 'from-indigo-500 to-violet-500' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="glass-card border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                    <stat.icon className="w-4 h-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Submission Trends (This Week)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={submissionTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Legend />
                <Line type="monotone" dataKey="submissions" name="Total" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))' }} />
                <Line type="monotone" dataKey="onTime" name="On Time" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ fill: 'hsl(var(--accent))' }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Subject-wise Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={subjectStats} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                <YAxis dataKey="subject" type="category" stroke="hsl(var(--muted-foreground))" width={60} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Legend />
                <Bar dataKey="pending" name="Pending" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
                <Bar dataKey="submitted" name="Submitted" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
                <Bar dataKey="evaluated" name="Evaluated" stackId="a" fill="#10b981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search assignments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Classes</SelectItem>
            <SelectItem value="1st Year">1st Year</SelectItem>
            <SelectItem value="2nd Year">2nd Year</SelectItem>
            <SelectItem value="3rd Year">3rd Year</SelectItem>
            <SelectItem value="4th Year">4th Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredAssignments.map((assignment, index) => {
            const submissionRate = Math.round((assignment.submitted / assignment.totalStudents) * 100);
            const evaluationRate = assignment.submitted > 0 ? Math.round((assignment.evaluated / assignment.submitted) * 100) : 0;
            const daysLeft = Math.ceil((new Date(assignment.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

            return (
              <motion.div
                key={assignment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="glass-card border-white/10 hover:border-white/20 transition-all">
                  <CardContent className="p-4">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                          <FileText className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold">{assignment.title}</h3>
                            <Badge variant="outline">{assignment.subjectCode}</Badge>
                            <Badge className={getStatusColor(assignment.status)}>
                              {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {assignment.subject} • {assignment.faculty} • {assignment.class} - Section {assignment.section}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Due: {assignment.dueDate}
                              {daysLeft > 0 && assignment.status === 'active' && (
                                <Badge className="ml-1 bg-blue-500/20 text-blue-400">{daysLeft} days left</Badge>
                              )}
                            </span>
                            <span>Max Marks: {assignment.maxMarks}</span>
                            {assignment.avgMarks > 0 && <span>Avg: {assignment.avgMarks}</span>}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 min-w-[200px]">
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Submissions</span>
                            <span>{assignment.submitted}/{assignment.totalStudents} ({submissionRate}%)</span>
                          </div>
                          <Progress value={submissionRate} className="h-2" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Evaluated</span>
                            <span>{assignment.evaluated}/{assignment.submitted} ({evaluationRate}%)</span>
                          </div>
                          <Progress value={evaluationRate} className="h-2 bg-purple-500/20" />
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Eye className="w-4 h-4" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Download className="w-4 h-4" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
