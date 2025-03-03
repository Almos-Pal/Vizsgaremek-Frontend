import { Gyakorlat } from "./gyakorlat";
import { PaginationMeta } from "./meta";

interface History {
  id: number;
  user_id: number;
  gyakorlat_id: number;
  weight: number;
  reps: number;
  date: Date;
}


export interface UserGyakorlatGyakorlat {
  user_id: number;
  gyakorlat_id: number;
  personal_best: number;
  last_weight: number;
  last_reps: number;
  total_sets: number;
  gyakorlat: Gyakorlat;
  history: History[];
}




interface Izomcsoport {
    izomcsoport_id: number;
}

 interface RekordGyakorlat {
    gyakorlat_neve: string;
    fo_izomcsoport: number;
    izomcsoportok: Izomcsoport[];
}

export interface RecordItem {
    personal_best: number;
    gyakorlat: RekordGyakorlat;
}

interface Meta {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}

export interface ExerciseData {
    items: RecordItem[];
    meta: Meta;
}
