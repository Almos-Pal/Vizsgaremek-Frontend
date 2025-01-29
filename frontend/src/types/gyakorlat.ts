export interface Gyakorlat {
    eszkoz: string;
    fo_izomcsoport: number;
    gyakorlat_id: number;
    gyakorlat_leiras: string;
    gyakorlat_neve: string;
    izomcsoportok: number[]
}

export interface GyakorlatCreate {
    fo_izomcsoport: number;
    izomcsoportok: number[];
    gyakorlat_neve: string;
    gyakorlat_leiras?: string;
    eszkoz?: string;
}