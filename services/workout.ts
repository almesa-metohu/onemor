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
