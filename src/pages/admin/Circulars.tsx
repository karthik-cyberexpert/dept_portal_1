import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, Plus, Edit2, Trash2, Pin, Send, Eye,
  Calendar, Users, FileText, Search, Filter,
  Megaphone, AlertCircle, Info, CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Circular {
  id: string;
  title: string;
  content: string;
  category: 'announcement' | 'event' | 'exam' | 'holiday' | 'urgent';
  audience: string[];
  publishedAt: string;
  expiresAt: string;
  isPinned: boolean;
  status: 'draft' | 'published' | 'expired';
  views: number;
  attachments: number;
}

const circulars: Circular[] = [
  { id: '1', title: 'Internal Assessment 2 Schedule', content: 'IA2 examinations for all 4th year students will be held from March 25-30, 2024. Detailed timetable attached.', category: 'exam', audience: ['4th Year'], publishedAt: '2024-03-18', expiresAt: '2024-03-30', isPinned: true, status: 'published', views: 245, attachments: 1 },
  { id: '2', title: 'Technical Symposium - TechVista 2024', content: 'Annual technical symposium TechVista 2024 will be held on April 5-6. All students are encouraged to participate.', category: 'event', audience: ['All Students'], publishedAt: '2024-03-15', expiresAt: '2024-04-06', isPinned: true, status: 'published', views: 512, attachments: 2 },
  { id: '3', title: 'Library Timing Changes', content: 'Library will remain open from 8 AM to 10 PM during exam period. Weekend hours: 9 AM to 6 PM.', category: 'announcement', audience: ['All Students', 'All Faculty'], publishedAt: '2024-03-14', expiresAt: '2024-04-30', isPinned: false, status: 'published', views: 189, attachments: 0 },
  { id: '4', title: 'Holi Holiday Notice', content: 'The institution will remain closed on March 25, 2024 on account of Holi. Classes will resume on March 26.', category: 'holiday', audience: ['All Students', 'All Faculty', 'All Staff'], publishedAt: '2024-03-20', expiresAt: '2024-03-26', isPinned: false, status: 'published', views: 320, attachments: 0 },
  { id: '5', title: 'URGENT: Lab Server Maintenance', content: 'Computer Lab servers will undergo maintenance on March 22, 2024 from 6 PM to 10 PM. Plan accordingly.', category: 'urgent', audience: ['All Students', 'CS Faculty'], publishedAt: '2024-03-21', expiresAt: '2024-03-22', isPinned: true, status: 'published', views: 156, attachments: 0 },
  { id: '6', title: 'Placement Drive - Infosys', content: 'Infosys will be conducting campus placement drive on April 10, 2024. Eligible students please register.', category: 'event', audience: ['4th Year', '3rd Year'], publishedAt: '', expiresAt: '2024-04-10', isPinned: false, status: 'draft', views: 0, attachments: 1 },
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'urgent': return <AlertCircle className="w-4 h-4" />;
    case 'exam': return <FileText className="w-4 h-4" />;
    case 'event': return <Megaphone className="w-4 h-4" />;
    case 'holiday': return <Calendar className="w-4 h-4" />;
    default: return <Info className="w-4 h-4" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'urgent': return 'bg-red-500/20 text-red-400 border-red-500/30';
    case 'exam': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    case 'event': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'holiday': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    default: return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'published': return 'bg-emerald-500/20 text-emerald-400';
    case 'draft': return 'bg-gray-500/20 text-gray-400';
    case 'expired': return 'bg-red-500/20 text-red-400';
    default: return 'bg-muted text-muted-foreground';
  }
};

