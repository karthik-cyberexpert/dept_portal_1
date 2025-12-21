import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, Users, Calendar, Plus, Edit2, Trash2, 
  ChevronDown, ChevronRight, Search, Filter, BookOpen,
  UserCheck, Clock, Building2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface Section {
  id: string;
  name: string;
  tutorId: string;
  tutorName: string;
  studentCount: number;
}

interface Class {
  id: string;
  year: number;
  sections: Section[];
}

interface Batch {
  id: string;
  name: string;
  startYear: number;
  endYear: number;
  status: 'active' | 'graduated' | 'upcoming';
  classes: Class[];
  totalStudents: number;
}

const initialBatches: Batch[] = [
  {
    id: '1',
    name: '2021-2025',
    startYear: 2021,
    endYear: 2025,
    status: 'active',
    totalStudents: 180,
    classes: [
      {
        id: 'c1',
        year: 4,
        sections: [
          { id: 's1', name: 'A', tutorId: 't1', tutorName: 'Dr. Rajesh Kumar', studentCount: 60 },
          { id: 's2', name: 'B', tutorId: 't2', tutorName: 'Dr. Priya Sharma', studentCount: 60 },
          { id: 's3', name: 'C', tutorId: 't3', tutorName: 'Prof. Anand Krishnan', studentCount: 60 },
        ]
      }
    ]
  },
  {
    id: '2',
    name: '2022-2026',
    startYear: 2022,
    endYear: 2026,
    status: 'active',
    totalStudents: 180,
    classes: [
      {
        id: 'c2',
        year: 3,
        sections: [
          { id: 's4', name: 'A', tutorId: 't4', tutorName: 'Dr. Meena Iyer', studentCount: 60 },
          { id: 's5', name: 'B', tutorId: 't5', tutorName: 'Prof. Suresh Babu', studentCount: 60 },
          { id: 's6', name: 'C', tutorId: 't6', tutorName: 'Dr. Lakshmi Narayanan', studentCount: 60 },
        ]
      }
    ]
  },
  {
    id: '3',
    name: '2023-2027',
    startYear: 2023,
    endYear: 2027,
    status: 'active',
    totalStudents: 180,
    classes: [
      {
        id: 'c3',
        year: 2,
        sections: [
          { id: 's7', name: 'A', tutorId: 't7', tutorName: 'Dr. Venkatesh Raman', studentCount: 60 },
          { id: 's8', name: 'B', tutorId: 't8', tutorName: 'Prof. Kavitha Sundaram', studentCount: 60 },
          { id: 's9', name: 'C', tutorId: 't9', tutorName: 'Dr. Arjun Menon', studentCount: 60 },
        ]
      }
    ]
  },
  {
    id: '4',
    name: '2024-2028',
    startYear: 2024,
    endYear: 2028,
    status: 'active',
    totalStudents: 180,
    classes: [
      {
        id: 'c4',
        year: 1,
        sections: [
          { id: 's10', name: 'A', tutorId: 't10', tutorName: 'Dr. Sanjay Patel', studentCount: 60 },
          { id: 's11', name: 'B', tutorId: 't11', tutorName: 'Prof. Deepa Krishnamurthy', studentCount: 60 },
          { id: 's12', name: 'C', tutorId: 't12', tutorName: 'Dr. Ramesh Chandran', studentCount: 60 },
        ]
      }
    ]
  },
  {
    id: '5',
    name: '2020-2024',
    startYear: 2020,
    endYear: 2024,
    status: 'graduated',
    totalStudents: 175,
    classes: [
      {
        id: 'c5',
        year: 4,
        sections: [
          { id: 's13', name: 'A', tutorId: 't1', tutorName: 'Dr. Rajesh Kumar', studentCount: 58 },
          { id: 's14', name: 'B', tutorId: 't2', tutorName: 'Dr. Priya Sharma', studentCount: 59 },
          { id: 's15', name: 'C', tutorId: 't3', tutorName: 'Prof. Anand Krishnan', studentCount: 58 },
        ]
      }
    ]
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    case 'graduated': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'upcoming': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    default: return 'bg-muted text-muted-foreground';
  }
};

const getYearLabel = (year: number) => {
  switch (year) {
    case 1: return '1st Year';
    case 2: return '2nd Year';
    case 3: return '3rd Year';
    case 4: return '4th Year';
    default: return `Year ${year}`;
  }
};

