import { FieldArray, useFormikContext } from 'formik';
import React, { useEffect } from 'react';
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
    id?: number;
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
  const { mutate: deleteGyakorlatFromEdzes } = useEdzes.deleteGyakorlatFromEdzes();
  const { mutate: updateSetInGyakorlatInEdzes } = useEdzes.updateSetInGyakorlatInEdzes();
  const { mutate: deleteSetFromGyakorlatInEdzes } = useEdzes.deleteSetFromGyakorlatInEdzes();


  const handleAddSet = () => {
    if (!values.edzes_id || !gyakorlat.gyakorlat_id) {
      console.error("Missing required IDs for adding set");
      return;
    }
    const userId = 1; // Replace with your actual user ID
    const newSetData = { weight: 0, reps: 0 };
    const setNumber = gyakorlat.szettek.length + 1;

    addSetToGyakorlatInEdzes(
      {
        edzes_id: values.edzes_id,
        gyakorlatId: gyakorlat.gyakorlat_id,
        userId,
        setDetails: { set_szam: setNumber, ...newSetData },
      },
      {
        onSuccess: (returnedSet) => {
          console.log(`Set ${setNumber} added successfully.`);
          // Push the returned set (which should include an id) into the form state.
          arrayHelpers.push(returnedSet);
        },
        onError: (error) => {
          console.error("Error adding set:", error);
        },
      }
    );
  };

  const handleDeleteSet = (setIndex: number, setItem: any) => {
    if (!values.edzes_id || !gyakorlat.gyakorlat_id) {
      console.error("Missing required IDs for deleting set");
      return;
    }

    const userId = 1; // Replace with actual user id
    if (setItem.id) {
      deleteSetFromGyakorlatInEdzes(
        {
          edzes_id: values.edzes_id,
          gyakorlatId: gyakorlat.gyakorlat_id,
          setId: setItem.id,
          userId,
        },
        {
          onSuccess: () => {
            console.log(`Set ${setItem.set_szam} deleted successfully.`);
            arrayHelpers.remove(setIndex);
          },
          onError: (error) => {
            console.error("Error deleting set:", error);
          },
        }
      );
    } else {
      // If the set doesn't have an id, simply remove it.
      arrayHelpers.remove(setIndex);
    }
  };


  const handleGyakorlatBefejezese = () => {
    if (!values.edzes_id || !gyakorlat.gyakorlat_id) {
      console.error("Missing required IDs for finalizing exercise");
      return;
    }
    const userId = 1; // Replace with actual user id
    // For each set that has been added (with an id), update its values on the backend.
    gyakorlat.szettek.forEach((set, setIndex) => {
      if (set.id) {
        const updateDetails = {
          weight: set.weight,
          reps: set.reps,
        };
        updateSetInGyakorlatInEdzes(
          {
            edzes_id: values.edzes_id,
            gyakorlatId: gyakorlat.gyakorlat_id!,
            setId: set.id,
            userId,
            updateDetails,
          },
          {
            onSuccess: () => {
              console.log(`Set ${set.set_szam} updated successfully.`);
            },
            onError: (error) => {
              console.error("Error updating set:", error);
            },
          }
        );
      }
    });
  };


  const handleDeleteGyakorlat = () => {
    if (!values.edzes_id || !gyakorlat.gyakorlat_id) {
      console.error("Missing required IDs");
      return;
    }

    const userId = 1; // HARD CODED REPLCACE WITH THE REAL USERID IN THE FUTURE

    console.log('edzesId: ',values.edzes_id,"gyakorlatId: " ,gyakorlat.gyakorlat_id,'userId: ', userId);
    deleteGyakorlatFromEdzes(
      {
        edzesId: values.edzes_id,
        gyakorlatId: gyakorlat.gyakorlat_id,
        userId,
      },
      {
        onSuccess: () => {
          console.log(`Gyakorlat ${gyakorlat.gyakorlat_id} deleted successfully.`);
          arrayHelpers.remove(index);
        },
        onError: (error) => {
          console.error("Error deleting gyakorlat:", error);
        },
      }
    );
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
                {(gyakorlat.szettek || []).map((set, setIndex) => (
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
                        isSet
                      />
                    </td>
                    <td>
                      <FormField
                        name={`gyakorlatok[${index}].szettek[${setIndex}].reps`}
                        placeholder="Ism."
                        type="number"
                        as={Input}
                        isSet
                      />
                    </td>
                    <td>
                      <IconButton
                        icon="MinusIcon"
                        color="secondary"
                        onClick={() => handleDeleteSet(setIndex, set)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Button
              type="button"
              onClick={handleAddSet}
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
          onClick={handleDeleteGyakorlat}

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
