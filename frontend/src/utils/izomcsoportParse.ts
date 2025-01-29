export const muscleGroups: Record<number, string> = {
    1: "Combfeszítő izom",
    2: "Vállizom",
    3: "Hasizom",
    4: "Mellizom",
    5: "Combhajlító izom",
    6: "Tricepsz izom",
    7: "Bicepsz izom",
    8: "Széles hátizom",
    9: "Középső hátizom",
    10: "Vádli izom",
    11: "Alsó hátizom",
    12: "Alkar izom",
    13: "Farizom",
    14: "Csuklyás izom",
    15: "Combközelítő izom",
    16: "Combtávolító izom",
    17: "Nyakizom",
  };
  
  /**
   * Function to get the muscle name by ID
   * @param id - The `izomcsoport_id`
   * @returns The corresponding muscle name or a fallback string if not found
   */
   const getMuscleNameById = (id: number): string => {
    return muscleGroups[id] || "Ismeretlen izom";
  };
  export default getMuscleNameById;