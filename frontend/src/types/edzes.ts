export interface Edzes {
    edzes_id: number;
    edzes_neve: string;
    datum: Date;
    user_id?: number;
    ido: number;
    edzestervek: number[];
    gyakrolatok: number[];
    cardiok: number[];
}

export interface EdzesCreate {
    edzes_neve: string;
    datum: Date;
    ido: number;
    edzestervek: number[];
    gyakrolatok: number[];
    cardiok: number[];
}