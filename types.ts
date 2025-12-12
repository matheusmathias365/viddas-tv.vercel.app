export enum LayoutType {
  SPLIT_LEFT = 'SPLIT_LEFT', // Image Left, Text Right
  SPLIT_RIGHT = 'SPLIT_RIGHT', // Text Left, Image Right
  OVERLAY = 'OVERLAY', // Full image with text overlay
  CENTERED = 'CENTERED', // Centered text, icon/minimal background
  INFO_GRID = 'INFO_GRID' // For listing multiple items (services/doctors)
}

export interface SlideData {
  id: number;
  layout: LayoutType;
  title: string;
  subtitle?: string;
  description?: string;
  items?: string[]; // List items for grid view
  imageUrl?: string;
  accentColor?: string; // Optional override
  duration?: number; // Optional custom duration for the slide in ms
}