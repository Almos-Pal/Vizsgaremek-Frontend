import { Gyakorlat, GyakorlatCreate } from './gyakorlat';

export interface Edzes {
    edzes_id: number;
    edzes_neve: string;
    datum: Date;
    user_id?: number;
    ido: number;
    edzestervek?: number[];
    gyakorlatok: Gyakorlat[];
    cardiok?: number[];
}

export interface EdzesCreate {
    edzes_neve: string;
    datum?: Date;
    ido?: number;
    user_id: number;
    gyakorlatok?: any[]; 
}

interface PrevHistory {
  id: number;
  user_id: number;
  gyakorlat_id: number;
  weight: number;
  reps: number;
  date: Date;
}

export interface EdzesFormValues {
    edzes_id?: number; 
    edzes_neve: string;
    datum: Date;
    ido: number;
    user_id: number;

    gyakorlatok: {
  
      gyakorlat_id?: number;
      gyakorlat_neve: string;
      szettek: {

        set_szam?: number;
        weight: number;
        reps: number;
      }[];
      previous_history?: PrevHistory[];
    }[];
  }
  