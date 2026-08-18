export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  client: string;
  role: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  tags: string[];
  link?: string;
  liveUrl?: string;
  youtubeId?: string;
  award?: string;
  featured?: boolean;
  mockupType?: 'desktop' | 'mobile' | 'full';
  stats?: { label: string; value: string }[];
}

export interface Service {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  iconName: string;
  color: string;
}

export interface VisualAd {
  id: string;
  title: string;
  category: string;
  image: string;
  aspectRatio: 'square' | 'portrait' | 'landscape';
  description: string;
}
