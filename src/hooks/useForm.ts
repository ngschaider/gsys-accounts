import { ChangeEvent, FormEvent, useState } from "react";

const useForm = <V extends Record<string,any>>(initialValues: V, onSubmitCb?: (values: V) => void, onChangeCb?: (values: V) => void) => {
    const [values, setValues] = useState<V>(initialValues);

    const setValue = (key: string, value: any) => {
        setValues({
            ...values,
            [key]: value,
        })
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => {
        setValue(e.target.name, e.target.value);
        onChangeCb?.(values);
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmitCb?.(values);
    }

    return {
        values,
        setValue,
        setValues,
        onChange,
        onSubmit,
    };
};
export default useForm;