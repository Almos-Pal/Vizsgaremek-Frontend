export interface Gyakorlat {
    
    gyakorlat_id: number;
    gyakorlat_neve: string;
    eszkoz: string;
    fo_izomcsoport: number;
    izomcsoportok: number[];
    gyakorlat_leiras: string;

    gyakorlat: {
        eszkoz: string;
        fo_izomcsoport: number;
        gyakorlat_id: number;
        gyakorlat_leiras: string;
        gyakorlat_neve: string;
        izomcsoportok: Array<{
            gyakorlat_id: number;
            izomcsoport_id: number;
            izomcsoport: Record<string, any>;
        }>;
    };
    previous_history: any[];
    szettek: Array<{
        id: number;
        edzes_id: number;
        gyakorlat_id: number;
        set_szam: number;
        weight: number;
        reps: number;
    }>;
    total_sets: number;
}

export interface GyakorlatCreate {
    fo_izomcsoport: number;
    izomcsoportok: number[];
    gyakorlat_neve: string;
    gyakorlat_leiras?: string;
    eszkoz?: string;
}