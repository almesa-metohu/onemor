import { IRoutine } from "./routine";
import { IUser } from "./user";
import { IVideo } from "./video";

export interface IWorkout {
  id: string;
  description: string;
  difficulty: number;
  is_favorite: boolean;
  name: string;
  status: string;
  target_audience: string;
  total_duration: number;
  trainer_id: string;
  trainer_name: string;
  type: string;
  routines: IRoutine[];
  user: IUser;
  video_cover: IVideo;
}

export function getDifficultyLabel(difficulty: number): string {
  switch (difficulty) {
    case 0:
      return 'BEGINNER';
    case 1:
      return 'INTERMEDIATE';
    case 2:
      return 'ADVANCED';
    default:
      return 'UNKNOWN';
  }
}