import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Download, Eye, TrendingUp, Users, 
  BookOpen, Calendar, BarChart3, PieChart, Filter
} from 'lucide-react';
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
  PieChart as RePieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from 'recharts';

const uploadStats = [
  { subject: 'Data Structures', uploaded: 45, total: 50, faculty: 'Dr. Rajesh K' },
  { subject: 'Database Systems', uploaded: 38, total: 45, faculty: 'Dr. Priya S' },
  { subject: 'Operating Systems', uploaded: 42, total: 48, faculty: 'Prof. Anand K' },
  { subject: 'Computer Networks', uploaded: 35, total: 42, faculty: 'Dr. Meena I' },
  { subject: 'Software Engineering', uploaded: 28, total: 35, faculty: 'Prof. Suresh B' },
];

const monthlyUploads = [
  { month: 'Jan', notes: 45, questions: 20 },
  { month: 'Feb', notes: 52, questions: 25 },
  { month: 'Mar', notes: 68, questions: 32 },
  { month: 'Apr', notes: 75, questions: 40 },
  { month: 'May', notes: 60, questions: 28 },
  { month: 'Jun', notes: 48, questions: 22 },
];

const categoryData = [
  { name: 'Unit Notes', value: 45, color: '#3b82f6' },
  { name: 'Question Banks', value: 25, color: '#8b5cf6' },
  { name: 'Reference Materials', value: 15, color: '#10b981' },
  { name: 'Previous Papers', value: 10, color: '#f59e0b' },
  { name: 'Lab Manuals', value: 5, color: '#ec4899' },
];

const recentUploads = [
  { id: 1, title: 'Unit 3 - Trees & Graphs', subject: 'Data Structures', faculty: 'Dr. Rajesh K', date: '2024-03-20', downloads: 156, type: 'PDF' },
  { id: 2, title: 'IA2 Question Bank', subject: 'Database Systems', faculty: 'Dr. Priya S', date: '2024-03-19', downloads: 234, type: 'PDF' },
  { id: 3, title: 'Process Scheduling Notes', subject: 'Operating Systems', faculty: 'Prof. Anand K', date: '2024-03-18', downloads: 189, type: 'PDF' },
  { id: 4, title: 'TCP/IP Protocol Stack', subject: 'Computer Networks', faculty: 'Dr. Meena I', date: '2024-03-17', downloads: 145, type: 'PPT' },
  { id: 5, title: 'SDLC Models Comparison', subject: 'Software Engineering', faculty: 'Prof. Suresh B', date: '2024-03-16', downloads: 98, type: 'PDF' },
];

const facultyPerformance = [
  { name: 'Dr. Rajesh K', uploads: 45, downloads: 2340, rating: 4.8 },
  { name: 'Dr. Priya S', uploads: 38, downloads: 1890, rating: 4.6 },
  { name: 'Prof. Anand K', uploads: 42, downloads: 2100, rating: 4.7 },
  { name: 'Dr. Meena I', uploads: 35, downloads: 1650, rating: 4.5 },
  { name: 'Prof. Suresh B', uploads: 28, downloads: 1200, rating: 4.3 },
];

export default function NotesAnalytics() {
  const [selectedBatch, setSelectedBatch] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('all');

  const totalNotes = uploadStats.reduce((sum, s) => sum + s.uploaded, 0);
  const totalRequired = uploadStats.reduce((sum, s) => sum + s.total, 0);
  const completionRate = Math.round((totalNotes / totalRequired) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Notes & Resources Analytics
          </h1>
          <p className="text-muted-foreground mt-1">Track uploads, downloads, and resource utilization</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedBatch} onValueChange={setSelectedBatch}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Batch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Batches</SelectItem>
              <SelectItem value="2021-2025">2021-2025</SelectItem>
              <SelectItem value="2022-2026">2022-2026</SelectItem>
              <SelectItem value="2023-2027">2023-2027</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Semesters</SelectItem>
              <SelectItem value="1">Semester 1</SelectItem>
              <SelectItem value="2">Semester 2</SelectItem>
              <SelectItem value="3">Semester 3</SelectItem>
              <SelectItem value="4">Semester 4</SelectItem>
              <SelectItem value="5">Semester 5</SelectItem>
              <SelectItem value="6">Semester 6</SelectItem>
              <SelectItem value="7">Semester 7</SelectItem>
              <SelectItem value="8">Semester 8</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Notes', value: '188', icon: FileText, color: 'from-blue-500 to-cyan-500', change: '+12%' },
          { label: 'Total Downloads', value: '9.2K', icon: Download, color: 'from-purple-500 to-pink-500', change: '+23%' },
          { label: 'Active Viewers', value: '342', icon: Eye, color: 'from-emerald-500 to-teal-500', change: '+8%' },
          { label: 'Completion Rate', value: `${completionRate}%`, icon: TrendingUp, color: 'from-orange-500 to-amber-500', change: '+5%' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-card border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <p className="text-xs text-emerald-400 mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <Card className="glass-card border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Monthly Upload Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyUploads}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Legend />
                <Bar dataKey="notes" name="Notes" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="questions" name="Question Banks" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="glass-card border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-primary" />
              Resource Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center gap-8">
              <ResponsiveContainer width={200} height={200}>
                <RePieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RePieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {categoryData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm">{item.name}</span>
                    <span className="text-xs text-muted-foreground">({item.value}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject-wise Progress */}
      <Card className="glass-card border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Subject-wise Upload Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {uploadStats.map((subject, index) => {
              const percentage = Math.round((subject.uploaded / subject.total) * 100);
              return (
                <motion.div
                  key={subject.subject}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">{subject.subject}</span>
                      <span className="text-sm text-muted-foreground ml-2">({subject.faculty})</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-primary font-medium">{subject.uploaded}</span>
                      <span className="text-muted-foreground">/{subject.total}</span>
                      <Badge className="ml-2" variant={percentage >= 90 ? 'default' : percentage >= 70 ? 'secondary' : 'outline'}>
                        {percentage}%
                      </Badge>
                    </div>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Details */}
      <Tabs defaultValue="recent" className="w-full">
        <TabsList>
          <TabsTrigger value="recent">Recent Uploads</TabsTrigger>
          <TabsTrigger value="faculty">Faculty Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="recent">
          <Card className="glass-card border-white/10">
            <CardContent className="p-0">
              <div className="divide-y divide-white/5">
                {recentUploads.map((upload, index) => (
                  <motion.div
                    key={upload.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{upload.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {upload.subject} • {upload.faculty}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <Badge variant="outline">{upload.type}</Badge>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Download className="w-4 h-4" />
                          {upload.downloads}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {upload.date}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faculty">
          <Card className="glass-card border-white/10">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {facultyPerformance.map((faculty, index) => (
                  <motion.div
                    key={faculty.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/10"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                        {faculty.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-medium">{faculty.name}</h4>
                        <div className="flex items-center gap-1 text-amber-400">
                          {'★'.repeat(Math.floor(faculty.rating))}
                          <span className="text-xs text-muted-foreground ml-1">{faculty.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="p-2 rounded-lg bg-white/5">
                        <p className="text-xs text-muted-foreground">Uploads</p>
                        <p className="font-bold text-primary">{faculty.uploads}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-white/5">
                        <p className="text-xs text-muted-foreground">Downloads</p>
                        <p className="font-bold text-accent">{faculty.downloads}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
