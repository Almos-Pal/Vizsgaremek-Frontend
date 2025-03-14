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
  isFinalized?: boolean;
  isTemplate?: boolean;
}

export interface EdzesTenDays {
  edzes_id: number;
  edzes_neve: string;
  datum: Date;
  user_id?: number;
  ido: number;
  edzestervek?: number[];
  gyakorlatok: GyakorlatWithSets[];
  cardiok?: number[];
  isFinalized?: boolean;
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
    gyakorlat_leiras?: string;
    szettek: {
      set_szam?: number;
      weight: number;
      reps: number;
    }[];
    previous_history?: PrevHistory[];
    fo_izomcsoport?: number;
    izomcsoportok?: number[];
  }[];
}

export interface GyakorlatWithSets {
  edzes_id: number;
  gyakorlat_id: number;
  gyakorlat: Gyakorlat;
  szettek: {
    set_szam?: number;
    weight: number;
    reps: number;
  }[];
  total_sets: number;
}
export interface edzesGyakorlat {
  eszkoz: string;
  fo_izomcsoport: number;
  gyakorlat_id: number;
  gyakorlat_leiras: string;
  gyakorlat_neve: string;
  izomcsoportok: number[]
  user_id: number;
}


export interface IzomcsoportCounts {
  [key: number]: number;
}


export interface EdzesMetaData {
  izomcsoportCounts: IzomcsoportCounts;
  totalWeight: number;
}


export interface EdzesStatsResponse {
  items: Edzes[];
  meta: EdzesMetaData;
}