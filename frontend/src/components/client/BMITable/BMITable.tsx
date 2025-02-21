import { Text } from "@/components/server";
import React from "react";

export default function BmiTable({ bmi }: { bmi: number | typeof NaN }) {
console.log("bmi", bmi);
console.log("typeof bmi", typeof bmi);
  const bmiCategories = [
    { label: "Súlyos soványság", range: "<16", min: -Infinity, max: 16, color: "var(--color-error)" },
    { label: "Mérsékelt soványság", range: "16,0 - 16,99", min: 16, max: 16.99, color: "var(--color-error)" },
    { label: "Enyhe soványság", range: "17,0 - 18,49", min: 17, max: 18.49, color: "var(--color-warning)" },
    { label: "Normális testsúly", range: "18,5 - 24,99", min: 18.5, max: 24.99, color: "var(--color-success)" },
    { label: "Túlsúly", range: "25,0 - 29,99", min: 25, max: 29.99, color: "var(--color-warning)" },
    { label: "I. fokú elhízás", range: "30,0 - 34,99", min: 30, max: 34.99, color: "var(--color-error)" },
    { label: "II. fokú elhízás", range: "35,0 - 39,99", min: 35, max: 39.99, color: "var(--color-error)" },
    { label: "III. fokú elhízás", range: ">40", min: 40, max: Infinity, color: "var(--color-error)" },
  ];

  const isInRange = (bmi: number, min: number, max: number) => bmi >= min && bmi <= max;

  return (
    <div className="w-full mx-auto p-2 rounded-lg">
      <div className="text-center mb-4">
        <Text variant="h4">Testtömeg index (BMI)</Text>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="flex flex-col items-center gap-4">
          <Text variant="h5">Ön testtömeg indexe</Text>
            { bmi>= -1 ? (
              bmiCategories.map((category) => (
                isInRange(bmi, category.min, category.max) && (
                  <Text key={category.label} variant="h2" color={category.color}>
                    {bmi.toFixed(2)}
                  </Text>
                )
              ))
            ) : (
              <Text variant="h2" color="var(--color-light)">
                -
              </Text>
            )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          {bmiCategories.map((category, index) => (
            <React.Fragment key={index}>
              <Text color={`${typeof bmi === 'number' && isInRange(bmi, category.min, category.max) ? category.color : 'var(--color-light)'}`} className={`text-left `}>
                {category.label}
              </Text>
              <Text color={`${typeof bmi === 'number' && isInRange(bmi, category.min, category.max) ? category.color : 'var(--color-light)'}`}className={`text-right `}>
                {category.range}
              </Text>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
