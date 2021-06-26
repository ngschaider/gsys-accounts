import { ChangeEvent, FormEvent, SyntheticEvent, useState } from "react";
import { CheckboxProps, DropdownProps } from "semantic-ui-react";

const useForm = <V extends Record<string,any>>(initialValues: V, onSubmitCb?: (values: V) => void, onChangeCb?: (values: V) => void) => {
    const [values, setValues] = useState<V>(initialValues);

    const setValue = (key: string, value: any) => {
        setValues({
            ...values,
            [key]: value,
        });
        onChangeCb?.(values);
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => {
        setValue(e.target.name, e.target.value);
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmitCb?.(values);
    }

    const onCheckboxChange = (e: FormEvent<HTMLInputElement>, data: CheckboxProps) => {
        if(data.name) {
            setValue(data.name, data.checked);
        }
    }

    return {
        values,
        setValue,
        setValues,
        onChange,
        onCheckboxChange,
        onSubmit,
    };
};
export default useForm;