import { Loader2 } from "lucide-react";
import clsx from "clsx";

type ButtonWithLoadingProps = {
  title: string;
  loading: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

const ButtonWithLoading = ({ title, loading, onClick, className }: ButtonWithLoadingProps) => {
  return (
    <button
      type="submit"
      className={clsx(
        "w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      disabled={loading}
      onClick={onClick}
      aria-busy={loading}
    >
      {loading ? <Loader2 className="animate-spin mr-2" size={24} /> : title}
    </button>
  );
};

export default ButtonWithLoading;
