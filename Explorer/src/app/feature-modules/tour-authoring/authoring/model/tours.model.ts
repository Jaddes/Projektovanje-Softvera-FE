export enum TourStatus {
  Draft = 0,
  Confirmed = 1
}

export enum TourDifficulty {
  Easy = 0,
  Medium = 1,
  Hard = 2
}

export interface Tour {
  id?: number;
  name: string;
  description: string;
  difficulty: TourDifficulty;
  status: TourStatus;
  tags: string[];
  price: number;
}