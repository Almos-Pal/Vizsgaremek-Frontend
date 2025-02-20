import { FieldArray, useFormikContext } from 'formik';
import React, { useState } from 'react';
import { Input } from "../../_inputs";
import Button from "../../Button/Button";
import FormField from "../FormField/FormField";
import styles from './GyakorlatFieldArray.module.scss';
import IconButton from "../../IconButton/IconButton";
import { Text } from "@/components/server";
import useEdzes from '@/hooks/useEdzes';
import ConfirmationModal from "../../_modal/ConfirmationModal/ConfirmationModal";


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

interface PrevHistory {
  id: number;
  user_id: number;
  gyakorlat_id: number;
  weight: number;
  reps: number;
  date: Date;
}

interface GyakorlatokFieldArrayProps {
  index: number;
  gyakorlat: Gyakorlat;
  arrayHelpers: any;
  prevHistory: PrevHistory[];
}

const GyakorlatokFieldArray: React.FC<GyakorlatokFieldArrayProps> = ({
  index,
  gyakorlat,
  prevHistory,
  arrayHelpers,
}) => {
  const { values } = useFormikContext<any>();

  const { mutate: addSetToGyakorlatInEdzes } = useEdzes.addSetToGyakorlatInEdzes();
  const { mutate: deleteGyakorlatFromEdzes } = useEdzes.deleteGyakorlatFromEdzes();
  const { mutate: updateSetInGyakorlatInEdzes } = useEdzes.updateSetInGyakorlatInEdzes();
  const { mutate: deleteSetFromGyakorlatInEdzes } = useEdzes.deleteSetFromGyakorlatInEdzes();

  const [isGyakorlatConfirmModalOpen, setIsGyakorlatConfirmModalOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);


  const handleAddSet = () => {
    if (!values.edzes_id || !gyakorlat.gyakorlat_id) {
      console.error("Missing required IDs for adding set");
      return;
    }
    // Create a safe copy of szettek
    const safeSzetek = gyakorlat.szettek || [];
    const userId = 1; // Replace with your actual user ID
    const newSetData = { weight: 0, reps: 0 };
    const setNumber = safeSzetek.length + 1;

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
      // Remove from the form state if there's no id.
      arrayHelpers.remove(setIndex);
    }
  };

  const handleGyakorlatBefejezese = () => {
    if (!values.edzes_id || !gyakorlat.gyakorlat_id) {
      console.error("Missing required IDs for finalizing exercise");
      return;
    }
    const userId = 1; // Replace with actual user id
    const safeSzetek = gyakorlat.szettek || [];

    setIsLocked(true);

    safeSzetek.forEach((set) => {
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

  const handleOpenDeleteConfirm = () => {
    setIsGyakorlatConfirmModalOpen(true);
  };

  const handleDeleteGyakorlatCancel = () => {
    setIsGyakorlatConfirmModalOpen(false);
  };

  // 3) Actually delete if user confirms
  const handleDeleteGyakorlatConfirm = () => {
    setIsGyakorlatConfirmModalOpen(false); // close modal
    if (!values.edzes_id || !gyakorlat.gyakorlat_id) {
      console.error("Missing required IDs");
      return;
    }
    const userId = 1; // Hardcode or get from auth

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
    <div className={`${styles["edzes-block"]} ${isLocked ? styles["locked"] : ""}`}>

      {isLocked && <div className={styles["overlay"]}></div>}
      {/* Gyakorlat name input */}
      <div className={styles["edzes-header"]}>
        <Text style={{ marginLeft: '2rem' }} variant='subtitle-16'>{gyakorlat.gyakorlat_neve}:</Text>
        <IconButton color='secondary' icon={'CancelIcon'} type='button' onClick={handleOpenDeleteConfirm} />
      </div>

      {/* Confirmation Modal (conditionally rendered) */}
      {isGyakorlatConfirmModalOpen && (
        <ConfirmationModal
          visible={isGyakorlatConfirmModalOpen}
          title="Biztos, hogy törölni akarod ezt a gyakorlatot?"
          onConfirm={handleDeleteGyakorlatConfirm}
          onCancel={handleDeleteGyakorlatCancel}
          confirmText="Igen"
          cancelText="Nem"
        />
      )}


      <FieldArray name={`gyakorlatok[${index}].szettek`}>
        {(setHelpers) => {
          // Create safe arrays for both sets and previous history
          const safeSzetek = gyakorlat.szettek || [];
          const safePrevHistory = prevHistory || [];
          const maxRows = Math.max(safePrevHistory.length, safeSzetek.length);

          return (
            <div className={styles["set-container"]}>
              {safeSzetek.length === 0 ? (
                <Text style={{ textAlign: 'left', marginTop: '0.5rem' }} variant="h5">Gyakorlat jelenleg üres </Text>

              ) : (
                <table className={styles["set-table"]}>
                  <thead>
                    <tr>
                      <th></th>
                      <th colSpan={2}>
                        <Text style={{ marginBottom: '1rem' }} variant="h5">Előző alkalom</Text>
                      </th>
                      <th colSpan={2}>
                        <Text style={{ marginBottom: '1rem' }} variant="h5">Most</Text>
                      </th>
                      <th></th>
                      <th />
                    </tr>
                    <tr>
                      <th>
                        <Text> </Text>
                      </th>
                      <th>
                        <Text style={{ textAlign: 'center' }}>KG</Text>
                      </th>
                      <th>
                        <Text style={{ textAlign: 'center' }}>Ism.</Text>
                      </th>
                      <th>
                        <Text style={{ textAlign: 'center' }}>KG</Text>
                      </th>
                      <th>
                        <Text style={{ textAlign: 'center' }}>Ism.</Text>
                      </th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: maxRows }).map((_, rowIndex) => {
                      const prev = safePrevHistory[rowIndex];
                      const currSet = safeSzetek[rowIndex];

                      return (
                        <tr key={rowIndex}>
                          {/* Previous session columns */}
                          <td>
                            <Text className={styles["prev-reps"]} variant="body-16">{rowIndex + 1}</Text>
                          </td>
                          <td>
                            {prev ? (
                              <Text className={styles["prev-reps"]} variant="body-16">{prev.weight}</Text>
                            ) : (
                              <Text className={styles["prev-reps"]} variant="body-16">-</Text>
                            )}
                          </td>
                          <td>
                            {prev ? (
                              <Text className={styles["prev-reps"]} variant="body-16">{prev.reps}</Text>
                            ) : (
                              <Text className={styles["prev-reps"]} variant="body-16">-</Text>
                            )}
                          </td>
                          {/* Current session columns */}
                          <td>
                            {currSet ? (
                              <div className={styles["set-input"]}>
                                <FormField
                                  name={`gyakorlatok[${index}].szettek[${rowIndex}].weight`}
                                  placeholder="KG"
                                  type="number"
                                  as={Input}
                                  isSet
                                  disabled={isLocked}

                                />
                              </div>
                            ) : (
                              <Text style={{ paddingTop: '1rem' }} className={styles["prev-reps"]} variant="body-16">-</Text>
                            )}
                          </td>
                          <td>
                            {currSet ? (
                              <div className={styles["set-input"]}>
                                <FormField
                                  name={`gyakorlatok[${index}].szettek[${rowIndex}].reps`}
                                  placeholder="Ism."
                                  type="number"
                                  as={Input}
                                  isSet
                                  disabled={isLocked}

                                />
                              </div>
                            ) : (
                              <Text style={{ paddingTop: '1rem' }} className={styles["prev-reps"]} variant="body-16">-</Text>
                            )}
                          </td>
                          {/* Minus icon for current sets */}
                          <td>
                            {currSet && (
                              <div className={styles["set-input"]}>
                                <IconButton
                                  icon="MinusIcon"
                                  color="secondary"
                                  type="button"
                                  onClick={() => handleDeleteSet(rowIndex, currSet)}
                                />
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
              <Button
                type="button"
                onClick={handleAddSet}
                color="primary"
                rightIcon='AddIcon'
                additionalClassName={styles["addset-desktop"]}
                
              >
                Set
              </Button>
            </div>
          );
        }}
      </FieldArray>

      <div>


        <div className={styles["exercise-actions"]}>

          <Button
            type="button"
            onClick={handleAddSet}
            color="primary"
            rightIcon='AddIcon'
            additionalClassName={styles["addset-mobile"]}
          >
            Set
          </Button>

          <Button
            type="button"
            onClick={handleGyakorlatBefejezese}
            color="secondary"
            additionalClassName={styles["finalize-button"]}
          >
            Gyakorlat Befejezése
          </Button>
        </div>

      </div>
    </div>
  );
};

export default GyakorlatokFieldArray;
