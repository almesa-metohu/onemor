import { IVideo } from "./video";

export interface IRoutine {
    duration: number;
    exercise_id: string;
    id: string;
    name: string;
    position: number;
    repetitions: number;
    rest: number;
    set_id: string;
    video: IVideo;
}