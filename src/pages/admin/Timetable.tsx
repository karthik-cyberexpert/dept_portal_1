import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, Clock, Plus, Edit2, Download, Upload, 
  Sparkles, BookOpen, User, Building
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TimetableSlot {
  id: string;
  day: string;
  period: number;
  subject: string;
  subjectCode: string;
  faculty: string;
  room: string;
  type: 'theory' | 'lab' | 'tutorial' | 'free';
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const periods = [
  { num: 1, time: '9:00 - 9:50' },
  { num: 2, time: '9:50 - 10:40' },
  { num: 3, time: '10:50 - 11:40' },
  { num: 4, time: '11:40 - 12:30' },
  { num: 5, time: '1:30 - 2:20' },
  { num: 6, time: '2:20 - 3:10' },
  { num: 7, time: '3:20 - 4:10' },
  { num: 8, time: '4:10 - 5:00' },
];

const sampleTimetable: TimetableSlot[] = [
  { id: '1', day: 'Monday', period: 1, subject: 'Data Structures', subjectCode: 'CS301', faculty: 'Dr. Rajesh Kumar', room: 'CS-101', type: 'theory' },
  { id: '2', day: 'Monday', period: 2, subject: 'Data Structures', subjectCode: 'CS301', faculty: 'Dr. Rajesh Kumar', room: 'CS-101', type: 'theory' },
  { id: '3', day: 'Monday', period: 3, subject: 'Database Systems', subjectCode: 'CS302', faculty: 'Dr. Priya Sharma', room: 'CS-102', type: 'theory' },
  { id: '4', day: 'Monday', period: 4, subject: 'Database Systems', subjectCode: 'CS302', faculty: 'Dr. Priya Sharma', room: 'CS-102', type: 'theory' },
  { id: '5', day: 'Monday', period: 5, subject: 'DS Lab', subjectCode: 'CS301L', faculty: 'Dr. Rajesh Kumar', room: 'Lab-1', type: 'lab' },
  { id: '6', day: 'Monday', period: 6, subject: 'DS Lab', subjectCode: 'CS301L', faculty: 'Dr. Rajesh Kumar', room: 'Lab-1', type: 'lab' },
  { id: '7', day: 'Monday', period: 7, subject: 'Operating Systems', subjectCode: 'CS303', faculty: 'Prof. Anand K', room: 'CS-103', type: 'theory' },
  { id: '8', day: 'Monday', period: 8, subject: 'Tutorial', subjectCode: 'TUT', faculty: 'Tutor', room: 'CS-101', type: 'tutorial' },
  
  { id: '9', day: 'Tuesday', period: 1, subject: 'Computer Networks', subjectCode: 'CS304', faculty: 'Dr. Meena Iyer', room: 'CS-104', type: 'theory' },
  { id: '10', day: 'Tuesday', period: 2, subject: 'Computer Networks', subjectCode: 'CS304', faculty: 'Dr. Meena Iyer', room: 'CS-104', type: 'theory' },
  { id: '11', day: 'Tuesday', period: 3, subject: 'Software Engineering', subjectCode: 'CS305', faculty: 'Prof. Suresh B', room: 'CS-105', type: 'theory' },
  { id: '12', day: 'Tuesday', period: 4, subject: 'Software Engineering', subjectCode: 'CS305', faculty: 'Prof. Suresh B', room: 'CS-105', type: 'theory' },
  { id: '13', day: 'Tuesday', period: 5, subject: 'Free', subjectCode: '', faculty: '', room: '', type: 'free' },
  { id: '14', day: 'Tuesday', period: 6, subject: 'DBMS Lab', subjectCode: 'CS302L', faculty: 'Dr. Priya Sharma', room: 'Lab-2', type: 'lab' },
  { id: '15', day: 'Tuesday', period: 7, subject: 'DBMS Lab', subjectCode: 'CS302L', faculty: 'Dr. Priya Sharma', room: 'Lab-2', type: 'lab' },
  { id: '16', day: 'Tuesday', period: 8, subject: 'DBMS Lab', subjectCode: 'CS302L', faculty: 'Dr. Priya Sharma', room: 'Lab-2', type: 'lab' },

  { id: '17', day: 'Wednesday', period: 1, subject: 'Operating Systems', subjectCode: 'CS303', faculty: 'Prof. Anand K', room: 'CS-103', type: 'theory' },
  { id: '18', day: 'Wednesday', period: 2, subject: 'Operating Systems', subjectCode: 'CS303', faculty: 'Prof. Anand K', room: 'CS-103', type: 'theory' },
  { id: '19', day: 'Wednesday', period: 3, subject: 'Data Structures', subjectCode: 'CS301', faculty: 'Dr. Rajesh Kumar', room: 'CS-101', type: 'theory' },
  { id: '20', day: 'Wednesday', period: 4, subject: 'Computer Networks', subjectCode: 'CS304', faculty: 'Dr. Meena Iyer', room: 'CS-104', type: 'theory' },
  { id: '21', day: 'Wednesday', period: 5, subject: 'CN Lab', subjectCode: 'CS304L', faculty: 'Dr. Meena Iyer', room: 'Lab-3', type: 'lab' },
  { id: '22', day: 'Wednesday', period: 6, subject: 'CN Lab', subjectCode: 'CS304L', faculty: 'Dr. Meena Iyer', room: 'Lab-3', type: 'lab' },
  { id: '23', day: 'Wednesday', period: 7, subject: 'Free', subjectCode: '', faculty: '', room: '', type: 'free' },
  { id: '24', day: 'Wednesday', period: 8, subject: 'Free', subjectCode: '', faculty: '', room: '', type: 'free' },

  { id: '25', day: 'Thursday', period: 1, subject: 'Database Systems', subjectCode: 'CS302', faculty: 'Dr. Priya Sharma', room: 'CS-102', type: 'theory' },
  { id: '26', day: 'Thursday', period: 2, subject: 'Software Engineering', subjectCode: 'CS305', faculty: 'Prof. Suresh B', room: 'CS-105', type: 'theory' },
  { id: '27', day: 'Thursday', period: 3, subject: 'Operating Systems', subjectCode: 'CS303', faculty: 'Prof. Anand K', room: 'CS-103', type: 'theory' },
  { id: '28', day: 'Thursday', period: 4, subject: 'Tutorial', subjectCode: 'TUT', faculty: 'Tutor', room: 'CS-101', type: 'tutorial' },
  { id: '29', day: 'Thursday', period: 5, subject: 'OS Lab', subjectCode: 'CS303L', faculty: 'Prof. Anand K', room: 'Lab-1', type: 'lab' },
  { id: '30', day: 'Thursday', period: 6, subject: 'OS Lab', subjectCode: 'CS303L', faculty: 'Prof. Anand K', room: 'Lab-1', type: 'lab' },
  { id: '31', day: 'Thursday', period: 7, subject: 'OS Lab', subjectCode: 'CS303L', faculty: 'Prof. Anand K', room: 'Lab-1', type: 'lab' },
  { id: '32', day: 'Thursday', period: 8, subject: 'Free', subjectCode: '', faculty: '', room: '', type: 'free' },

  { id: '33', day: 'Friday', period: 1, subject: 'Computer Networks', subjectCode: 'CS304', faculty: 'Dr. Meena Iyer', room: 'CS-104', type: 'theory' },
  { id: '34', day: 'Friday', period: 2, subject: 'Data Structures', subjectCode: 'CS301', faculty: 'Dr. Rajesh Kumar', room: 'CS-101', type: 'theory' },
  { id: '35', day: 'Friday', period: 3, subject: 'Database Systems', subjectCode: 'CS302', faculty: 'Dr. Priya Sharma', room: 'CS-102', type: 'theory' },
  { id: '36', day: 'Friday', period: 4, subject: 'Software Engineering', subjectCode: 'CS305', faculty: 'Prof. Suresh B', room: 'CS-105', type: 'theory' },
  { id: '37', day: 'Friday', period: 5, subject: 'Project Work', subjectCode: 'CS306', faculty: 'All Faculty', room: 'Lab-4', type: 'lab' },
  { id: '38', day: 'Friday', period: 6, subject: 'Project Work', subjectCode: 'CS306', faculty: 'All Faculty', room: 'Lab-4', type: 'lab' },
  { id: '39', day: 'Friday', period: 7, subject: 'Sports/Library', subjectCode: '', faculty: '', room: '', type: 'free' },
  { id: '40', day: 'Friday', period: 8, subject: 'Sports/Library', subjectCode: '', faculty: '', room: '', type: 'free' },
];

const getSlotColor = (type: string) => {
  switch (type) {
    case 'theory': return 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30 hover:border-blue-400';
    case 'lab': return 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30 hover:border-purple-400';
    case 'tutorial': return 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-amber-500/30 hover:border-amber-400';
    case 'free': return 'bg-gradient-to-br from-gray-500/10 to-gray-600/10 border-gray-500/20';
    default: return 'bg-muted';
  }
};

export default function Timetable() {
  const [selectedBatch, setSelectedBatch] = useState('2021-2025');
  const [selectedClass, setSelectedClass] = useState('4');
  const [selectedSection, setSelectedSection] = useState('A');
  const [timetable] = useState<TimetableSlot[]>(sampleTimetable);

  const getSlot = (day: string, period: number) => {
    return timetable.find(slot => slot.day === day && slot.period === period);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Timetable Management
          </h1>
          <p className="text-muted-foreground mt-1">Create and manage class schedules</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2">
            <Upload className="w-4 h-4" />
            Import
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export PDF
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90">
            <Sparkles className="w-4 h-4" />
            AI Generate
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90">
            <Plus className="w-4 h-4" />
            Manual Edit
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="glass-card border-white/10">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <Select value={selectedBatch} onValueChange={setSelectedBatch}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Batch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2021-2025">2021-2025</SelectItem>
                <SelectItem value="2022-2026">2022-2026</SelectItem>
                <SelectItem value="2023-2027">2023-2027</SelectItem>
                <SelectItem value="2024-2028">2024-2028</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1st Year</SelectItem>
                <SelectItem value="2">2nd Year</SelectItem>
                <SelectItem value="3">3rd Year</SelectItem>
                <SelectItem value="4">4th Year</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSection} onValueChange={setSelectedSection}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">Section A</SelectItem>
                <SelectItem value="B">Section B</SelectItem>
                <SelectItem value="C">Section C</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-br from-blue-500/40 to-cyan-500/40 border border-blue-500/50" />
          <span className="text-sm text-muted-foreground">Theory</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-br from-purple-500/40 to-pink-500/40 border border-purple-500/50" />
          <span className="text-sm text-muted-foreground">Lab</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-br from-amber-500/40 to-orange-500/40 border border-amber-500/50" />
          <span className="text-sm text-muted-foreground">Tutorial</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-br from-gray-500/20 to-gray-600/20 border border-gray-500/30" />
          <span className="text-sm text-muted-foreground">Free</span>
        </div>
      </div>

      {/* Timetable Grid */}
      <Tabs defaultValue="week" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="week">Week View</TabsTrigger>
          <TabsTrigger value="day">Day View</TabsTrigger>
        </TabsList>

        <TabsContent value="week">
          <Card className="glass-card border-white/10 overflow-hidden">
            <CardHeader className="border-b border-white/10">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Weekly Schedule - {selectedBatch} | Year {selectedClass} | Section {selectedSection}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="p-3 text-left text-sm font-semibold text-muted-foreground w-28">
                        <Clock className="w-4 h-4 inline mr-2" />
                        Time
                      </th>
                      {days.map((day) => (
                        <th key={day} className="p-3 text-center text-sm font-semibold">
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {periods.map((period) => (
                      <tr key={period.num} className="border-b border-white/5">
                        <td className="p-2 text-sm text-muted-foreground whitespace-nowrap">
                          <div className="font-semibold">Period {period.num}</div>
                          <div className="text-xs">{period.time}</div>
                        </td>
                        {days.map((day) => {
                          const slot = getSlot(day, period.num);
                          return (
                            <td key={`${day}-${period.num}`} className="p-1">
                              {slot && (
                                <motion.div
                                  whileHover={{ scale: 1.02 }}
                                  className={`p-2 rounded-lg border transition-all cursor-pointer ${getSlotColor(slot.type)}`}
                                >
                                  <div className="font-medium text-sm truncate">
                                    {slot.subject}
                                  </div>
                                  {slot.subjectCode && (
                                    <div className="text-xs text-muted-foreground mt-1">
                                      {slot.subjectCode}
                                    </div>
                                  )}
                                  {slot.faculty && (
                                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                                      <User className="w-3 h-3" />
                                      {slot.faculty.split(' ')[0]}
                                    </div>
                                  )}
                                  {slot.room && (
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                      <Building className="w-3 h-3" />
                                      {slot.room}
                                    </div>
                                  )}
                                </motion.div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="day">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {days.map((day) => (
              <Card key={day} className="glass-card border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{day}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {periods.map((period) => {
                    const slot = getSlot(day, period.num);
                    if (!slot) return null;
                    return (
                      <motion.div
                        key={period.num}
                        whileHover={{ x: 4 }}
                        className={`p-3 rounded-lg border ${getSlotColor(slot.type)}`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{slot.subject}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {slot.faculty && <span>{slot.faculty}</span>}
                              {slot.room && <span> • {slot.room}</span>}
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            P{period.num}
                          </Badge>
                        </div>
                      </motion.div>
                    );
                  })}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Subject Summary */}
      <Card className="glass-card border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Subject Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { code: 'CS301', name: 'Data Structures', hours: 5, faculty: 'Dr. Rajesh K' },
              { code: 'CS302', name: 'Database Systems', hours: 5, faculty: 'Dr. Priya S' },
              { code: 'CS303', name: 'Operating Systems', hours: 6, faculty: 'Prof. Anand K' },
              { code: 'CS304', name: 'Computer Networks', hours: 6, faculty: 'Dr. Meena I' },
              { code: 'CS305', name: 'Software Engg.', hours: 4, faculty: 'Prof. Suresh B' },
            ].map((subject, index) => (
              <motion.div
                key={subject.code}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <Badge className="mb-2">{subject.code}</Badge>
                <div className="font-medium text-sm">{subject.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{subject.faculty}</div>
                <div className="text-xs text-primary mt-2">{subject.hours} hrs/week</div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
