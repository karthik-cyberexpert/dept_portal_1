import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Search, 
  Download, 
  BookOpen, 
  FileCode, 
  HelpCircle,
  ExternalLink,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function NotesQuestionBank() {
  const subjects = [
    { name: "Data Structures", code: "CS301", notes: 12, qps: 5 },
    { name: "DBMS", code: "CS302", notes: 8, qps: 4 },
    { name: "Operating Systems", code: "CS303", notes: 15, qps: 6 },
    { name: "Computer Networks", code: "CS304", notes: 10, qps: 4 },
  ];

  const recentResources = [
    { title: "Binary Search Trees - Implementation", type: "Note", subject: "DS", date: "2h ago", size: "2.4 MB" },
    { title: "Normalization Forms - Full Guide", type: "QP", subject: "DBMS", date: "Yesterday", size: "1.1 MB" },
    { title: "Process Synchronization Notes", type: "Note", subject: "OS", date: "2 days ago", size: "3.2 MB" },
  ];

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
              <Button variant="secondary" className="w-full justify-start rounded-xl font-semibold">
                <FileText className="w-4 h-4 mr-2" />
                Lecture Notes
              </Button>
              <Button variant="ghost" className="w-full justify-start rounded-xl">
                <HelpCircle className="w-4 h-4 mr-2" />
                Question Bank
              </Button>
              <Button variant="ghost" className="w-full justify-start rounded-xl">
                <FileCode className="w-4 h-4 mr-2" />
                Lab Manuals
              </Button>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 bg-primary/5 border border-primary/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="font-bold">My Subjects</h3>
            </div>
            <div className="space-y-3">
              {subjects.map((sub, idx) => (
                <div key={idx} className="flex items-center justify-between group cursor-pointer hover:text-primary transition-colors">
                  <span className="text-sm font-medium">{sub.name}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-muted group-hover:bg-primary/10 group-hover:text-primary transition-all">
                    {sub.notes}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="bg-muted/50 p-1 rounded-xl mb-6">
              <TabsTrigger value="all" className="rounded-lg">All Resources</TabsTrigger>
              <TabsTrigger value="recent" className="rounded-lg">Recently Added</TabsTrigger>
              <TabsTrigger value="favorites" className="rounded-lg">Favorites</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="outline-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentResources.map((res, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
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

                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{res.subject} • {res.type}</p>
                    <h4 className="font-bold text-lg mb-4 group-hover:text-primary transition-colors">{res.title}</h4>

                    <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase">
                      <span>{res.size}</span>
                      <span className="flex items-center gap-1">
                        <div className="w-1 h-1 rounded-full bg-muted-foreground" />
                        {res.date}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="rounded-2xl bg-gradient-to-r from-accent/20 to-primary/20 p-8 text-center space-y-4 border border-white/10"
          >
            <h3 className="text-xl font-bold">Can't find what you're looking for?</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Request resources from your faculty or check the physical library catalog for offline reference.
            </p>
            <div className="flex justify-center gap-3">
              <Button variant="default" className="rounded-xl px-8">Request Material</Button>
              <Button variant="outline" className="rounded-xl px-8">Library Portal</Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
