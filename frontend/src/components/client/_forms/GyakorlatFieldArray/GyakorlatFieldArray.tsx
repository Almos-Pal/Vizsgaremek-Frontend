import { FieldArray } from 'formik';
import React from 'react';
import { Input } from "../../_inputs";
import Button from "../../Button/Button";
import FormField from "../FormField/FormField";
import styles from './GyakorlatFieldArray.module.scss';
import IconButton from "../../IconButton/IconButton";
import { Text } from "@/components/server";
import { Gyakorlat } from '@/types/gyakorlat';

interface GyakorlatokFieldArrayProps {
    index: number;
    gyakorlat: Gyakorlat;
    arrayHelpers: any;
}

const GyakorlatokFieldArray: React.FC<GyakorlatokFieldArrayProps> = ({ index, gyakorlat, arrayHelpers }) => {
    return (
        <div className={styles["edzes-block"]}>
            <div className={styles["edzes-header"]}>
                <Text> {gyakorlat.gyakorlat.gyakorlat_neve}</Text>
            </div>

            <FieldArray name={`gyakorlatok[${index}].szettek`}>
                {(setHelpers) => (
                    <div className={styles["set-container"]}>
                        <table className={styles["set-table"]}>
                            <thead>
                                <tr>
                                    <th><Text>Set</Text></th>
                                    <th><Text>Súly</Text></th>
                                    <th><Text>Reps</Text></th>
                                </tr>
                            </thead>
                            <tbody>
                                {gyakorlat.szettek.map((set: any, setIndex: number) => (
                                    <tr key={setIndex}>
                                        <td><Text>{setIndex + 1}</Text></td>
                                        <td>
                                            <FormField name={`gyakorlatok[${index}].szettek[${setIndex}].weight`}  isSet={true} placeholder="KG" type="number" as={Input} />
                                        </td>
                                        <td>
                                            <FormField name={`gyakorlatok[${index}].szettek[${setIndex}].reps`} isSet={true} placeholder="Ism." type="number" as={Input} />
                                        </td>
                                        <td>
                                            <IconButton icon="MinusIcon" onClick={() => setHelpers.remove(setIndex)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Button type="button" onClick={() => setHelpers.push({ weight: 0, reps: 0 })} color="secondary">
                            Hozzáadás
                        </Button>
                    </div>
                )}
            </FieldArray>

            <Button type="button" onClick={() => arrayHelpers.remove(index)} color="secondary">
                Gyakorlat Törlés
            </Button>
        </div>
    );
};

export default GyakorlatokFieldArray;
