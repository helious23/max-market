import type { UseFormRegisterReturn } from "react-hook-form";

interface IInputProps {
  label: string;
  name: string;
  kind?: "text" | "phone" | "price";
  register: UseFormRegisterReturn;
  required: boolean;
  type: string;
  placeholder: string;
}

const Input: React.FC<IInputProps> = ({
  label,
  name,
  kind = "text",
  register,
  type,
  placeholder,
  required,
}) => {
  return (
    <div>
      <label htmlFor={name} className="mt-2 text-sm text-gray-600">
        {label}
      </label>
      {kind === "text" ? (
        <input
          id={name}
          type={type}
          required={required}
          placeholder={placeholder}
          {...register}
          className="w-full py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:border-orange-500 focus:ring-orange-500 "
        />
      ) : null}
      {kind === "phone" ? (
        <div className="flex mt-1 rounded-md shadow-sm">
          <span className="flex items-center justify-center px-3 text-sm text-gray-500 border border-r-0 border-gray-300 select-none rounded-l-md bg-gray-50">
            +82
          </span>
          <input
            id={name}
            type={type}
            required={required}
            placeholder={placeholder}
            {...register}
            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md rounded-l-none shadow-sm appearance-none focus:border-orange-500 focus:ring-orange-500 "
          />
        </div>
      ) : null}
      {kind === "price" ? (
        <div className="relative flex items-center mt-1 rounded-md shadow-sm">
          <div className="absolute left-0 flex items-center justify-center pl-3 select-none">
            <span className="text-sm text-gray-500">₩</span>
          </div>
          <input
            id={name}
            type={type}
            required={required}
            placeholder={placeholder}
            {...register}
            className="w-full placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none pl-7 focus:border-orange-500 focus:ring-orange-500"
          />
          <div className="absolute right-0 flex items-center pr-3 select-none">
            <span className="z-10 text-gray-500">원</span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Input;
