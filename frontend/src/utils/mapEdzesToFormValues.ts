import { Edzes, EdzesFormValues } from "@/types/edzes";

export const mapEdzesToFormValues = (edzes: Edzes): EdzesFormValues => ({
  edzes_id: edzes.edzes_id,
  edzes_neve: edzes.edzes_neve,
  datum: edzes.datum,
  ido: edzes.ido,
  user_id: edzes.user_id || 0,
  gyakorlatok: edzes.gyakorlatok.map((gy) => ({
    gyakorlat_id: gy.gyakorlat_id,
    // Ha a gyakorlat adatai nestelve vannak, alkalmazd ezt:
    gyakorlat_neve: gy.gyakorlat?.gyakorlat_neve || gy.gyakorlat_neve,
    gyakorlat_leiras: gy.gyakorlat?.gyakorlat_leiras,
    szettek: gy.szettek || [],
    previous_history: (gy as any).previous_history || [],
    fo_izomcsoport: gy.gyakorlat?.fo_izomcsoport, // vagy gy.fo_izomcsoport, ha közvetlenül van
    izomcsoportok: gy.gyakorlat?.izomcsoportok.map((izom) => izom.izomcsoport_id),
  })),
});
