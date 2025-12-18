export type Language = 'ru' | 'uk' | 'en';

export interface User {
  id: string;
  displayName: string;
  email: string;
  avatar?: string;
  prefix?: UserPrefix;
  balance: number;
  totalEarnings: number;
  joinedAt: Date;
  isAdmin: boolean;
  isOwner: boolean;
  stats: {
    resources: number;
    topics: number;
    messages: number;
    downloads: number;
    timeOnSite: number;
  };
}

export interface UserPrefix {
  id: string;
  label: string;
  color: string;
  icon?: string;
  isSpecial: boolean;
  requirement?: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'plugin' | 'mod' | 'config' | 'shader' | 'build' | 'other';
  author: User;
  price: number;
  downloads: number;
  rating: number;
  trustScore: number;
  minecraftVersions: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  isPaid: boolean;
  fileUrl?: string;
  imageUrl?: string;
}

export interface Topic {
  id: string;
  title: string;
  content: string;
  author: User;
  category: string;
  views: number;
  replies: number;
  tags: string[];
  isPinned: boolean;
  isLocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Ticket {
  id: string;
  title: string;
  status: 'open' | 'in-progress' | 'closed' | 'waiting';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  author: User;
  messages: TicketMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TicketMessage {
  id: string;
  content: string;
  author: User;
  isStaff: boolean;
  createdAt: Date;
  attachments?: string[];
}

export interface Notification {
  id: string;
  type: 'reply' | 'message' | 'subscription' | 'status' | 'resource' | 'purchase';
  title: string;
  content: string;
  isRead: boolean;
  link?: string;
  createdAt: Date;
}

export interface Transaction {
  id: string;
  type: 'purchase' | 'sale' | 'deposit' | 'commission';
  amount: number;
  commission?: number;
  description: string;
  from?: User;
  to?: User;
  resource?: Resource;
  createdAt: Date;
}

export interface Report {
  id: string;
  type: 'resource' | 'topic' | 'message' | 'user';
  targetId: string;
  reason: string;
  description: string;
  reporter: User;
  status: 'pending' | 'reviewing' | 'resolved' | 'rejected';
  createdAt: Date;
}

export interface PlatformStats {
  activeUsers: number;
  totalResources: number;
  totalTopics: number;
  totalDownloads: number;
  platformRevenue: number;
  servicesStatus: {
    generators: boolean;
    resources: boolean;
    forum: boolean;
    support: boolean;
  };
}
