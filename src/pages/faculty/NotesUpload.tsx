import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileUp, 
  Search, 
  BookOpen, 
  Trash2, 
  Download,
  FileText,
  Clock,
  CheckCircle2,
  Users,
  MoreVertical,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const notes = [
  { id: 1, title: 'Introduction to Linked Lists', subject: 'Data Structures', class: 'CSE-A', type: 'PDF', size: '1.2 MB', date: 'Oct 10, 2024', downloads: 58 },
  { id: 2, title: 'Normalization Techniques', subject: 'DBMS', class: 'CSE-B', type: 'PPTX', size: '4.5 MB', date: 'Oct 08, 2024', downloads: 42 },
  { id: 3, title: 'Process Scheduling Algorithms', subject: 'Operating Systems', class: 'CSE-A', type: 'DOCX', size: '850 KB', date: 'Oct 05, 2024', downloads: 110 },
  { id: 4, title: 'Deadlock Prevention', subject: 'Operating Systems', class: 'CSE-C', type: 'PDF', size: '2.1 MB', date: 'Oct 01, 2024', downloads: 35 },
];

export default function NotesUpload() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-black tracking-tight italic bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Notes Library & Upload</h1>
          <p className="text-muted-foreground mt-1 font-medium">Distribute course materials and question banks</p>
        </div>
        <Button variant="gradient" className="rounded-xl shadow-lg shadow-primary/20 scale-105">
           <FileUp className="w-4 h-4 mr-2" />
           Upload New Material
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <Card className="glass-card p-6 border-none shadow-xl col-span-1 h-fit">
            <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-6">Library Stats</h3>
            <div className="space-y-6">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                     <FileText className="w-5 h-5" />
                  </div>
                  <div>
                     <p className="text-xl font-black">28</p>
                     <p className="text-[10px] font-bold text-muted-foreground uppercase">Total Files</p>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                     <Download className="w-5 h-5" />
                  </div>
                  <div>
                     <p className="text-xl font-black">1.4k</p>
                     <p className="text-[10px] font-bold text-muted-foreground uppercase">Total Downloads</p>
                  </div>
               </div>
               <div className="pt-6 border-t border-white/5">
                  <p className="text-[10px] font-black uppercase text-primary mb-3 tracking-widest">Storage Status</p>
                  <div className="flex justify-between text-xs font-bold mb-2">
                     <span>Used</span>
                     <span>45%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                     <div className="h-full bg-gradient-to-r from-primary to-accent w-[45%]" />
                  </div>
               </div>
            </div>
         </Card>

         <div className="col-span-1 md:col-span-3 space-y-4">
            <div className="flex gap-4 items-center">
               <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                     placeholder="Search by title, subject or class..." 
                     className="pl-10 rounded-2xl bg-white/5 border-white/10"
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                  />
               </div>
               <Button variant="outline" className="rounded-2xl border-white/10">Filter Files</Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
               <AnimatePresence>
                  {notes.filter(n => n.title.toLowerCase().includes(searchTerm.toLowerCase())).map((note, idx) => (
                     <motion.div
                        key={note.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: idx * 0.05 }}
                     >
                        <Card className="glass-card border-none p-5 group hover:shadow-glow transition-all">
                           <div className="flex gap-4">
                              <div className="w-14 h-14 rounded-2xl bg-muted/50 flex flex-col items-center justify-center text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                                 <FileText className="w-6 h-6" />
                                 <span className="text-[8px] font-black leading-none mt-1 uppercase">{note.type}</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                 <div className="flex items-center justify-between mb-1">
                                    <Badge variant="outline" className="text-[9px] font-black uppercase tracking-tighter border-white/10">{note.subject}</Badge>
                                    <div className="flex gap-1">
                                       <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg"><Download className="w-4 h-4" /></Button>
                                       <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg text-destructive/50 hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
                                    </div>
                                 </div>
                                 <h4 className="font-bold text-sm truncate mb-3">{note.title}</h4>
                                 <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground">
                                    <span className="flex items-center gap-1 uppercase tracking-widest"><Users className="w-3 h-3" /> {note.class}</span>
                                    <span className="flex items-center gap-1 uppercase tracking-widest"><Clock className="w-3 h-3" /> {note.date}</span>
                                    <span className="ml-auto text-primary px-2 py-0.5 rounded-full bg-primary/10">{note.downloads} dl</span>
                                 </div>
                              </div>
                           </div>
                        </Card>
                     </motion.div>
                  ))}
               </AnimatePresence>

               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-2xl border-2 border-dashed border-white/5 flex flex-col items-center justify-center p-8 group cursor-pointer hover:border-primary/30 transition-all hover:bg-primary/5"
               >
                  <div className="w-12 h-12 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                     <Plus className="w-6 h-6 text-muted-foreground group-hover:text-primary" />
                  </div>
                  <p className="text-xs font-black uppercase text-muted-foreground group-hover:text-primary tracking-widest">Drop files here</p>
               </motion.div>
            </div>
         </div>
      </div>
    </div>
  );
}
