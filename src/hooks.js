import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
    setValues,
  };
};

// <-------- for smooth scroll to ref ---->
// const myRef = React.useRef(null);
// const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
// const executeScroll = () => scrollToRef(myRef);
// <-------- for smooth scroll to ref ---->
