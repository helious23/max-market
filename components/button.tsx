import { cls } from "@libs/client/utils";

interface IButtonProps {
  large?: boolean;
  text: string;
  loading: boolean;
  [key: string]: any;
}

const Button: React.FC<IButtonProps> = ({
  large = false,
  text,
  onClick,
  loading,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={cls(
        "w-full rounded-md border border-transparent bg-orange-500 px-4 font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2",
        large ? "py-3 text-base" : "py-2 text-sm"
      )}
    >
      {loading ? "로딩중..." : text}
    </button>
  );
};

export default Button;
