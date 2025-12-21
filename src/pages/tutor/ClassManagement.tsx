import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  GraduationCap,
  Calendar,
  Mail,
  Phone,
  ArrowUpRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GlassStatCard } from '@/components/dashboard/StatCards';

const students = [
  { id: '1', name: 'Arun Prasath', rollNo: '21CS001', attendance: 95, cgpa: 8.5, status: 'Active', photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop' },
  { id: '2', name: 'Priya Sharma', rollNo: '21CS045', attendance: 88, cgpa: 9.2, status: 'Active', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' },
  { id: '3', name: 'Karthik Raja', rollNo: '21CS023', attendance: 92, cgpa: 7.8, status: 'Active', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
  { id: '4', name: 'Divya Lakshmi', rollNo: '21CS015', attendance: 78, cgpa: 8.1, status: 'Active', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop' },
  { id: '5', name: 'Rahul Kumar', rollNo: '21CS056', attendance: 65, cgpa: 6.9, status: 'Alert', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' },
];

export default function ClassManagement() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold">Class Management 📋</h1>
          <p className="text-muted-foreground">CSE-A • 2021-2025 Batch • 60 Students</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export List
          </Button>
          <Button variant="gradient">
            <Users className="w-4 h-4 mr-2" />
            Bulk Actions
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassStatCard
          title="Class Average Attendance"
          value="89%"
          subtitle="Target: 95%"
          icon={Calendar}
          iconColor="text-primary"
          delay={0.1}
        />
        <GlassStatCard
          title="Average CGPA"
          value="8.2"
          subtitle="Class Performance"
          icon={TrendingUp}
          iconColor="text-success"
          delay={0.2}
        />
        <GlassStatCard
          title="Certifications"
          value="124"
          subtitle="Total this semester"
          icon={Award}
          iconColor="text-accent"
          delay={0.3}
        />
      </div>

      <div className="glass-card rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input className="pl-10" placeholder="Search students by name or roll no..." />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">Sort By</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Name</DropdownMenuItem>
                <DropdownMenuItem>Roll Number</DropdownMenuItem>
                <DropdownMenuItem>Attendance</DropdownMenuItem>
                <DropdownMenuItem>CGPA</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-border/50">
                <th className="pb-4 font-medium text-sm text-muted-foreground pl-4">Student</th>
                <th className="pb-4 font-medium text-sm text-muted-foreground">Roll No</th>
                <th className="pb-4 font-medium text-sm text-muted-foreground">Attendance</th>
                <th className="pb-4 font-medium text-sm text-muted-foreground">CGPA</th>
                <th className="pb-4 font-medium text-sm text-muted-foreground">Status</th>
                <th className="pb-4 font-medium text-sm text-muted-foreground text-right pr-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {students.map((student, index) => (
                <motion.tr
                  key={student.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="group hover:bg-muted/30 transition-colors"
                >
                  <td className="py-4 pl-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10 border-2 border-primary/20">
                        <AvatarImage src={student.photo} alt={student.name} />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm group-hover:text-primary transition-colors">{student.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Mail className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">student@college.edu</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="text-sm font-code">{student.rollNo}</span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${student.attendance < 75 ? 'bg-destructive' : 'bg-primary'}`}
                          style={{ width: `${student.attendance}%` }}
                        />
                      </div>
                      <span className={`text-sm font-medium ${student.attendance < 75 ? 'text-destructive' : ''}`}>
                        {student.attendance}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4 font-medium">{student.cgpa}</td>
                  <td className="py-4">
                    <Badge variant={student.status === 'Alert' ? 'destructive' : 'success'} className="rounded-full">
                      {student.status}
                    </Badge>
                  </td>
                  <td className="py-4 text-right pr-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary">
                        <Mail className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:bg-info/10 hover:text-info">
                        <ArrowUpRight className="w-4 h-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit Details</DropdownMenuItem>
                          <DropdownMenuItem>Academic History</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Send Alert</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