export default function Circulars() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newCircular, setNewCircular] = useState({
    title: '',
    content: '',
    category: 'announcement',
    audience: [] as string[],
    isPinned: false,
    expiresAt: '',
  });

  const stats = {
    total: circulars.length,
    published: circulars.filter(c => c.status === 'published').length,
    pinned: circulars.filter(c => c.isPinned).length,
    drafts: circulars.filter(c => c.status === 'draft').length,
  };

  const filteredCirculars = circulars.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || c.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const pinnedCirculars = filteredCirculars.filter(c => c.isPinned);
  const unpinnedCirculars = filteredCirculars.filter(c => !c.isPinned);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Circulars & Notices
          </h1>
          <p className="text-muted-foreground mt-1">Manage announcements and notifications</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90">
              <Plus className="w-4 h-4" />
              New Circular
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-card border-white/10 max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Circular</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input 
                  placeholder="Enter circular title..."
                  value={newCircular.title}
                  onChange={(e) => setNewCircular({ ...newCircular, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Content</Label>
                <Textarea 
                  placeholder="Enter circular content..."
                  rows={4}
                  value={newCircular.content}
                  onChange={(e) => setNewCircular({ ...newCircular, content: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select 
                    value={newCircular.category} 
                    onValueChange={(value) => setNewCircular({ ...newCircular, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="announcement">Announcement</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                      <SelectItem value="exam">Exam</SelectItem>
                      <SelectItem value="holiday">Holiday</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Expires On</Label>
                  <Input 
                    type="date"
                    value={newCircular.expiresAt}
                    onChange={(e) => setNewCircular({ ...newCircular, expiresAt: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div>
                  <Label>Pin this circular</Label>
                  <p className="text-xs text-muted-foreground">Pinned circulars appear at the top</p>
                </div>
                <Switch 
                  checked={newCircular.isPinned}
                  onCheckedChange={(checked) => setNewCircular({ ...newCircular, isPinned: checked })}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>Save as Draft</Button>
                <Button className="gap-2">
                  <Send className="w-4 h-4" />
                  Publish
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Circulars', value: stats.total, icon: Bell, color: 'from-blue-500 to-cyan-500' },
          { label: 'Published', value: stats.published, icon: CheckCircle2, color: 'from-emerald-500 to-teal-500' },
          { label: 'Pinned', value: stats.pinned, icon: Pin, color: 'from-amber-500 to-orange-500' },
          { label: 'Drafts', value: stats.drafts, icon: FileText, color: 'from-purple-500 to-pink-500' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-card border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
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
            placeholder="Search circulars..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="announcement">Announcement</SelectItem>
            <SelectItem value="event">Event</SelectItem>
            <SelectItem value="exam">Exam</SelectItem>
            <SelectItem value="holiday">Holiday</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Circulars List */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All ({filteredCirculars.length})</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-4">
          {/* Pinned Section */}
          {pinnedCirculars.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                <Pin className="w-4 h-4" />
                Pinned
              </h3>
              <AnimatePresence>
                {pinnedCirculars.map((circular, index) => (
                  <CircularCard key={circular.id} circular={circular} index={index} />
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Other Circulars */}
          {unpinnedCirculars.length > 0 && (
            <div className="space-y-3">
              {pinnedCirculars.length > 0 && (
                <h3 className="text-sm font-semibold text-muted-foreground">Recent</h3>
              )}
              <AnimatePresence>
                {unpinnedCirculars.map((circular, index) => (
                  <CircularCard key={circular.id} circular={circular} index={index} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </TabsContent>

        <TabsContent value="published">
          <div className="space-y-3 mt-4">
            {filteredCirculars.filter(c => c.status === 'published').map((circular, index) => (
              <CircularCard key={circular.id} circular={circular} index={index} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="drafts">
          <div className="space-y-3 mt-4">
            {filteredCirculars.filter(c => c.status === 'draft').length === 0 ? (
              <Card className="glass-card border-white/10">
                <CardContent className="p-8 text-center">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No drafts found</p>
                </CardContent>
              </Card>
            ) : (
              filteredCirculars.filter(c => c.status === 'draft').map((circular, index) => (
                <CircularCard key={circular.id} circular={circular} index={index} />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function CircularCard({ circular, index }: { circular: Circular; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className={`glass-card border-white/10 hover:border-white/20 transition-all ${circular.isPinned ? 'ring-1 ring-amber-500/30' : ''}`}>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <div className={`p-3 rounded-xl ${getCategoryColor(circular.category).split(' ')[0]}`}>
                {getCategoryIcon(circular.category)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {circular.isPinned && <Pin className="w-4 h-4 text-amber-400" />}
                  <h3 className="font-semibold">{circular.title}</h3>
                  <Badge className={getCategoryColor(circular.category)}>
                    {circular.category.charAt(0).toUpperCase() + circular.category.slice(1)}
                  </Badge>
                  <Badge className={getStatusBadge(circular.status)}>
                    {circular.status.charAt(0).toUpperCase() + circular.status.slice(1)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{circular.content}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {circular.audience.join(', ')}
                  </span>
                  {circular.publishedAt && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Published: {circular.publishedAt}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {circular.views} views
                  </span>
                  {circular.attachments > 0 && (
                    <span className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      {circular.attachments} attachment{circular.attachments > 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="hover:bg-primary/20">
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-destructive/20 text-destructive">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
