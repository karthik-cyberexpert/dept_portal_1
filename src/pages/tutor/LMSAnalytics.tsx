import React from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Users, 
  Target, 
  Zap, 
  BarChart3, 
  PieChart as PieChartIcon,
  Search,
  Download,
  Flame,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';
import { cn } from '@/lib/utils';

const quizActivityData = [
  { day: 'Mon', attempts: 45 },
  { day: 'Tue', attempts: 52 },
  { day: 'Wed', attempts: 38 },
  { day: 'Thu', attempts: 65 },
  { day: 'Fri', attempts: 48 },
  { day: 'Sat', attempts: 25 },
  { day: 'Sun', attempts: 32 },
];

const scoringDistribution = [
  { name: '90-100%', value: 15, color: '#10b981' },
  { name: '75-89%', value: 25, color: '#3b82f6' },
  { name: '60-74%', value: 12, color: '#f59e0b' },
  { name: 'Below 60%', value: 8, color: '#ef4444' },
];

const topPerformers = [
  { name: 'Arun Prasath', score: 980, avatar: 'A' },
  { name: 'Divya Lakshmi', score: 965, avatar: 'D' },
  { name: 'Karthik Raja', score: 940, avatar: 'K' },
  { name: 'Sowmya R', score: 925, avatar: 'S' },
  { name: 'Vijay Kumar', score: 910, avatar: 'V' },
];

export default function LMSAnalytics() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold">LMS Analytics 🎓</h1>
          <p className="text-muted-foreground">Comprehensive insights into student quiz activity and engagement</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl">
             <Download className="w-4 h-4 mr-2" />
             Export Data
          </Button>
          <Button variant="gradient" className="rounded-xl shadow-lg shadow-primary/20">
             <Zap className="w-4 h-4 mr-2" />
             Live Monitor
          </Button>
        </div>
      </motion.div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: 'Completion Rate', value: '84.5%', icon: Target, color: 'text-primary' },
           { label: 'Active Students', value: '52/60', icon: Users, color: 'text-accent' },
           { label: 'Avg. Quiz Score', value: '78%', icon: Trophy, color: 'text-warning' },
           { label: 'Daily Streak', value: '12 Days', icon: Flame, color: 'text-orange-500' }
         ].map((stat, i) => (
           <Card key={i} className="glass-card p-5 border-none shadow-lg group hover:bg-gradient-to-br hover:from-primary/5 hover:to-accent/5 transition-all">
              <div className="flex items-center gap-4">
                 <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center bg-background/50 shadow-inner", stat.color)}>
                    <stat.icon className="w-6 h-6" />
                 </div>
                 <div>
                    <p className="text-xs text-muted-foreground font-bold uppercase">{stat.label}</p>
                    <p className="text-xl font-bold">{stat.value}</p>
                 </div>
              </div>
           </Card>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Engagement Chart */}
        <Card className="glass-card p-6 border-none shadow-xl lg:col-span-2">
           <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Daily Quiz Attempts</h3>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-none text-[10px]">CURRENT WEEK</Badge>
           </div>
           <div className="h-72">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={quizActivityData}>
                 <defs>
                   <linearGradient id="colorAttempts" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                 <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                 <YAxis stroke="hsl(var(--muted-foreground))" />
                 <Tooltip
                   contentStyle={{
                     backgroundColor: 'hsl(var(--card))',
                     border: '1px solid hsl(var(--border))',
                     borderRadius: '12px',
                   }}
                 />
                 <Area 
                  type="monotone" 
                  dataKey="attempts" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#colorAttempts)" 
                  strokeWidth={3}
                 />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </Card>

        {/* Scoring Pie Chart */}
        <Card className="glass-card p-6 border-none shadow-xl">
           <h3 className="text-lg font-bold mb-6">Score Distribution</h3>
           <div className="h-56">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={scoringDistribution}
                   cx="50%"
                   cy="50%"
                   innerRadius={60}
                   outerRadius={80}
                   paddingAngle={5}
                   dataKey="value"
                 >
                   {scoringDistribution.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} />
                   ))}
                 </Pie>
                 <Tooltip />
               </PieChart>
             </ResponsiveContainer>
           </div>
           <div className="space-y-3 mt-4">
              {scoringDistribution.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                   <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-muted-foreground">{item.name}</span>
                   </div>
                   <span className="font-bold">{item.value} Students</span>
                </div>
              ))}
           </div>
        </Card>

        {/* Leaderboard Table */}
        <Card className="glass-card p-6 border-none shadow-xl lg:col-span-1">
           <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Star className="w-5 h-5 text-warning fill-warning" />
                Top Performers
              </h3>
           </div>
           <div className="space-y-4">
              {topPerformers.map((student, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors"
                >
                   <div className="font-bold text-muted-foreground w-4 text-center">{i + 1}</div>
                   <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center font-bold text-primary">
                      {student.avatar}
                   </div>
                   <div className="flex-1">
                      <p className="text-sm font-bold">{student.name}</p>
                      <p className="text-[10px] text-muted-foreground">CSE-A SECTION</p>
                   </div>
                   <div className="text-right">
                      <p className="text-sm font-black text-primary">{student.score}</p>
                      <p className="text-[10px] text-muted-foreground font-bold">PTS</p>
                   </div>
                </motion.div>
              ))}
           </div>
           <Button variant="ghost" className="w-full mt-6 rounded-xl">View Hall of Fame</Button>
        </Card>

        {/* Detailed Metrics */}
        <Card className="glass-card p-6 border-none shadow-xl lg:col-span-2">
           <h3 className="text-lg font-bold mb-6">Engagement metrics</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                 <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                       <span className="text-muted-foreground uppercase">Average Time / Quiz</span>
                       <span className="text-primary">14.2 min</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full">
                       <div className="h-full w-[72%] bg-primary rounded-full" />
                    </div>
                 </div>
                 <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                       <span className="text-muted-foreground uppercase">Retry Rate</span>
                       <span className="text-accent">2.4x</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full">
                       <div className="h-full w-[45%] bg-accent rounded-full" />
                    </div>
                 </div>
              </div>
              <div className="space-y-6">
                 <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                       <span className="text-muted-foreground uppercase">Video Completion</span>
                       <span className="text-success">92%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full">
                       <div className="h-full w-[92%] bg-success rounded-full" />
                    </div>
                 </div>
                 <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                       <span className="text-muted-foreground uppercase">Help Desk Queries</span>
                       <span className="text-destructive">Low</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full">
                       <div className="h-full w-[15%] bg-destructive rounded-full" />
                    </div>
                 </div>
              </div>
           </div>
        </Card>
      </div>
    </div>
  );
}
