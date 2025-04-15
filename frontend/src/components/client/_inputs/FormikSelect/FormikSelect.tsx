import React from "react";
import { Field, useFormikContext } from "formik";
import { Select } from "../../_inputs"; // Assuming this is your existing Select component
import {Text} from "@/components/server"
import styles from "./FormikSelect.module.scss";

interface Option {
  value: string;
  label: string;
}

interface FormikSelectProps {
  name: string;
  options: Option[];
  isMulti?: boolean;
  placeholder?: string;
  label?: string;
  isRequired?: boolean;
  isClearable?: boolean;
  onChange?: () => void;
  noOptionsMessage?:string;
  notFoundMessage?:string;
}

const FormikSelect: React.FC<FormikSelectProps> = ({ name, options, isMulti = false,onChange, placeholder,label,isRequired,isClearable = false, noOptionsMessage="Nincs találat!",notFoundMessage="Nincs találat!"  }) => {
  const { setFieldValue, values, errors, touched } = useFormikContext<any>(); // Get Formik context values
  const error = touched[name] && errors[name] ? String(errors[name]) : undefined;

  const handleChange = (selectedOptions: any) => {
    if (onChange) {
      onChange();
    }
    const value = isMulti
      ? selectedOptions ? selectedOptions.map((option: any) => option.value) : [] // For multi-select
      : selectedOptions ? selectedOptions.value : ""; // For single-select
    setFieldValue(name, value);
  };

  const currentValue = isMulti
    ? values[name]?.map((val: string) => ({
        value: val,
        label: options.find((option) => option.value === val)?.label,
      })) || []
    : options.find((option) => option.value === values[name]) || null;

  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={name}>
          <div className="inline-flex items-center">
            <Text variant="body-16">{label}</Text>
            {isRequired && (
              <Text
                variant="caption"
                color="var(--color-error)"
              >
                *
              </Text>
            )}
          </div>
        </label>
      )}
      <Field name={name} isRequired={isRequired} >
        {() => (
          <Select
            instanceId={name}
            name={name}
            options={options}
            isMulti={isMulti}
            placeholder={placeholder}
            value={currentValue}
            onChange={handleChange}
            isClearable={isClearable}
            className={error ? styles.error : ""}
            noOptionsMessage={({inputValue}) => !inputValue ? noOptionsMessage :  notFoundMessage}   
          />
        )}
      </Field>
      {error && (
        <div className={styles.errorMessage}>
          <Text color="var(--color-error)">{error}</Text>
        </div>
      )}
    </div>
  );
};

export default FormikSelect;
