import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Calendar, 
  Award, 
  BookOpen,
  Edit2,
  ShieldCheck,
  Building2,
  GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';

export default function PersonalDetails() {
  const { user } = useAuth();

  const tutorInfo = {
    staffId: 'STF1024',
    designation: 'Assistant Professor & Tutor',
    department: 'Computer Science and Engineering',
    joiningDate: 'June 15, 2018',
    specialization: 'Artificial Intelligence & Machine Learning',
    office: 'Block A, Room 302',
    address: '42, Garden Street, Chennai - 600025',
    education: [
      { degree: 'Ph.D in Computer Science', institution: 'Anna University', year: '2022' },
      { degree: 'M.E in Software Engineering', institution: 'PSG College of Technology', year: '2016' }
    ]
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold">Personal Profile 👤</h1>
          <p className="text-muted-foreground">Manage your department profile and professional details</p>
        </div>
        <Button variant="gradient" className="shadow-lg shadow-primary/20">
          <Edit2 className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <Card className="glass-card overflow-hidden border-none shadow-xl">
            <div className="h-32 bg-gradient-to-br from-primary via-accent to-secondary relative">
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                <div className="p-1.5 bg-background rounded-full shadow-2xl">
                  <Avatar className="w-24 h-24 border-4 border-background">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
            <div className="pt-16 pb-8 px-6 text-center">
              <h2 className="text-2xl font-bold">{user?.name}</h2>
              <p className="text-primary font-medium mb-4">{tutorInfo.designation}</p>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
                  {tutorInfo.staffId}
                </Badge>
                <Badge variant="secondary" className="bg-success/10 text-success border-none">
                  Active
                </Badge>
              </div>
              <div className="space-y-4 text-left border-t border-border pt-6">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <span className="text-muted-foreground">{user?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <span className="text-muted-foreground">+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <span className="text-muted-foreground">{tutorInfo.office}</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Detailed Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Work/Department Info */}
          <Card className="glass-card p-6 border-none shadow-lg">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Professional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Department</p>
                <p className="font-semibold">{tutorInfo.department}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Joining Date</p>
                <p className="font-semibold">{tutorInfo.joiningDate}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Specialization</p>
                <p className="font-semibold">{tutorInfo.specialization}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Verification Status</p>
                <div className="flex items-center gap-2 text-success font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  Verified Faculty
                </div>
              </div>
            </div>
          </Card>

          {/* Education Info */}
          <Card className="glass-card p-6 border-none shadow-lg">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-accent" />
              Education History
            </h3>
            <div className="space-y-6">
              {tutorInfo.education.map((edu, index) => (
                <div key={index} className="flex gap-4 relative">
                  {index !== tutorInfo.education.length - 1 && (
                    <div className="absolute left-2.5 top-8 bottom-0 w-0.5 bg-border" />
                  )}
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center z-10 flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  </div>
                  <div>
                    <p className="font-bold text-base leading-none">{edu.degree}</p>
                    <p className="text-sm text-muted-foreground mt-1">{edu.institution} • {edu.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Contact Details Full */}
          <Card className="glass-card p-6 border-none shadow-lg">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-secondary" />
              Contact Details
            </h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-border/50 bg-muted/30">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-2">Permanent Address</p>
                <p className="text-sm font-medium leading-relaxed">{tutorInfo.address}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
