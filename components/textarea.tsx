interface ITextAreaProps {
  label?: string;
  name?: string;
  [key: string]: any;
}

const TextArea: React.FC<ITextAreaProps> = ({ name, label, ...rest }) => {
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
        {...rest}
        className="w-full mt-1 placeholder-gray-400 border-gray-300 rounded-md shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
    </div>
  );
};

export default TextArea;
