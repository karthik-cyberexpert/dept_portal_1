import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, Users, Trophy, TrendingUp, Clock,
  Target, Award, BarChart3, Brain, Zap,
  CheckCircle2, XCircle, Star, Filter
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
  LineChart,
  Line,
  Legend,
  PieChart as RePieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';

const usageStats = [
  { week: 'Week 1', quizzes: 156, completions: 142, avgScore: 72 },
  { week: 'Week 2', quizzes: 189, completions: 175, avgScore: 75 },
  { week: 'Week 3', quizzes: 234, completions: 210, avgScore: 78 },
  { week: 'Week 4', quizzes: 267, completions: 248, avgScore: 76 },
  { week: 'Week 5', quizzes: 312, completions: 285, avgScore: 79 },
  { week: 'Week 6', quizzes: 289, completions: 265, avgScore: 81 },
];

const subjectPerformance = [
  { subject: 'Data Structures', avgScore: 78, attempts: 450, passRate: 85 },
  { subject: 'Database Systems', avgScore: 82, attempts: 380, passRate: 88 },
  { subject: 'Operating Systems', avgScore: 71, attempts: 420, passRate: 76 },
  { subject: 'Computer Networks', avgScore: 75, attempts: 390, passRate: 80 },
  { subject: 'Software Engineering', avgScore: 85, attempts: 350, passRate: 92 },
];

const difficultyDistribution = [
  { name: 'Easy', value: 35, color: '#10b981' },
  { name: 'Medium', value: 45, color: '#f59e0b' },
  { name: 'Hard', value: 20, color: '#ef4444' },
];

const topPerformers = [
  { rank: 1, name: 'Arun Kumar', rollNo: 'CS2101', score: 956, quizzes: 45, accuracy: 94 },
  { rank: 2, name: 'Priya Sharma', rollNo: 'CS2102', score: 942, quizzes: 43, accuracy: 92 },
  { rank: 3, name: 'Vikram Singh', rollNo: 'CS2103', score: 928, quizzes: 44, accuracy: 90 },
  { rank: 4, name: 'Deepa Menon', rollNo: 'CS2104', score: 915, quizzes: 42, accuracy: 89 },
  { rank: 5, name: 'Rahul Krishnan', rollNo: 'CS2105', score: 901, quizzes: 41, accuracy: 88 },
];

const radarData = [
  { subject: 'DS', fullMark: 100, score: 78 },
  { subject: 'DBMS', fullMark: 100, score: 82 },
  { subject: 'OS', fullMark: 100, score: 71 },
  { subject: 'CN', fullMark: 100, score: 75 },
  { subject: 'SE', fullMark: 100, score: 85 },
];

const quizzes = [
  { id: 1, title: 'Binary Trees Quiz', subject: 'Data Structures', questions: 20, attempts: 156, avgScore: 76, passRate: 82, difficulty: 'Medium' },
  { id: 2, title: 'SQL Fundamentals', subject: 'Database Systems', questions: 25, attempts: 142, avgScore: 81, passRate: 88, difficulty: 'Easy' },
  { id: 3, title: 'Process Management', subject: 'Operating Systems', questions: 15, attempts: 134, avgScore: 68, passRate: 72, difficulty: 'Hard' },
  { id: 4, title: 'TCP/IP Protocol', subject: 'Computer Networks', questions: 20, attempts: 128, avgScore: 74, passRate: 78, difficulty: 'Medium' },
  { id: 5, title: 'SDLC Models', subject: 'Software Engineering', questions: 15, attempts: 145, avgScore: 86, passRate: 94, difficulty: 'Easy' },
];

export default function LMSManagement() {
  const [selectedBatch, setSelectedBatch] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const totalQuizzes = quizzes.length;
  const totalAttempts = quizzes.reduce((sum, q) => sum + q.attempts, 0);
  const avgPassRate = Math.round(quizzes.reduce((sum, q) => sum + q.passRate, 0) / quizzes.length);
  const avgScore = Math.round(quizzes.reduce((sum, q) => sum + q.avgScore, 0) / quizzes.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            LMS Analytics & Management
          </h1>
          <p className="text-muted-foreground mt-1">Monitor learning management system usage and performance</p>
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
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              <SelectItem value="cs301">Data Structures</SelectItem>
              <SelectItem value="cs302">Database Systems</SelectItem>
              <SelectItem value="cs303">Operating Systems</SelectItem>
              <SelectItem value="cs304">Computer Networks</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Quizzes', value: totalQuizzes, icon: BookOpen, color: 'from-blue-500 to-cyan-500' },
          { label: 'Total Attempts', value: totalAttempts.toLocaleString(), icon: Users, color: 'from-purple-500 to-pink-500' },
          { label: 'Avg Pass Rate', value: `${avgPassRate}%`, icon: Trophy, color: 'from-emerald-500 to-teal-500' },
          { label: 'Avg Score', value: `${avgScore}%`, icon: TrendingUp, color: 'from-orange-500 to-amber-500' },
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
        {/* Usage Trends */}
        <Card className="glass-card border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Weekly Usage Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={usageStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Legend />
                <Line type="monotone" dataKey="quizzes" name="Attempts" stroke="hsl(var(--primary))" strokeWidth={2} />
                <Line type="monotone" dataKey="completions" name="Completions" stroke="hsl(var(--accent))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Subject Performance Radar */}
        <Card className="glass-card border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              Subject Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="subject" stroke="hsl(var(--muted-foreground))" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="hsl(var(--muted-foreground))" />
                <Radar name="Score" dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Difficulty & Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Difficulty Distribution */}
        <Card className="glass-card border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Difficulty Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width={200} height={200}>
                <RePieChart>
                  <Pie
                    data={difficultyDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {difficultyDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RePieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {difficultyDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card className="glass-card border-white/10 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topPerformers.map((student, index) => (
                <motion.div
                  key={student.rollNo}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      student.rank === 1 ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-white' :
                      student.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white' :
                      student.rank === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white' :
                      'bg-white/10 text-muted-foreground'
                    }`}>
                      {student.rank}
                    </div>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{student.rollNo}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <p className="font-bold text-primary">{student.score}</p>
                      <p className="text-xs text-muted-foreground">Score</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold">{student.quizzes}</p>
                      <p className="text-xs text-muted-foreground">Quizzes</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-emerald-400">{student.accuracy}%</p>
                      <p className="text-xs text-muted-foreground">Accuracy</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quizzes Table */}
      <Card className="glass-card border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Quiz Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {quizzes.map((quiz, index) => (
              <motion.div
                key={quiz.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                      <Brain className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{quiz.title}</h4>
                        <Badge variant="outline">{quiz.questions} Qs</Badge>
                        <Badge className={
                          quiz.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-400' :
                          quiz.difficulty === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
                          'bg-red-500/20 text-red-400'
                        }>
                          {quiz.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{quiz.subject}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-lg font-bold">{quiz.attempts}</p>
                      <p className="text-xs text-muted-foreground">Attempts</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-primary">{quiz.avgScore}%</p>
                      <p className="text-xs text-muted-foreground">Avg Score</p>
                    </div>
                    <div className="text-center min-w-[100px]">
                      <div className="flex items-center gap-2">
                        <Progress value={quiz.passRate} className="h-2 flex-1" />
                        <span className="text-sm font-medium">{quiz.passRate}%</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Pass Rate</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
