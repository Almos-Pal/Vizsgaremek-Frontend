import FlagValidator from "./flagValidator";

function groupIzomcsoportCounts(
  izomcsoportCounts: Record<string, number>
): Array<{ name: string; value: number; color: string }> {
  const result: Record<string, { value: number; color: string }> = {};

  for (const [muscleIdStr, count] of Object.entries(izomcsoportCounts)) {
    const muscleId = parseInt(muscleIdStr, 10);
    const flags = FlagValidator([muscleId]);

    if (flags.length > 0) {
      const { value: groupName, background } = flags[0]; // Use 'background' instead of 'color'

      if (!result[groupName]) {
        result[groupName] = { value: 0, color: background }; // Assign background as color
      }
      result[groupName].value += count;
    }
  }

  return Object.entries(result).map(([groupName, data]) => ({
    name: groupName,
    value: data.value,
    color: data.color,
  }));
}

export default groupIzomcsoportCounts;
