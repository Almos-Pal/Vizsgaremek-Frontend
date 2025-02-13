import { Form, Formik, FieldArray } from 'formik';
import React from 'react';
import Button from '../../Button/Button';
import GyakorlatokFieldArray from '../GyakorlatFieldArray/GyakorlatFieldArray';
import FormField from '../FormField/FormField';
import UnderLinedText from '../../UnderLinedText/UnderLinedText';
import { EdzesCreate, Gyakorlat } from '@/types';
import useEdzes from '@/hooks/useEdzes';

interface EdzesCreateEditFormProps {
    initialData: EdzesCreate;
    gyakorlatok?: Gyakorlat[];
    id?: number;
}

const EdzesCreateEditForm = ({ initialData, id, gyakorlatok = [] }: EdzesCreateEditFormProps) => {
    const { mutate: createEdzes } = useEdzes.createEdzes();
    const { mutate: updateEdzes } = useEdzes.updateEdzes();

    const initialValues = {
        edzes_neve: initialData?.edzes_neve || '',
        gyakorlatok: gyakorlatok || [], // Include exercises in Formik state
    };

    const handleSubmit = (values: typeof initialValues) => {
        const submissionValues = {
            ...values,
            datum: new Date(),
            user_id: 0,
            ido: 0,
        };

        if (id) {
            updateEdzes({ id, updatedEdzes: submissionValues }, {
                onSuccess: () => console.log('Edzés updated'),
            });
        } else {
            createEdzes(submissionValues, {
                onSuccess: () => console.log('Edzés created'),
            });
        }
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
            {({ values }) => (
                <Form>
                    <FormField name="edzes_neve" label="Edzés neve" placeholder="Edzés neve" as="input" />

                    <UnderLinedText text="Gyakorlatok" lineLength={220} />

                    {/* FieldArray for Gyakorlatok */}
                    <FieldArray name="gyakorlatok">
                        {(arrayHelpers) => (
                            <>
                                {values.gyakorlatok.map((gyakorlat, index) => (
                                    <GyakorlatokFieldArray
                                        key={index}
                                        index={index}
                                        gyakorlat={gyakorlat}
                                        arrayHelpers={arrayHelpers}
                                    />
                                ))}
                                <Button type="button" onClick={() => arrayHelpers.push({ gyakorlat_neve: '', szettek: [] })}>
                                    Gyakorlat Hozzáadása
                                </Button>
                            </>
                        )}
                    </FieldArray>

                    <Button type="submit" color="primary">Edzés Véglegesítése</Button>
                </Form>
            )}
        </Formik>
    );
};

export default EdzesCreateEditForm;
