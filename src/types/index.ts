export type Theme = 'dark' | 'light';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Computer Vision' | 'Generative AI' | 'Edge Computing' | 'Systems & Data';
  techStack: string[];
  description: string;
  highlights: string[];
  status: 'Active Lab' | 'Production' | 'Research Beta';
  githubUrl: string;
  demoUrl?: string;
  image: string;
  stars: number;
  contributors: string[];
  metrics: { label: string; value: string }[];
}

export interface Event {
  id: string;
  title: string;
  category: 'Hackathons' | 'Workshops' | 'Keynotes' | 'Sprints';
  date: string;
  rawDate: string; // ISO for calendar export
  time: string;
  venue: string;
  mode: 'In-Person (Lab 402, NIET)' | 'Hybrid' | 'Virtual';
  deadline: string;
  registrationUrl?: string;
  status: 'Open' | 'Filling Fast' | 'Completed';
  coverImage: string;
  speakers: { name: string; role: string; org: string }[];
  tags: string[];
  description: string;
  agenda: { time: string; activity: string }[];
}

export interface Member {
  id: string;
  name: string;
  role: string;
  group: 'Mentorship & Advisory' | 'Core Leadership' | 'Research & Engineering';
  department: string;
  year: string;
  bio: string;
  researchInterests: string[];
  github?: string;
  linkedin?: string;
  badges: string[];
  projects: string[];
}

export interface Milestone {
  id: string;
  year: string;
  date: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  metric: string;
  highlightText: string;
}

export interface FocusArea {
  id: string;
  title: string;
  tagline: string;
  description: string;
  coreTopics: string[];
  activeProjects: string[];
  techStack: string[];
  visualMetrics: { label: string; value: string }[];
}

export interface LearningResource {
  id: string;
  title: string;
  category: 'AI/ML' | 'Programming' | 'Data Science' | 'Developer Tools' | 'Workshop Guides';
  type: 'Roadmap' | 'Interactive Guide' | 'Starter Code' | 'Research Paper' | 'Cheatsheet' | 'Workshop Guide';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  author: string;
  link: string;
  readTime: string;
  topics: string[];
}

export interface PassportRecord {
  passportId: string;
  studentId: string;
  name: string;
  branch: string;
  tier: 'Core Fellow' | 'Research Contributor' | 'Junior Builder';
  joinDate: string;
  workshopsAttended: number;
  hackathonWins: number;
  repositoriesContributed: number;
  verifiedBadges: { name: string; date: string; category: string }[];
  signatureHash: string;
}
