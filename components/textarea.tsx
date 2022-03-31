import type { UseFormRegisterReturn } from "react-hook-form";

interface ITextAreaProps {
  label?: string;
  name?: string;
  register: UseFormRegisterReturn;
  required: boolean;

  placeholder: string;
}

const TextArea: React.FC<ITextAreaProps> = ({
  name,
  label,
  register,
  placeholder,
  required,
}) => {
  return (
    <div>
      {label ? (
        <label className="block mt-2 mb-1 text-sm text-gray-600" htmlFor={name}>
          {label}
        </label>
      ) : null}
      <textarea
        id={name}
        rows={4}
        {...register}
        placeholder={placeholder}
        required={required}
        className="w-full mt-1 placeholder-gray-400 border-gray-300 rounded-md shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
    </div>
  );
};

export default TextArea;
