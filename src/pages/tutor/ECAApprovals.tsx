import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Award, 
  ExternalLink, 
  CheckCircle, 
  XCircle, 
  Search,
  Filter,
  Eye,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const ecaSubmissions = [
  {
    id: '1',
    student: 'Arun Prasath',
    rollNo: '21CS001',
    event: 'Smart India Hackathon 2024',
    category: 'Hackathon',
    position: 'Winner',
    dates: 'March 15-16, 2024',
    certificate: 'https://example.com/cert1.pdf',
    status: 'pending',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop'
  },
  {
    id: '2',
    student: 'Divya Lakshmi',
    rollNo: '21CS015',
    event: 'International Conference on AI',
    category: 'Paper Presentation',
    position: 'Presented',
    dates: 'February 10, 2024',
    certificate: 'https://example.com/cert2.pdf',
    status: 'pending',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
  },
  {
    id: '3',
    student: 'Karthik Raja',
    rollNo: '21CS023',
    event: 'State Level Volleyball',
    category: 'Sports',
    position: 'Runners',
    dates: 'January 25, 2024',
    certificate: 'https://example.com/cert3.pdf',
    status: 'approved',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
  }
];

export default function ECAApprovals() {
  const [activeTab, setActiveTab] = React.useState<'pending' | 'approved'>('pending');

  const handleAction = (id: string, action: 'approve' | 'reject') => {
    toast({
      title: action === 'approve' ? "Achievement Verified" : "Request Rejected",
      description: `Achievement from request ${id} has been ${action}d.`,
      variant: action === 'approve' ? "default" : "destructive",
    });
  };

  const filtered = ecaSubmissions.filter(s => s.status === activeTab);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold">ECA & Achievements 🏆</h1>
          <p className="text-muted-foreground">Verify and approve student extracurricular activities</p>
        </div>
        <div className="flex bg-muted p-1 rounded-xl">
          <Button 
            variant={activeTab === 'pending' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setActiveTab('pending')}
            className="rounded-lg"
          >
            Pending
          </Button>
          <Button 
            variant={activeTab === 'approved' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setActiveTab('approved')}
            className="rounded-lg"
          >
            Verified
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-3xl overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500 group flex flex-col min-h-[460px]"
            >
              <div className="h-28 bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30 relative">
                <div className="absolute -bottom-8 left-6 p-1.5 bg-background rounded-2xl shadow-2xl z-20">
                  <Avatar className="w-16 h-16 border-2 border-background">
                    <AvatarImage src={item.photo} className="object-cover" />
                    <AvatarFallback>{item.student.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="absolute top-4 right-4 capitalize z-20">
                   <Badge variant="secondary" className="bg-background/80 backdrop-blur-md flex items-center gap-1.5 px-3 py-1 border-none shadow-sm font-bold">
                     <Award className="w-3.5 h-3.5 text-warning" />
                     {item.category}
                   </Badge>
                </div>
              </div>
              
                <div className="p-6 pt-14 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-black leading-tight group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]">{item.event}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <p className="text-sm font-bold text-muted-foreground">{item.student}</p>
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                        <p className="text-xs font-black text-primary/70 tracking-tighter uppercase">{item.rollNo}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1 p-3 rounded-2xl bg-muted/30 border border-border/50">
                        <div className="flex items-center gap-2">
                          <Trophy className="w-3.5 h-3.5 text-warning" />
                          <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest leading-none">Position</p>
                        </div>
                        <p className="text-sm font-bold truncate">{item.position}</p>
                      </div>
                      <div className="flex flex-col gap-1 p-3 rounded-2xl bg-muted/30 border border-border/50">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-success" />
                          <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest leading-none">Date</p>
                        </div>
                        <p className="text-sm font-bold truncate">{item.dates.split(',')[0]}</p>
                      </div>
                    </div>
                  </div>
  
                  <div className="flex items-center gap-3 pt-6 mt-6 border-t border-border/50">
                  <Button variant="outline" className="flex-1 rounded-xl h-11 border-border/50 hover:bg-muted font-bold" asChild>
                    <a href={item.certificate} target="_blank" rel="noreferrer">
                      <Eye className="w-4 h-4 mr-2" />
                      View Proof
                    </a>
                  </Button>
                  
                  {item.status === 'pending' && (
                    <div className="flex gap-2">
                       <Button 
                        variant="success" 
                        size="icon"
                        onClick={() => handleAction(item.id, 'approve')}
                        className="w-11 h-11 rounded-xl shadow-lg shadow-success/20 hover:scale-105 active:scale-95 transition-all"
                       >
                         <CheckCircle className="w-5 h-5" />
                       </Button>
                       <Button 
                        variant="destructive" 
                        size="icon"
                        onClick={() => handleAction(item.id, 'reject')}
                        className="w-11 h-11 rounded-xl shadow-lg shadow-destructive/20 hover:scale-105 active:scale-95 transition-all"
                       >
                         <XCircle className="w-5 h-5" />
                       </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
