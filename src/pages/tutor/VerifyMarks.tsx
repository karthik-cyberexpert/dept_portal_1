import React from 'react';
import { motion } from 'framer-motion';
import { 
  ClipboardCheck, 
  CheckCircle, 
  AlertCircle, 
  User, 
  BookOpen, 
  Search,
  ArrowRight,
  Filter,
    CheckCheck,
    FileSpreadsheet
  } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';

const subjectsToVerify = [
  { id: '1', code: 'CS3301', name: 'Data Structures', faculty: 'Mr. Senthil', status: 'pending', count: 60, submissionDate: '2024-03-18' },
  { id: '2', code: 'CS3302', name: 'DBMS', faculty: 'Prof. Lakshmi', status: 'verified', count: 60, submissionDate: '2024-03-15' },
  { id: '3', code: 'CS3303', name: 'Operating Systems', faculty: 'Dr. Ramesh', status: 'pending', count: 58, submissionDate: '2024-03-19' },
  { id: '4', code: 'MA3301', name: 'Discrete Mathematics', faculty: 'Mrs. Kavitha', status: 'pending', count: 60, submissionDate: '2024-03-20' },
];

export default function VerifyMarks() {
  const [selectedSubject, setSelectedSubject] = React.useState<string | null>(null);

  const handleVerify = (id: string) => {
    toast({
      title: "Marks Verified",
      description: "Subject marks have been verified and forwarded to HOD.",
    });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold">Internal Marks Verification 📝</h1>
          <p className="text-muted-foreground">Verify and forward subject-wise internal marks to HOD</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Consolidated Report
          </Button>
          <Button variant="gradient">
            <CheckCheck className="w-4 h-4 mr-2" />
            Verify All Pending
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Subjects', value: '6', icon: BookOpen, color: 'primary' },
          { label: 'Pending Verification', value: '3', icon: AlertCircle, color: 'warning' },
          { label: 'Verified', value: '3', icon: CheckCircle, color: 'success' },
          { label: 'Completion', value: '50%', icon: ClipboardCheck, color: 'accent' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-4 rounded-2xl flex items-center gap-4"
          >
            <div className={`w-12 h-12 rounded-xl bg-${stat.color}/10 text-${stat.color} flex items-center justify-center`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
              <p className="text-xl font-bold">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-border/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4 bg-muted/30 p-1 rounded-xl w-full md:w-auto">
            <Button variant="ghost" size="sm" className="rounded-lg bg-background shadow-sm">Odd Semester</Button>
            <Button variant="ghost" size="sm" className="rounded-lg">Even Semester</Button>
          </div>
          <div className="flex items-center gap-3">
            <Select defaultValue="ia1">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select Exam" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ia1">Internal Assessment 1</SelectItem>
                <SelectItem value="ia2">Internal Assessment 2</SelectItem>
                <SelectItem value="ia3">Internal Assessment 3</SelectItem>
                <SelectItem value="model">Model Exam</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="divide-y divide-border/50">
          {subjectsToVerify.map((subject, index) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 hover:bg-muted/30 transition-all group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${
                    subject.status === 'verified' ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'
                  }`}>
                    {subject.status === 'verified' ? <CheckCircle className="w-6 h-6" /> : <ClipboardCheck className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="font-bold flex items-center gap-2">
                      {subject.name}
                      <span className="text-xs font-mono text-muted-foreground px-2 py-0.5 bg-muted rounded-full">
                        {subject.code}
                      </span>
                    </h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                      <User className="w-3.5 h-3.5" /> {subject.faculty} • {subject.count} Students
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                   <div className="text-right hidden sm:block">
                     <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Submitted On</p>
                     <p className="text-sm font-medium">{subject.submissionDate}</p>
                   </div>
                   
                   <div className="flex items-center gap-3">
                     {subject.status === 'verified' ? (
                       <Badge variant="success" className="px-4 py-1.5 rounded-full flex items-center gap-1.5">
                          <CheckCheck className="w-3.5 h-3.5" /> Verified
                        </Badge>
                     ) : (
                       <div className="flex items-center gap-2">
                         <Button variant="outline" size="sm" className="hidden lg:flex">View Marks</Button>
                         <Button 
                          variant="gradient" 
                          size="sm"
                          onClick={() => handleVerify(subject.id)}
                         >
                           Verify & Forward
                           <ArrowRight className="w-4 h-4 ml-2" />
                         </Button>
                       </div>
                     )}
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
