export interface Problem {
  id?: number;
  tourId: number;
  touristId?: number;
  category: ProblemCategory;
  priority: ProblemPriority;
  description: string;
  reportedAt: Date;  
}

export enum ProblemCategory {
  BOOKING = 0,
  ITINERARY = 1,
  GUIDE = 2,
  TRANSPORTATION = 3,
  OTHER = 4
}

export enum ProblemPriority {
  LOW = 0,
  MEDIUM = 1,
  HIGH = 2,
  CRITICAL = 3
}