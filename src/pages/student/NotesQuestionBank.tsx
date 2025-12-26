import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Search, 
  Download, 
  BookOpen, 
  FileCode, 
  HelpCircle,
  ExternalLink,
  Filter,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  getResources, 
  getStudents, 
  Resource, 
  getFaculty, 
  Faculty, 
  addNotification 
} from '@/lib/data-store';
import { useAuth } from '@/contexts/AuthContext';

export default function NotesQuestionBank() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [resources, setResources] = useState<Resource[]>([]);
  const [activeTab, setActiveTab ] = useState('notes');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  useEffect(() => {
    const allResources = getResources();
    setResources(allResources);
  }, []);

  const filteredResources = resources.filter(res => {
    const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          res.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          res.subjectCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject ? res.subjectCode === selectedSubject : true;
    
    // Mapping activeTab to Resource Type
    // Assuming 'Note' and 'Question Bank' are the exact strings in the data store based on previous observations in this file
    // Check data-store if 'Question Bank' is 'QP' or 'Question Bank'
    // Previous code used 'Question Bank' so sticking to that, but making it robust
    const matchesType = activeTab === 'notes' ? res.type === 'Note' : (res.type === 'Question Bank' || res.type === 'QP');

    return matchesSearch && matchesSubject && matchesType;
  });

  // Unique Subjects for Sidebar
  const subjects = resources.reduce((acc: any[], curr) => {
    if (!acc.find(s => s.code === curr.subjectCode)) {
      acc.push({ name: curr.subject, code: curr.subjectCode, count: 1 });
    } else {
      const idx = acc.findIndex(s => s.code === curr.subjectCode);
      acc[idx].count += 1;
    }
    return acc;
  }, []);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold">Learning Resources</h1>
          <p className="text-muted-foreground">Access study materials, lecture notes, and question banks</p>
        </div>
      </motion.div>

      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <Input 
          placeholder="Search for subjects, topics, or question papers..." 
          className="pl-12 h-14 bg-muted/50 border-transparent focus:bg-card focus:border-primary/20 rounded-2xl text-lg transition-all shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1 space-y-4">
          <div className="glass-card rounded-2xl p-5">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Quick Filters
            </h3>
            <div className="space-y-2">
              <Button 
                variant={activeTab === 'notes' ? 'secondary' : 'ghost'} 
                className="w-full justify-start rounded-xl font-semibold transition-all"
                onClick={() => setActiveTab('notes')}
              >
                <FileText className="w-4 h-4 mr-2" />
                Lecture Notes
              </Button>
              <Button 
                variant={activeTab === 'question_bank' ? 'secondary' : 'ghost'} 
                className="w-full justify-start rounded-xl font-semibold transition-all"
                onClick={() => setActiveTab('question_bank')}
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Question Bank
              </Button>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 bg-primary/5 border border-primary/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="font-bold">By Subjects</h3>
            </div>
            <div className="space-y-3">
              <div 
                className={`flex items-center justify-between group cursor-pointer hover:text-primary transition-colors ${selectedSubject === null ? 'text-primary font-bold' : ''}`}
                onClick={() => setSelectedSubject(null)}
              >
                  <span className="text-sm font-medium">All Subjects</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-muted group-hover:bg-primary/10 group-hover:text-primary transition-all">
                    {resources.length}
                  </span>
              </div>
              {subjects.map((sub, idx) => (
                <div 
                    key={idx} 
                    className={`flex items-center justify-between group cursor-pointer hover:text-primary transition-colors ${selectedSubject === sub.code ? 'text-primary font-bold' : ''}`}
                    onClick={() => setSelectedSubject(sub.code)}
                >
                  <span className="text-sm font-medium">{sub.name}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-muted group-hover:bg-primary/10 group-hover:text-primary transition-all">
                    {sub.count}
                  </span>
                </div>
              ))}
              {subjects.length === 0 && (
                  <p className="text-xs text-muted-foreground">No subjects found.</p>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-between"
          >
            <h2 className="text-xl font-bold flex items-center gap-2">
              {activeTab === 'notes' ? <FileText className="w-5 h-5 text-primary" /> : <HelpCircle className="w-5 h-5 text-accent" />}
              {activeTab === 'notes' ? 'Lecture Notes' : 'Question Banks'}
            </h2>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10">
                Showing {filteredResources.length} resources
            </span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredResources.map((res, idx) => (
                <ResourceCard key={res.id} res={res} idx={idx} />
            ))}
            {filteredResources.length === 0 && (
                <EmptyState type={activeTab === 'notes' ? "Lecture Notes" : "Question Banks"} />
            )}
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl bg-gradient-to-r from-accent/20 to-primary/20 p-8 text-center space-y-4 border border-white/10"
          >
            <h3 className="text-xl font-bold">Can't find what you're looking for?</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Request specific study materials from your faculty directly.
            </p>
            <div className="flex justify-center gap-3">
              <RequestMaterialDialog user={user} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function RequestMaterialDialog({ user }: { user: any }) {
  const [open, setOpen] = useState(false);
  const [facultyList, setFacultyList] = useState<Faculty[]>([]);
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setFacultyList(getFaculty());
  }, []);

  const handleSubmit = () => {
    if (!selectedFaculty || !description) {
      toast.error("Please select a faculty and provide a description.");
      return;
    }

    const faculty = facultyList.find(f => f.id === selectedFaculty);
    if (!faculty) return;

    addNotification({
      recipientId: faculty.id,
      senderId: user?.id || 'unknown',
      senderName: user?.name || 'Student',
      title: 'Material Request',
      message: `${user?.name} has requested study material: ${description}`,
      type: 'request'
    });

    toast.success("Request sent successfully!");
    setOpen(false);
    setSelectedFaculty('');
    setDescription('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="rounded-xl px-8">Request Material</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request Study Material</DialogTitle>
          <DialogDescription>
            Send a request to your faculty for specific notes or question papers.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Faculty</label>
            <Select value={selectedFaculty} onValueChange={setSelectedFaculty}>
              <SelectTrigger>
                <SelectValue placeholder="Choose Faculty" />
              </SelectTrigger>
              <SelectContent>
                {facultyList.map(f => (
                  <SelectItem key={f.id} value={f.id}>{f.name} ({f.designation})</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea 
              placeholder="Describe the material you need (e.g., Unit 3 Notes for Data Structures)" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Send Request</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const ResourceCard = ({ res, idx }: { res: Resource, idx: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: idx * 0.05 }}
    className="p-5 glass-card rounded-2xl group hover:border-primary/20 transition-all cursor-pointer"
  >
    <div className="flex items-start justify-between mb-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
        res.type === 'Note' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'
      }`}>
        {res.type === 'Note' ? <FileText className="w-5 h-5" /> : <HelpCircle className="w-5 h-5" />}
      </div>
      <div className="flex gap-2">
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted opacity-0 group-hover:opacity-100 transition-opacity">
          <ExternalLink className="w-4 h-4 text-muted-foreground" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted text-primary">
          <Download className="w-4 h-4" />
        </Button>
      </div>
    </div>

    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{res.subjectCode}</p>
    <h4 className="font-bold text-lg mb-4 group-hover:text-primary transition-colors">{res.title}</h4>

    <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase">
      <span>{res.fileSize} ({res.fileType})</span>
      <span className="flex items-center gap-1 text-[8px]">
        <div className="w-1 h-1 rounded-full bg-muted-foreground" />
        {new Date(res.createdAt).toLocaleDateString()}
      </span>
    </div>
  </motion.div>
);

const EmptyState = ({ type }: { type: string }) => (
    <div className="col-span-2 py-20 text-center flex flex-col items-center gap-3 bg-muted/20 rounded-2xl border-2 border-dashed border-white/5">
        <AlertCircle className="w-10 h-10 opacity-20" />
        <p className="text-muted-foreground font-medium">No {type} found matching your criteria.</p>
    </div>
);
