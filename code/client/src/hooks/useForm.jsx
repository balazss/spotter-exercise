import debounce from "lodash/debounce";
import { useEffect, useMemo, useState } from "react";

export const useForm = (callback, initialValues) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  // Call the callback function
  const debouncedHandler = useMemo(() => debounce(callback, 250), [callback]);

  useEffect(() => {
    debouncedHandler();

    return () => {
      debouncedHandler.cancel();
    };
  }, [debouncedHandler]);

  return { handleChange, values };
};
