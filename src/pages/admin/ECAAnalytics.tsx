import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, Trophy, Users, Star, TrendingUp,
  Medal, Target, Calendar, CheckCircle2, XCircle,
  Clock, Filter, Eye, ThumbsUp, ThumbsDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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

const categoryStats = [
  { name: 'Technical', value: 145, color: '#3b82f6' },
  { name: 'Sports', value: 98, color: '#10b981' },
  { name: 'Cultural', value: 76, color: '#8b5cf6' },
  { name: 'Social Service', value: 52, color: '#f59e0b' },
  { name: 'Leadership', value: 34, color: '#ec4899' },
];

const monthlyTrends = [
  { month: 'Jan', submissions: 32, approved: 28, rejected: 4 },
  { month: 'Feb', submissions: 45, approved: 40, rejected: 5 },
  { month: 'Mar', submissions: 58, approved: 52, rejected: 6 },
  { month: 'Apr', submissions: 42, approved: 38, rejected: 4 },
  { month: 'May', submissions: 36, approved: 32, rejected: 4 },
  { month: 'Jun', submissions: 28, approved: 25, rejected: 3 },
];

const classWiseStats = [
  { class: '1st Year', total: 85, approved: 72, participation: 48 },
  { class: '2nd Year', total: 112, approved: 98, participation: 62 },
  { class: '3rd Year', total: 134, approved: 120, participation: 71 },
  { class: '4th Year', total: 74, approved: 68, participation: 45 },
];

const pendingApprovals = [
  { id: 1, student: 'Arun Kumar', rollNo: 'CS2101', title: 'Smart India Hackathon - Winner', category: 'Technical', level: 'National', date: '2024-03-15', certificates: 2 },
  { id: 2, student: 'Priya Sharma', rollNo: 'CS2102', title: 'State Level Badminton', category: 'Sports', level: 'State', date: '2024-03-14', certificates: 1 },
  { id: 3, student: 'Vikram Singh', rollNo: 'CS2103', title: 'IEEE Paper Publication', category: 'Technical', level: 'International', date: '2024-03-13', certificates: 1 },
  { id: 4, student: 'Deepa Menon', rollNo: 'CS2104', title: 'NSS Camp Coordinator', category: 'Social Service', level: 'College', date: '2024-03-12', certificates: 1 },
  { id: 5, student: 'Rahul Krishnan', rollNo: 'CS2105', title: 'Classical Dance Competition', category: 'Cultural', level: 'State', date: '2024-03-11', certificates: 2 },
];

const topAchievers = [
  { rank: 1, name: 'Arun Kumar', rollNo: 'CS2101', class: '4th Year', achievements: 12, points: 156 },
  { rank: 2, name: 'Priya Sharma', rollNo: 'CS2102', class: '4th Year', achievements: 10, points: 142 },
  { rank: 3, name: 'Vikram Singh', rollNo: 'CS2103', class: '3rd Year', achievements: 9, points: 128 },
  { rank: 4, name: 'Deepa Menon', rollNo: 'CS2104', class: '3rd Year', achievements: 8, points: 115 },
  { rank: 5, name: 'Rahul Krishnan', rollNo: 'CS2105', class: '2nd Year', achievements: 7, points: 98 },
];

const getLevelBadge = (level: string) => {
  switch (level) {
    case 'International': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    case 'National': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'State': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    case 'District': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Technical': return 'bg-blue-500/20 text-blue-400';
    case 'Sports': return 'bg-emerald-500/20 text-emerald-400';
    case 'Cultural': return 'bg-purple-500/20 text-purple-400';
    case 'Social Service': return 'bg-amber-500/20 text-amber-400';
    case 'Leadership': return 'bg-pink-500/20 text-pink-400';
    default: return 'bg-gray-500/20 text-gray-400';
  }
};

export default function ECAAnalytics() {
  const [selectedBatch, setSelectedBatch] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const totalAchievements = categoryStats.reduce((sum, c) => sum + c.value, 0);
  const pendingCount = pendingApprovals.length;
  const approvalRate = 89;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            ECA Analytics & Approvals
          </h1>
          <p className="text-muted-foreground mt-1">Track extra-curricular activities and achievements</p>
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
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="cultural">Cultural</SelectItem>
              <SelectItem value="social">Social Service</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Achievements', value: totalAchievements, icon: Award, color: 'from-blue-500 to-cyan-500' },
          { label: 'Pending Approvals', value: pendingCount, icon: Clock, color: 'from-amber-500 to-orange-500' },
          { label: 'Approval Rate', value: `${approvalRate}%`, icon: CheckCircle2, color: 'from-emerald-500 to-teal-500' },
          { label: 'Active Students', value: '226', icon: Users, color: 'from-purple-500 to-pink-500' },
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
        {/* Category Distribution */}
        <Card className="glass-card border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Category Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center gap-8">
              <ResponsiveContainer width={200} height={200}>
                <RePieChart>
                  <Pie
                    data={categoryStats}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RePieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {categoryStats.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm">{item.name}</span>
                    <span className="text-xs text-muted-foreground">({item.value})</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trends */}
        <Card className="glass-card border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Monthly Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={monthlyTrends}>
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
                <Line type="monotone" dataKey="submissions" name="Submitted" stroke="hsl(var(--primary))" strokeWidth={2} />
                <Line type="monotone" dataKey="approved" name="Approved" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Class-wise Stats */}
      <Card className="glass-card border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Class-wise Participation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={classWiseStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="class" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
              <Legend />
              <Bar dataKey="total" name="Total Submissions" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="approved" name="Approved" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="participation" name="Unique Students" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="pending" className="w-full">
        <TabsList>
          <TabsTrigger value="pending" className="gap-2">
            <Clock className="w-4 h-4" />
            Pending Approvals ({pendingCount})
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="gap-2">
            <Trophy className="w-4 h-4" />
            Top Achievers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-4">
          <div className="space-y-4">
            {pendingApprovals.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="glass-card border-white/10 hover:border-white/20 transition-all">
                  <CardContent className="p-4">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                          <Award className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold">{item.title}</h3>
                            <Badge className={getCategoryColor(item.category)}>{item.category}</Badge>
                            <Badge className={getLevelBadge(item.level)}>{item.level}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.student} ({item.rollNo})
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {item.date}
                            </span>
                            <span>{item.certificates} certificate(s) attached</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Eye className="w-4 h-4" />
                          View
                        </Button>
                        <Button size="sm" className="gap-1 bg-emerald-500 hover:bg-emerald-600">
                          <ThumbsUp className="w-4 h-4" />
                          Approve
                        </Button>
                        <Button variant="destructive" size="sm" className="gap-1">
                          <ThumbsDown className="w-4 h-4" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="mt-4">
          <Card className="glass-card border-white/10">
            <CardContent className="p-6">
              <div className="space-y-4">
                {topAchievers.map((student, index) => (
                  <motion.div
                    key={student.rollNo}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        student.rank === 1 ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-white' :
                        student.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white' :
                        student.rank === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white' :
                        'bg-white/10 text-muted-foreground'
                      }`}>
                        {student.rank === 1 ? <Trophy className="w-5 h-5" /> : student.rank}
                      </div>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.rollNo} • {student.class}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <p className="text-lg font-bold text-primary">{student.achievements}</p>
                        <p className="text-xs text-muted-foreground">Achievements</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-amber-400">{student.points}</p>
                        <p className="text-xs text-muted-foreground">Points</p>
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
