import React from 'react';
import { motion } from 'framer-motion';
import { 
  Puzzle, 
  Clock, 
  Award, 
  PlayCircle, 
  CheckCircle2, 
  Timer,
  BarChart,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

export default function LMSQuiz() {
  const quizzes = [
    { 
      id: 1, 
      title: "Data Structures - Linked Lists", 
      subject: "CS301",
      duration: "30 mins", 
      questions: 20, 
      status: "active",
      deadline: "Oct 25, 06:00 PM"
    },
    { 
      id: 2, 
      title: "DBMS - SQL Joins & Queries", 
      subject: "CS302",
      duration: "45 mins", 
      questions: 30, 
      status: "completed",
      score: 85,
      date: "Oct 15"
    },
    { 
      id: 3, 
      title: "OS - Memory Management", 
      subject: "CS303",
      duration: "20 mins", 
      questions: 15, 
      status: "missed",
      deadline: "Oct 12"
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold">LMS Quiz Portal</h1>
          <p className="text-muted-foreground">Test your knowledge with chapter-wise assessments</p>
        </div>
        <div className="flex gap-3">
          <div className="glass-card px-4 py-2 rounded-xl flex items-center gap-3 border-primary/20">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase">Average Score</p>
              <p className="text-sm font-black">78.5%</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-black text-muted-foreground uppercase tracking-widest px-2">Available Assessments</h3>
          {quizzes.map((quiz, idx) => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group p-6 glass-card rounded-2xl transition-all hover:border-primary/20"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex items-start gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                    quiz.status === 'active' ? 'bg-primary/10 text-primary animate-pulse' :
                    quiz.status === 'completed' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                  }`}>
                    <Puzzle className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{quiz.subject}</p>
                      {quiz.status === 'active' && <Badge className="bg-success text-white border-0 text-[9px] px-2 h-4">OPEN</Badge>}
                    </div>
                    <h4 className="text-lg font-bold group-hover:text-primary transition-colors leading-tight mb-3">
                      {quiz.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                        <Timer className="w-3.5 h-3.5" />
                        {quiz.duration}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                        <HelpCircle className="w-3.5 h-3.5" />
                        {quiz.questions} Questions
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3 min-w-[140px]">
                  {quiz.status === 'completed' ? (
                    <div className="text-right">
                      <p className="text-2xl font-black text-success font-mono">{quiz.score}%</p>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">Final Score</p>
                    </div>
                  ) : quiz.status === 'active' ? (
                    <div className="text-right">
                      <p className="text-sm font-bold text-warning">{quiz.deadline}</p>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">ENDS ON</p>
                    </div>
                  ) : (
                    <Badge variant="secondary" className="bg-destructive/10 text-destructive border-0 uppercase font-black text-[9px]">MISSED</Badge>
                  )}
                  
                  <Button 
                    variant={quiz.status === 'active' ? 'default' : 'secondary'} 
                    size="sm" 
                    className="w-full rounded-xl h-9 text-xs font-bold"
                    disabled={quiz.status === 'missed'}
                  >
                    {quiz.status === 'active' ? 'Start Quiz' : quiz.status === 'completed' ? 'Review Results' : 'Unavailable'}
                    {quiz.status === 'active' && <PlayCircle className="w-3.5 h-3.5 ml-2" />}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-2xl p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/10"
          >
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <BarChart className="w-5 h-5 text-primary" />
              Quiz Analytics
            </h3>
            <div className="space-y-5">
              {[
                { label: "Accuracy", value: 82, color: "bg-primary" },
                { label: "Completion Rate", value: 94, color: "bg-accent" },
                { label: "Strength - Logic", value: 78, color: "bg-success" },
              ].map((stat, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold px-1">
                    <span className="text-muted-foreground uppercase tracking-tighter">{stat.label}</span>
                    <span>{stat.value}%</span>
                  </div>
                  <div className="h-1.5 bg-muted/50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.value}%` }}
                      transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                      className={`h-full ${stat.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 rounded-xl bg-background/50 border border-white/5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold text-xs">#3</div>
                <div>
                  <p className="text-xs font-bold leading-none">Class Leaderboard</p>
                  <p className="text-[10px] text-muted-foreground mt-1">Out of 64 students</p>
                </div>
              </div>
              <Button variant="link" className="w-full h-auto p-0 text-xs text-primary">View Full Rankings</Button>
            </div>
          </motion.div>

          <Button variant="outline" className="w-full rounded-2xl h-14 border-dashed border-primary/30 text-primary hover:bg-primary/5 transition-all font-bold">
            <Plus className="w-4 h-4 mr-2" />
            Practice Quiz Library
          </Button>
        </div>
      </div>
    </div>
  );
}