export default function BatchesClasses() {
  const [batches, setBatches] = useState<Batch[]>(initialBatches);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [expandedBatches, setExpandedBatches] = useState<string[]>(['1', '2']);
  const [isAddBatchOpen, setIsAddBatchOpen] = useState(false);
  const [newBatch, setNewBatch] = useState({ startYear: 2025, endYear: 2029 });

  const toggleBatch = (batchId: string) => {
    setExpandedBatches(prev => 
      prev.includes(batchId) 
        ? prev.filter(id => id !== batchId)
        : [...prev, batchId]
    );
  };

  const filteredBatches = batches.filter(batch => {
    const matchesSearch = batch.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || batch.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalBatches: batches.length,
    activeBatches: batches.filter(b => b.status === 'active').length,
    totalStudents: batches.reduce((sum, b) => sum + b.totalStudents, 0),
    totalSections: batches.reduce((sum, b) => 
      sum + b.classes.reduce((cs, c) => cs + c.sections.length, 0), 0
    ),
  };

  const handleAddBatch = () => {
    const newBatchData: Batch = {
      id: Date.now().toString(),
      name: `${newBatch.startYear}-${newBatch.endYear}`,
      startYear: newBatch.startYear,
      endYear: newBatch.endYear,
      status: 'upcoming',
      totalStudents: 0,
      classes: [
        {
          id: `c-${Date.now()}`,
          year: 1,
          sections: [
            { id: `s-${Date.now()}-a`, name: 'A', tutorId: '', tutorName: 'Not Assigned', studentCount: 0 },
            { id: `s-${Date.now()}-b`, name: 'B', tutorId: '', tutorName: 'Not Assigned', studentCount: 0 },
            { id: `s-${Date.now()}-c`, name: 'C', tutorId: '', tutorName: 'Not Assigned', studentCount: 0 },
          ]
        }
      ]
    };
    setBatches([newBatchData, ...batches]);
    setIsAddBatchOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Batches & Classes
          </h1>
          <p className="text-muted-foreground mt-1">Manage academic batches, years, and sections</p>
        </div>
        <Dialog open={isAddBatchOpen} onOpenChange={setIsAddBatchOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90">
              <Plus className="w-4 h-4" />
              Add New Batch
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-card border-white/10">
            <DialogHeader>
              <DialogTitle>Create New Batch</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Year</Label>
                  <Input 
                    type="number" 
                    value={newBatch.startYear}
                    onChange={(e) => setNewBatch({ 
                      ...newBatch, 
                      startYear: parseInt(e.target.value),
                      endYear: parseInt(e.target.value) + 4
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Year</Label>
                  <Input 
                    type="number" 
                    value={newBatch.endYear}
                    onChange={(e) => setNewBatch({ ...newBatch, endYear: parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <Button onClick={handleAddBatch} className="w-full">Create Batch</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Batches', value: stats.totalBatches, icon: Building2, color: 'from-blue-500 to-cyan-500' },
          { label: 'Active Batches', value: stats.activeBatches, icon: Calendar, color: 'from-emerald-500 to-teal-500' },
          { label: 'Total Students', value: stats.totalStudents, icon: Users, color: 'from-purple-500 to-pink-500' },
          { label: 'Total Sections', value: stats.totalSections, icon: BookOpen, color: 'from-orange-500 to-amber-500' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-card border-white/10 hover:border-white/20 transition-all">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
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

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search batches..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="graduated">Graduated</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Batches List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredBatches.map((batch, index) => (
            <motion.div
              key={batch.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
            >
              <Collapsible open={expandedBatches.includes(batch.id)}>
                <Card className="glass-card border-white/10 overflow-hidden">
                  <CollapsibleTrigger asChild>
                    <CardHeader 
                      className="cursor-pointer hover:bg-white/5 transition-colors"
                      onClick={() => toggleBatch(batch.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                            <GraduationCap className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-xl flex items-center gap-3">
                              Batch {batch.name}
                              <Badge className={getStatusColor(batch.status)}>
                                {batch.status.charAt(0).toUpperCase() + batch.status.slice(1)}
                              </Badge>
                            </CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                              {batch.totalStudents} students • {batch.classes[0]?.sections.length || 0} sections
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="hover:bg-primary/20">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="hover:bg-destructive/20 text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          {expandedBatches.includes(batch.id) 
                            ? <ChevronDown className="w-5 h-5 text-muted-foreground" />
                            : <ChevronRight className="w-5 h-5 text-muted-foreground" />
                          }
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="pt-0">
                      {batch.classes.map((cls) => (
                        <div key={cls.id} className="mb-4">
                          <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {getYearLabel(cls.year)} - Semester {cls.year * 2 - 1} & {cls.year * 2}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {cls.sections.map((section) => (
                              <motion.div
                                key={section.id}
                                whileHover={{ scale: 1.02 }}
                                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <Badge variant="outline" className="text-lg px-3 py-1">
                                    Section {section.name}
                                  </Badge>
                                  <span className="text-sm text-muted-foreground">
                                    {section.studentCount} students
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 mt-3">
                                  <UserCheck className="w-4 h-4 text-primary" />
                                  <span className="text-sm">{section.tutorName}</span>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
