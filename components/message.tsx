import { cls } from "@libs/client/utils";

interface IMessageProps {
  message: string;
  reversed?: boolean;
  avatarUrl?: string;
}

const Message: React.FC<IMessageProps> = ({ message, reversed, avatarUrl }) => {
  return (
    <div
      className={cls(
        "flex items-start space-x-2",
        reversed ? "flex-row-reverse space-x-reverse" : ""
      )}
    >
      <div className="w-8 h-8 rounded-full bg-slate-300" />
      <div className="w-1/2 p-2 text-sm text-gray-700 border border-gray-300 rounded-md">
        <p>{message}</p>
      </div>
    </div>
  );
};
export default Message;
