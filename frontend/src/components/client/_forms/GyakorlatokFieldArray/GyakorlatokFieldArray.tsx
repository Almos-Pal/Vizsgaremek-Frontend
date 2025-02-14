import { FieldArray, useFormikContext } from 'formik';
import React from 'react';
import { Input } from "../../_inputs";
import Button from "../../Button/Button";
import FormField from "../FormField/FormField";
import styles from './GyakorlatFieldArray.module.scss';
import IconButton from "../../IconButton/IconButton";
import { Text } from "@/components/server";
import useEdzes from '@/hooks/useEdzes';

interface Gyakorlat {
    gyakorlat_id?: number; // May be undefined if newly added
    gyakorlat_neve: string;
    szettek: {
      set_szam?: number;
      weight: number;
      reps: number;
    }[];
  }
  
  interface GyakorlatokFieldArrayProps {
    index: number;
    gyakorlat: Gyakorlat;
    arrayHelpers: any;
  }

const GyakorlatokFieldArray: React.FC<GyakorlatokFieldArrayProps> = ({ index, gyakorlat, arrayHelpers }) => {


    const { values } = useFormikContext<any>();

    const { mutate: addSetToGyakorlatInEdzes } = useEdzes.addSetToGyakorlatInEdzes();

    const handleGyakorlatBefejezese = () => {
        // Make sure edzes_id exists in the form values and that the exercise has an id
        if (!values.edzes_id) {
          console.error("edzes_id not found in form values.");
          return;
        }
        if (!gyakorlat.gyakorlat_id) {
          console.error("gyakorlat_id not found for this exercise.");
          return;
        }
        // Assume the current user ID is available (here hardcoded as 0)
        const userId = 5; //IMPORTANT CHANGE IN THE FUTURE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        
        // Iterate over each set in the exercise and add it via the API
        gyakorlat.szettek.forEach((set, setIndex) => {
          const setDetails = {
            set_szam: set.set_szam || setIndex + 1,
            weight: set.weight,
            reps: set.reps,
          };
    
          addSetToGyakorlatInEdzes(
            {
              edzes_id: values.edzes_id,
              gyakorlatId: gyakorlat.gyakorlat_id,
              userId,
              setDetails,
            },
            {
              onSuccess: () => {
                console.log(`Set ${setDetails.set_szam} added successfully.`);
              },
              onError: (error) => {
                console.error("Error adding set:", error);
              },
            }
          );
        });
      };


      return (
        <div className={styles["edzes-block"]}>
          <div className={styles["edzes-header"]}>
            <FormField
              name={`gyakorlatok[${index}].gyakorlat_neve`}
              placeholder="Gyakorlat neve"
              as={Input}
            />
          </div>
    
          <FieldArray name={`gyakorlatok[${index}].szettek`}>
            {(setHelpers) => (
              <div className={styles["set-container"]}>
                <table className={styles["set-table"]}>
                  <thead>
                    <tr>
                      <th>
                        <Text>Set</Text>
                      </th>
                      <th>
                        <Text>Súly</Text>
                      </th>
                      <th>
                        <Text>Reps</Text>
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {gyakorlat.szettek.map((set, setIndex) => (
                      <tr key={setIndex}>
                        <td>
                          <Text variant="body-16">{setIndex + 1}</Text>
                        </td>
                        <td>
                          <FormField
                            name={`gyakorlatok[${index}].szettek[${setIndex}].weight`}
                            placeholder="KG"
                            type="number"
                            as={Input}
                          />
                        </td>
                        <td>
                          <FormField
                            name={`gyakorlatok[${index}].szettek[${setIndex}].reps`}
                            placeholder="Ism."
                            type="number"
                            as={Input}
                          />
                        </td>
                        <td>
                          <IconButton
                            icon="MinusIcon"
                            color="secondary"
                            onClick={() => setHelpers.remove(setIndex)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
    
                <Button
                  type="button"
                  onClick={() => setHelpers.push({ weight: 0, reps: 0 })}
                  color="secondary"
                >
                  Set Hozzáadása
                </Button>
              </div>
            )}
          </FieldArray>
    
          <div className={styles["exercise-actions"]}>
            <Button
              type="button"
              onClick={() => arrayHelpers.remove(index)}
              color="secondary"
            >
              Gyakorlat Törlése
            </Button>
            <Button
              type="button"
              onClick={handleGyakorlatBefejezese}
              color="primary"
            >
              Gyakorlat Befejezése
            </Button>
          </div>
        </div>
      );
};

export default GyakorlatokFieldArray;
