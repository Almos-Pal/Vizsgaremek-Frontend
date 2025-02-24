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
import * as Yup from 'yup';
import { useSession } from 'next-auth/react';
import { useToast } from '@/hooks';


interface Gyakorlat {
  gyakorlat_id?: number;
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
  const { data: session } = useSession();
  const toast = useToast();


  const { mutate: addSetToGyakorlatInEdzes } = useEdzes.addSetToGyakorlatInEdzes();
  const { mutate: deleteGyakorlatFromEdzes } = useEdzes.deleteGyakorlatFromEdzes();
  const { mutate: updateSetInGyakorlatInEdzes } = useEdzes.updateSetInGyakorlatInEdzes();
  const { mutate: deleteSetFromGyakorlatInEdzes } = useEdzes.deleteSetFromGyakorlatInEdzes();

  const [isGyakorlatConfirmModalOpen, setIsGyakorlatConfirmModalOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const {errors,dirty} = useFormikContext<any>();


  const handleSetBlur = (rowIndex: number) => {
    const currentSet = values.gyakorlatok?.[index]?.szettek?.[rowIndex];

    if (currentSet.weight < 0 || currentSet.reps < 1) {
      
      // toast.error("A súly és az ismétlés számának nagyobbnak kell lennie, mint 0");
      return;

    }

    if (currentSet && currentSet.id) {
      const updateDetails = {
        weight: currentSet.weight,
        reps: currentSet.reps,
      };
      updateSetInGyakorlatInEdzes(
        {
          edzes_id: values.edzes_id,
          gyakorlatId: gyakorlat.gyakorlat_id!,
          setId: currentSet.id,
          userId: session?.user.user_id!, //perfection
          updateDetails,
        },
        {
          onSuccess: () => {
            console.log(`Set ${currentSet.set_szam} updated on blur.`);
          },
          onError: (error) => {
            console.error("Error updating set on blur:", error);
          },
        }
      );
    }
    
  };

  const handleAddSet = () => {
  if (!values.edzes_id || !gyakorlat.gyakorlat_id) {
    console.error("Missing required IDs for adding set");
    return;
  }
  const safeSzetek = gyakorlat.szettek || [];
  const newSetData = { weight: 0, reps: 0 };
  const setNumber = safeSzetek.length + 1;

  addSetToGyakorlatInEdzes(
    {
      edzes_id: values.edzes_id,
      gyakorlatId: gyakorlat.gyakorlat_id,
      userId: session?.user.user_id!,
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
   

    if (setItem.id) {
      deleteSetFromGyakorlatInEdzes(
        {
          edzes_id: values.edzes_id,
          gyakorlatId: gyakorlat.gyakorlat_id,
          setId: setItem.id,
          userId: session?.user.user_id!, // perfection
        },
        {
          onSuccess: () => {
            console.log(`Set ${setItem.set_szam} deleted successfully.`);
            toast.success("Set törölve");
            arrayHelpers.remove(setIndex);
          },
          onError: (error) => {
            console.error("Error deleting set:", error);
          },
        }
      );
    } else {
      arrayHelpers.remove(setIndex);
    }
  };

  
 
  const handleOpenDeleteConfirm = () => {
    setIsGyakorlatConfirmModalOpen(true);
  };

  const handleDeleteGyakorlatCancel = () => {
    setIsGyakorlatConfirmModalOpen(false);
  };

  const handleDeleteGyakorlatConfirm = () => {
    setIsGyakorlatConfirmModalOpen(false);
    if (!values.edzes_id || !gyakorlat.gyakorlat_id) {
      console.error("Missing required IDs");
      return;
    }

    deleteGyakorlatFromEdzes(
      {
        edzesId: values.edzes_id,
        gyakorlatId: gyakorlat.gyakorlat_id,
        userId: session?.user.user_id!, // perfection
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



  const safeSzetek = gyakorlat.szettek || [];
  const safePrevHistory = prevHistory || [];

  const maxRows = Math.max(safePrevHistory.length, safeSzetek.length);
 

  return (
    <div className={styles["edzes-block"]}>
      
      <div className={styles["edzes-header"]}>
      <Text style={{ marginLeft: '2rem' }} variant="subtitle-16">
        {gyakorlat.gyakorlat_neve}:
      </Text>
      <IconButton
        color="secondary"
        icon="CancelIcon"
        type="button"
        onClick={handleOpenDeleteConfirm}
      />
      </div>

      {isGyakorlatConfirmModalOpen && (
      <ConfirmationModal
        visible={isGyakorlatConfirmModalOpen}
        title="Biztos, hogy törölni akarja ezt a gyakorlatot?"
        onConfirm={handleDeleteGyakorlatConfirm}
        onCancel={handleDeleteGyakorlatCancel}
        confirmText="Igen"
        cancelText="Nem"
      />
      )}

      <FieldArray name={`gyakorlatok[${index}].szettek`}>
      {(setHelpers) => (
        <div className={`${styles["set-container"]} ${safeSzetek.length === 0 ? styles["empty"] : ""}`}>
        {safeSzetek.length === 0 ? (
          <div></div>
        ) : (
          <table className={styles["set-table"]}>
          <thead>
            <tr>
            <th></th>
            <th colSpan={2}>
              <Text style={{ marginBottom: '1rem' }} variant="h5">
              Előző alkalom
              </Text>
            </th>
            <th colSpan={2}>
              <Text style={{ marginBottom: '1rem' }} variant="h5">
              Most
              </Text>
            </th>
            <th></th>
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
                        <td>
                          <Text className={styles["prev-reps"]} variant="body-16">
                            {rowIndex + 1}
                          </Text>
                        </td>
                        <td>
                          {prev ? (
                            <Text className={styles["prev-reps"]} variant="body-16">
                              {prev.weight}
                            </Text>
                          ) : (
                            <Text className={styles["prev-reps"]} variant="body-16">
                              -
                            </Text>
                          )}
                        </td>
                        <td>
                          {prev ? (
                            <Text className={styles["prev-reps"]} variant="body-16">
                              {prev.reps}
                            </Text>
                          ) : (
                            <Text className={styles["prev-reps"]} variant="body-16">
                              -
                            </Text>
                          )}
                        </td>
                        <td>
                          {currSet ? (
                            <div className={styles["set-input"]}>
                              <FormField
                                name={`gyakorlatok[${index}].szettek[${rowIndex}].weight`}
                                placeholder="KG"
                                type="number"
                                as={Input}
                                error={(errors as any).gyakorlatok?.[index]?.szettek?.[rowIndex]?.weight}

                                isSet
                                disabled={isLocked}
                                onBlur={() => handleSetBlur(rowIndex)}
                                isRequired
                              />
                            </div>
                          ) : (
                            <Text style={{ paddingTop: '1rem' }} className={styles["prev-reps"]} variant="body-16">
                              -
                            </Text>
                          )}
                        </td>
                        <td>
                          {currSet ? (
                            <div className={styles["set-input"]}>
                              <FormField
                                name={`gyakorlatok[${index}].szettek[${rowIndex}].reps`}
                                placeholder="Ism."
                                type="number"
                                min={0}
                                error={(errors as any).gyakorlatok?.[index]?.szettek?.[rowIndex]?.reps}
                                as={Input}
                                isDirty={dirty}
                                isSet
                                disabled={isLocked}
                                onBlur={() => handleSetBlur(rowIndex)}
                              />
                            </div>
                          ) : (
                            <Text style={{ paddingTop: '1rem' }} className={styles["prev-reps"]} variant="body-16">
                              -
                            </Text>
                          )}
                        </td>
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
              rightIcon="AddIcon"
              additionalClassName={styles["addset-desktop"]}
            >
              Set
            </Button>
          </div>
        )}
      </FieldArray>

      <div>
        <div className={styles["exercise-actions"]}>
          <Button
            type="button"
            onClick={handleAddSet}
            color="primary"
            rightIcon="AddIcon"
            additionalClassName={styles["addset-mobile"]}
          >
            Set
          </Button>
          
        </div>
      </div>
    </div>
  );
};

export default GyakorlatokFieldArray;
