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
    gyakorlatok?: any[]; // Add the appropriate type for gyakorlatok
}

export interface EdzesFormValues {
    edzes_id?: number; // only if editing an existing edzés
    edzes_neve: string;
    datum: Date;
    ido: number;
    user_id: number;
    // you may include other top-level fields (e.g. datum, ido)
    gyakorlatok: {
      // You might store the gyakorlat id if already created on backend
      // For new gyakorlatok, you may leave it undefined
      gyakorlat_id?: number;
      gyakorlat_neve: string;
      szettek: {
        // Each set
        set_szam?: number;
        weight: number;
        reps: number;
      }[];
    }[];
  }
  