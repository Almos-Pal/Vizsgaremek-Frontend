
import { Edzes, EdzesFormValues } from "@/types/edzes";

export const mapEdzesToFormValues = (edzes: Edzes): EdzesFormValues => ({
  edzes_id: edzes.edzes_id,
  edzes_neve: edzes.edzes_neve,
  datum: edzes.datum,
  ido: edzes.ido,
  user_id: edzes.user_id || 0,
  gyakorlatok: edzes.gyakorlatok.map((gy) => ({
    gyakorlat_id: gy.gyakorlat_id,
    gyakorlat_neve: gy.gyakorlat?.gyakorlat_neve,
    szettek: gy.szettek || [],
    previous_history: (gy as any).previous_history || [], 
    gyakorlat_leiras: gy.gyakorlat?.gyakorlat_leiras,
  })),
});
