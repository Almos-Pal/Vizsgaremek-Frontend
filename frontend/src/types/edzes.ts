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
}


