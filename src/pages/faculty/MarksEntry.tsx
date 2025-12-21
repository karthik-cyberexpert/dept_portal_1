import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ClipboardCheck, 
  Search, 
  Filter, 
  Save, 
  CheckCircle2, 
  AlertCircle,
  FileSpreadsheet,
  TrendingUp,
  User,
  Hash
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const students = [
  { id: '21CS001', name: 'Aravind Swamy', marks: 18, max: 20, status: 'saved' },
  { id: '21CS002', name: 'Bhavana R', marks: 15, max: 20, status: 'saved' },
  { id: '21CS003', name: 'Chandru M', marks: null, max: 20, status: 'pending' },
  { id: '21CS004', name: 'Divya Parthiban', marks: 19, max: 20, status: 'saved' },
  { id: '21CS005', name: 'Eswar K', marks: 12, max: 20, status: 'saved' },
  { id: '21CS006', name: 'Farhan Ali', marks: null, max: 20, status: 'pending' },
];

export default function MarksEntry() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExam, setSelectedExam] = useState('ia1');
  const [marks, setMarks] = useState<any>(students);

  const handleMarksChange = (id: string, value: string) => {
     const numVal = parseInt(value);
     if (!isNaN(numVal) && numVal >= 0 && numVal <= 20) {
        setMarks(marks.map((s: any) => s.id === id ? { ...s, marks: numVal, status: 'changed' } : s));
     } else if (value === '') {
        setMarks(marks.map((s: any) => s.id === id ? { ...s, marks: null, status: 'pending' } : s));
     }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-black tracking-tight">Examination Marks Entry 📝</h1>
          <p className="text-muted-foreground mt-1 text-sm font-medium">Record and update student assessments</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-white/10 group">
             <FileSpreadsheet className="w-4 h-4 mr-2 group-hover:text-emerald-500 transition-colors" />
             Import CSV
          </Button>
          <Button variant="gradient" className="rounded-xl shadow-lg shadow-primary/20">
             <Save className="w-4 h-4 mr-2" />
             Save All Changes
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <div className="md:col-span-1 space-y-4">
            <Card className="glass-card p-6 border-none shadow-xl h-full">
               <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-6">Course Filters</h3>
               <div className="space-y-4">
                  <div className="space-y-2">
                     <p className="text-[10px] font-black uppercase text-primary">Requirement</p>
                     <Select defaultValue="cse-a">
                        <SelectTrigger className="rounded-xl bg-white/5 border-white/10">
                           <SelectValue placeholder="Select Class" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="cse-a">CSE - A (Year III)</SelectItem>
                           <SelectItem value="cse-b">CSE - B (Year III)</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
                  <div className="space-y-2">
                     <p className="text-[10px] font-black uppercase text-primary">Subject</p>
                     <Select defaultValue="ds">
                        <SelectTrigger className="rounded-xl bg-white/5 border-white/10">
                           <SelectValue placeholder="Select Subject" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="ds">Data Structures</SelectItem>
                           <SelectItem value="dbms">DBMS</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
                  <div className="space-y-2">
                     <p className="text-[10px] font-black uppercase text-primary">Assessment</p>
                     <Select value={selectedExam} onValueChange={setSelectedExam}>
                        <SelectTrigger className="rounded-xl bg-white/5 border-white/10">
                           <SelectValue placeholder="Select Exam" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="ia1">Internal Assessment 1</SelectItem>
                           <SelectItem value="ia2">Internal Assessment 2</SelectItem>
                           <SelectItem value="model">Model Examination</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
               </div>
               
               <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
                  <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                     <p className="text-[10px] font-black text-primary uppercase mb-1">Entry Progress</p>
                     <div className="flex items-center justify-between mb-2">
                        <span className="text-xl font-black">84%</span>
                        <span className="text-xs font-bold text-muted-foreground">55/62 Entered</span>
                     </div>
                     <div className="h-1.5 bg-primary/10 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[84%]" />
                     </div>
                  </div>
               </div>
            </Card>
         </div>

         <div className="md:col-span-3 space-y-4">
            <Card className="glass-card border-none shadow-2xl overflow-hidden">
               <div className="p-6 border-b border-white/5 bg-muted/20 flex items-center justify-between gap-4">
                  <div className="relative flex-1 max-w-md">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                     <Input 
                        placeholder="Search student name or ID..." 
                        className="pl-10 rounded-xl bg-white/5 border-white/10 focus:ring-primary/20"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                     />
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-xl"><Filter className="w-4 h-4" /></Button>
               </div>
               
               <div className="overflow-x-auto">
                  <table className="w-full">
                     <thead>
                        <tr className="bg-muted/10">
                           <th className="p-4 text-left text-xs font-black uppercase tracking-widest text-muted-foreground">Student ID</th>
                           <th className="p-4 text-left text-xs font-black uppercase tracking-widest text-muted-foreground">Name</th>
                           <th className="p-4 text-center text-xs font-black uppercase tracking-widest text-muted-foreground w-40">Marks (Max: 20)</th>
                           <th className="p-4 text-center text-xs font-black uppercase tracking-widest text-muted-foreground">Status</th>
                           <th className="p-4 text-right text-xs font-black uppercase tracking-widest text-muted-foreground">Action</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-white/5">
                        <AnimatePresence>
                           {marks.filter((s: any) => 
                              s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              s.id.toLowerCase().includes(searchTerm.toLowerCase())
                           ).map((student: any, idx: number) => (
                              <motion.tr 
                                 key={student.id}
                                 initial={{ opacity: 0, x: -10 }}
                                 animate={{ opacity: 1, x: 0 }}
                                 transition={{ delay: idx * 0.05 }}
                                 className="group hover:bg-white/5 transition-all"
                              >
                                 <td className="p-4">
                                    <div className="flex items-center gap-3">
                                       <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-[10px] font-black text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                                          <Hash className="w-3 h-3" />
                                       </div>
                                       <span className="font-bold text-sm tracking-tight">{student.id}</span>
                                    </div>
                                 </td>
                                 <td className="p-4 font-bold text-sm">{student.name}</td>
                                 <td className="p-4">
                                    <div className="flex justify-center">
                                       <Input 
                                          type="text" 
                                          className={`w-20 text-center font-black rounded-lg transition-all ${
                                             student.status === 'pending' ? 'bg-orange-500/10 border-orange-500/30' : 
                                             student.status === 'changed' ? 'bg-primary/20 border-primary/40 text-primary' : 
                                             'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
                                          }`}
                                          value={student.marks === null ? '' : student.marks}
                                          onChange={(e) => handleMarksChange(student.id, e.target.value)}
                                       />
                                    </div>
                                 </td>
                                 <td className="p-4">
                                    <div className="flex justify-center">
                                       {student.status === 'saved' ? (
                                          <Badge className="bg-emerald-500/10 text-emerald-500 border-none flex gap-1 items-center">
                                             <CheckCircle2 className="w-3 h-3" /> Saved
                                          </Badge>
                                       ) : student.status === 'pending' ? (
                                          <Badge className="bg-orange-500/10 text-orange-500 border-none flex gap-1 items-center">
                                             <AlertCircle className="w-3 h-3" /> Missing
                                          </Badge>
                                       ) : (
                                          <Badge className="bg-primary/20 text-primary border-none flex gap-1 items-center animate-pulse">
                                             Draft...
                                          </Badge>
                                       )}
                                    </div>
                                 </td>
                                 <td className="p-4 text-right">
                                    <Button variant="ghost" size="sm" className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">View History</Button>
                                 </td>
                              </motion.tr>
                           ))}
                        </AnimatePresence>
                     </tbody>
                  </table>
               </div>
            </Card>
            
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="p-6 rounded-3xl bg-primary/5 border border-primary/20 flex items-center justify-between"
            >
               <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                     <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                     <h4 className="font-black uppercase tracking-tight">AI Insights</h4>
                     <p className="text-xs font-medium text-muted-foreground">Class average for IA1 is currently <span className="text-primary font-bold">16.4/20</span>. Top performance by 5 students.</p>
                  </div>
               </div>
               <Button variant="link" className="text-primary font-black uppercase text-xs">Full Report</Button>
            </motion.div>
         </div>
      </div>
    </div>
  );
}
