import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, Phone, MapPin, Building2, Calendar,
  Edit2, Camera, Save, Shield, Award, BookOpen,
  Clock, Activity, Key, LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { getFaculty, getStudents, getTutors, Faculty, Student, Tutor } from '@/lib/data-store';

export default function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    designation: '',
    department: '',
    employeeId: '',
    joinDate: '',
    qualification: '',
    specialization: '',
    address: '',
    bio: '',
  });

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        // For admin, use default admin profile data
        setProfile({
          name: user.name,
          email: user.email,
          phone: '+91 98765 43210', // Default admin phone
          designation: 'Administrator',
          department: user.department || 'Administration',
          employeeId: 'ADMIN001',
          joinDate: '2010-06-15',
          qualification: 'System Administrator',
          specialization: 'System Management',
          address: 'Tamil Nadu Engineering College, Chennai - 600001',
          bio: 'System Administrator with extensive experience in managing educational systems. Currently serving as the Administrator for the Academic Management System.',
        });
      } else if (user.role === 'faculty') {
        // For faculty, fetch real faculty data
        const facultyList = getFaculty();
        const faculty = facultyList.find(f => f.email === user.email);
        if (faculty) {
          setProfile({
            name: faculty.name,
            email: faculty.email,
            phone: faculty.phone,
            designation: faculty.designation,
            department: faculty.specialization,
            employeeId: faculty.employeeId,
            joinDate: faculty.dateOfJoining,
            qualification: faculty.qualification,
            specialization: faculty.specialization,
            address: faculty.address,
            bio: `Experienced academician with ${faculty.experience} years in teaching and research. Currently serving as a ${faculty.designation} for ${faculty.specialization}.`,
          });
        }
      } else if (user.role === 'tutor') {
        // For tutor, fetch real tutor data
        const tutorList = getTutors();
        const tutor = tutorList.find(t => t.email === user.email);
        if (tutor) {
          setProfile({
            name: tutor.name,
            email: tutor.email,
            phone: tutor.phone,
            designation: tutor.designation,
            department: 'Class In-Charge',
            employeeId: tutor.id,
            joinDate: '2020-01-01', // Default date
            qualification: 'Class Management',
            specialization: `Tutor for Batch ${tutor.batch}, Section ${tutor.section}`,
            address: 'Tamil Nadu Engineering College, Chennai - 600001',
            bio: `Class In-Charge for Batch ${tutor.batch}, Section ${tutor.section} with responsibility for student mentoring and academic guidance.`,
          });
        }
      } else if (user.role === 'student') {
        // For student, fetch real student data
        const studentList = getStudents();
        const student = studentList.find(s => s.email === user.email);
        if (student) {
          setProfile({
            name: student.name,
            email: student.email,
            phone: student.phone,
            designation: 'Student',
            department: student.programme,
            employeeId: student.rollNumber,
            joinDate: student.createdAt.split('T')[0],
            qualification: 'Undergraduate Student',
            specialization: student.class,
            address: student.address,
            bio: `Student enrolled in ${student.programme} program. Currently in ${student.year} year, ${student.semester} semester, Section ${student.section}.`,
          });
        }
      }
    }
  }, [user]);

  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  // Generate recent activities based on user role
  const recentActivities = [];
  if (user) {
    if (user.role === 'admin') {
      recentActivities.push(
        { action: 'Approved marks for CS301', time: '2 hours ago', type: 'approval' },
        { action: 'Published new circular', time: '5 hours ago', type: 'circular' },
        { action: 'Added new faculty member', time: '1 day ago', type: 'user' },
        { action: 'Updated semester dates', time: '2 days ago', type: 'settings' },
        { action: 'Reviewed ECA submission', time: '3 days ago', type: 'approval' },
      );
    } else if (user.role === 'faculty') {
      recentActivities.push(
        { action: 'Updated marks for CS201', time: '1 hour ago', type: 'marks' },
        { action: 'Uploaded notes for CS201', time: '3 hours ago', type: 'notes' },
        { action: 'Created assignment for CS201', time: '1 day ago', type: 'assignment' },
        { action: 'Updated class attendance', time: '2 days ago', type: 'attendance' },
        { action: 'Reviewed student submissions', time: '3 days ago', type: 'review' },
      );
    } else if (user.role === 'tutor') {
      recentActivities.push(
        { action: 'Verified marks for CS301', time: '2 hours ago', type: 'approval' },
        { action: 'Updated student attendance', time: '4 hours ago', type: 'attendance' },
        { action: 'Reviewed leave request', time: '1 day ago', type: 'leave' },
        { action: 'Updated class schedule', time: '2 days ago', type: 'schedule' },
        { action: 'Reviewed student performance', time: '3 days ago', type: 'review' },
      );
    } else if (user.role === 'student') {
      recentActivities.push(
        { action: 'Submitted assignment for CS201', time: '1 hour ago', type: 'assignment' },
        { action: 'Checked marks for CS201', time: '3 hours ago', type: 'marks' },
        { action: 'Downloaded notes for CS201', time: '1 day ago', type: 'notes' },
        { action: 'Updated profile information', time: '2 days ago', type: 'profile' },
        { action: 'Applied for leave', time: '3 days ago', type: 'leave' },
      );
    }
  }

  // Generate stats based on user role
  const stats = [];
  if (user) {
    if (user.role === 'admin') {
      stats.push(
        { label: 'Years of Service', value: '14', icon: Calendar },
        { label: 'Papers Published', value: '52', icon: BookOpen },
        { label: 'Students Mentored', value: '500+', icon: User },
        { label: 'Awards Received', value: '8', icon: Award },
      );
    } else if (user.role === 'faculty') {
      stats.push(
        { label: 'Years of Service', value: profile.joinDate ? (new Date().getFullYear() - new Date(profile.joinDate).getFullYear()).toString() : '5', icon: Calendar },
        { label: 'Classes Handled', value: '4', icon: BookOpen },
        { label: 'Students Taught', value: '120+', icon: User },
        { label: 'Research Papers', value: '12', icon: Award },
      );
    } else if (user.role === 'tutor') {
      stats.push(
        { label: 'Students Mentored', value: '60', icon: User },
        { label: 'Classes Supervised', value: '4', icon: BookOpen },
        { label: 'Batch Year', value: profile.specialization?.includes('20') ? profile.specialization.split(' ')[1] : '2024', icon: Calendar },
        { label: 'Section', value: profile.specialization?.includes('Section') ? profile.specialization.split(' ')[3] : 'A', icon: Award },
      );
    } else if (user.role === 'student') {
      stats.push(
        { label: 'Semester', value: profile.specialization?.includes('Semester') ? profile.specialization.split(' ')[1] : '5', icon: Calendar },
        { label: 'CGPA', value: profile.bio.includes('CGPA') ? profile.bio.split('CGPA: ')[1].split(' ')[0] : '8.5', icon: BookOpen },
        { label: 'Attendance', value: profile.bio.includes('Attendance') ? profile.bio.split('Attendance: ')[1].split('%')[0] : '92%', icon: User },
        { label: 'Backlogs', value: '0', icon: Award },
      );
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="glass-card border-white/10 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary via-accent to-primary opacity-80" />
        <CardContent className="relative pt-0 pb-6">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16">
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-background shadow-xl">
                <AvatarImage src="" />
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-3xl text-white">
                  AK
                </AvatarFallback>
              </Avatar>
              <Button 
                size="icon" 
                className="absolute bottom-0 right-0 rounded-full w-10 h-10 bg-primary hover:bg-primary/90"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold">{profile.name}</h1>
                  <p className="text-muted-foreground">{profile.designation}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className="bg-primary/20 text-primary">Administrator</Badge>
                    <Badge className="bg-emerald-500/20 text-emerald-400">Active</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                      <Button onClick={handleSave} className="gap-2">
                        <Save className="w-4 h-4" />
                        Save Changes
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)} className="gap-2">
                      <Edit2 className="w-4 h-4" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-card border-white/10">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList>
          <TabsTrigger value="details">Profile Details</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    {isEditing ? (
                      <Input 
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      />
                    ) : (
                      <p className="p-2 rounded-lg bg-white/5">{profile.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Employee ID</Label>
                    <p className="p-2 rounded-lg bg-white/5">{profile.employeeId}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    {profile.email}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  {isEditing ? (
                    <Input 
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      {profile.phone}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  {isEditing ? (
                    <Textarea 
                      value={profile.address}
                      onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-start gap-2 p-2 rounded-lg bg-white/5">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                      {profile.address}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Professional Information */}
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  Professional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Designation</Label>
                  <p className="p-2 rounded-lg bg-white/5">{profile.designation}</p>
                </div>
                <div className="space-y-2">
                  <Label>Department</Label>
                  <p className="p-2 rounded-lg bg-white/5">{profile.department}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Qualification</Label>
                    {isEditing ? (
                      <Input 
                        value={profile.qualification}
                        onChange={(e) => setProfile({ ...profile, qualification: e.target.value })}
                      />
                    ) : (
                      <p className="p-2 rounded-lg bg-white/5">{profile.qualification}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Join Date</Label>
                    <p className="p-2 rounded-lg bg-white/5">{profile.joinDate}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Specialization</Label>
                  {isEditing ? (
                    <Input 
                      value={profile.specialization}
                      onChange={(e) => setProfile({ ...profile, specialization: e.target.value })}
                    />
                  ) : (
                    <p className="p-2 rounded-lg bg-white/5">{profile.specialization}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Bio</Label>
                  {isEditing ? (
                    <Textarea 
                      rows={4}
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    />
                  ) : (
                    <p className="p-3 rounded-lg bg-white/5 text-sm text-muted-foreground">
                      {profile.bio}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5"
                  >
                    <div className="p-2 rounded-lg bg-primary/20">
                      <Activity className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {activity.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Dialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
                  <DialogTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:border-primary/30 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Key className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-medium">Change Password</p>
                            <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Change</Button>
                      </div>
                    </motion.div>
                  </DialogTrigger>
                  <DialogContent className="glass-card border-white/10">
                    <DialogHeader>
                      <DialogTitle>Change Password</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Current Password</Label>
                        <Input type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label>New Password</Label>
                        <Input type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label>Confirm New Password</Label>
                        <Input type="password" />
                      </div>
                      <Button className="w-full" onClick={() => {
                        toast.success('Password changed successfully!');
                        setIsChangePasswordOpen(false);
                      }}>
                        Update Password
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-emerald-400" />
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                      </div>
                    </div>
                    <Badge className="bg-emerald-500/20 text-emerald-400">Enabled</Badge>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <LogOut className="w-5 h-5 text-red-400" />
                      <div>
                        <p className="font-medium text-red-400">Sign Out All Devices</p>
                        <p className="text-sm text-muted-foreground">Log out from all active sessions</p>
                      </div>
                    </div>
                    <Button variant="destructive" size="sm">Sign Out</Button>
                  </div>
                </motion.div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Login History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { device: 'Chrome on Windows', location: 'Chennai, IN', time: 'Current session', current: true },
                    { device: 'Safari on iPhone', location: 'Chennai, IN', time: '2 hours ago', current: false },
                    { device: 'Firefox on MacOS', location: 'Bangalore, IN', time: '1 day ago', current: false },
                    { device: 'Chrome on Android', location: 'Chennai, IN', time: '3 days ago', current: false },
                  ].map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                      <div>
                        <p className="font-medium text-sm">{session.device}</p>
                        <p className="text-xs text-muted-foreground">{session.location} • {session.time}</p>
                      </div>
                      {session.current && (
                        <Badge className="bg-emerald-500/20 text-emerald-400">Current</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
