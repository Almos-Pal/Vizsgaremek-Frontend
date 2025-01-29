import React from "react";
import { Field, useFormikContext } from "formik";
import { Select } from "../../_inputs"; // Assuming this is your existing Select component
import {Text} from "@/components/server"

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
}

const FormikSelect: React.FC<FormikSelectProps> = ({ name, options, isMulti = false, placeholder,label,isRequired,isClearable = false }) => {
  const { setFieldValue, values } = useFormikContext<any>(); // Get Formik context values

  const handleChange = (selectedOptions: any) => {
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
    <div>


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
          />
        )}
    </Field>
    </div>
  );
};

export default FormikSelect;
