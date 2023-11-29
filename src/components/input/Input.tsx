import { forwardRef, InputHTMLAttributes, Ref } from 'react';
import './Input.scss';
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = forwardRef(
  ({ error, ...props }: InputProps, ref: Ref<HTMLInputElement>) => {
    return (
      <>
        <input {...props} ref={ref} />
        {error && <div className="error-message">{error}</div>}
      </>
    );
  }
);

export default Input;
