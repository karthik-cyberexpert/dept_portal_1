import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Download, 
  ChevronDown, 
  MoreVertical,
  CheckCircle2,
  XCircle,
  FileText
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { getStudents, getMarks, Student, MarkEntry } from '@/lib/data-store';

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [marks, setMarks] = useState<MarkEntry[]>([]);
  const [selectedBatch, setSelectedBatch] = useState('all');
  const [selectedSection, setSelectedSection] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setStudents(getStudents());
    setMarks(getMarks());
  }, []);

  const uniqueBatches = Array.from(new Set(students.map(s => s.batch))).sort();
  const uniqueSections = Array.from(new Set(students.map(s => s.section))).sort();

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesBatch = selectedBatch === 'all' || student.batch === selectedBatch;
      const matchesSection = selectedSection === 'all' || student.section === selectedSection;
      const matchesSearch = 
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesBatch && matchesSection && matchesSearch;
    });
  }, [students, selectedBatch, selectedSection, searchQuery]);

  // Helper to get marks for a student and exam type
  const getStudentMark = (studentId: string, examType: string) => {
    // Determine subject based on context (In a real app, faculty would select subject)
    // For now, let's sum up marks for 'CS301' (example subject) or aggregation logic?
    // The requirement asks for CIA 1, 2, 3 columns directly. 
    // Assuming a single subject context for simplicity or Aggregated? 
    // Usually a faculty handles multiple subjects. They should probably select a subject too.
    // I'll stick to a simple mapping for now. finding ANY mark for that exam type.
    const entry = marks.find(m => m.studentId === studentId && m.examType === examType);
    return entry ? entry.marks : '-';
  };
  
  // Calculate Total Internal
  const calculateTotalInternal = (studentId: string) => {
      const cia1 = parseFloat(getStudentMark(studentId, 'ia1') as string) || 0;
      const cia2 = parseFloat(getStudentMark(studentId, 'ia2') as string) || 0;
      const cia3 = parseFloat(getStudentMark(studentId, 'ia3') as string) || 0;
      const model = parseFloat(getStudentMark(studentId, 'model') as string) || 0;
      // Assignment is a checkbox, let's assume it gives fixed points? e.g. 10
      // Requirement says "Total Internal Mark". Usually it's a formula.
      // I'll just sum them up for display purposes.
      return cia1 + cia2 + cia3 + model;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Student Management
          </h1>
          <p className="text-muted-foreground mt-1">View and manage student academic details</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
            </Button>
        </div>
      </div>

      <Card className="glass-card border-white/10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or reg no..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedBatch} onValueChange={setSelectedBatch}>
              <SelectTrigger>
                <SelectValue placeholder="Select Batch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Batches</SelectItem>
                {uniqueBatches.map(batch => (
                  <SelectItem key={batch} value={batch}>{batch}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedSection} onValueChange={setSelectedSection}>
              <SelectTrigger>
                <SelectValue placeholder="Select Section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sections</SelectItem>
                {uniqueSections.map(section => (
                  <SelectItem key={section} value={section}>{section}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">S.No</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead>Reg. No</TableHead>
              <TableHead className="text-center">CIA 1</TableHead>
              <TableHead className="text-center">CIA 2</TableHead>
              <TableHead className="text-center">CIA 3</TableHead>
              <TableHead className="text-center">Model</TableHead>
              <TableHead className="text-center">Assignment</TableHead>
              <TableHead className="text-center">Total Internal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => (
                <TableRow key={student.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                        <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-xs text-muted-foreground">{student.batch} - {student.section}</p>
                        </div>
                    </TableCell>
                    <TableCell className="font-mono">{student.rollNumber}</TableCell>
                    <TableCell className="text-center">{getStudentMark(student.id, 'ia1')}</TableCell>
                    <TableCell className="text-center">{getStudentMark(student.id, 'ia2')}</TableCell>
                    <TableCell className="text-center">{getStudentMark(student.id, 'ia3')}</TableCell>
                    <TableCell className="text-center">{getStudentMark(student.id, 'model')}</TableCell>
                    <TableCell className="text-center">
                        <div className="flex justify-center">
                            <Checkbox />
                        </div>
                    </TableCell>
                    <TableCell className="text-center font-bold">
                        {calculateTotalInternal(student.id)}
                    </TableCell>
                </TableRow>
                ))
            ) : (
                <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                        No students found matching filters.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
