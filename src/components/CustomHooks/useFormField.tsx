import { useState, ChangeEvent } from 'react';

export function useFormFields(initialState: object): Array<any> {
  const [fields, setValues] = useState(initialState);

  return [
    fields,
    function(event: ChangeEvent<HTMLInputElement>) {
      console.log(event.target.id)
      console.log(event.target.value)
      setValues({
        ...fields,
        [event.target.id]: event.target.value
      });
    }
  ];
}