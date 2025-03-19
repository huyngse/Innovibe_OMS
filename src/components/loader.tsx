import { cn } from "@/lib/utils";

const Loader = ({
  variant = "full_screen",
}: {
  variant?: "full_screen" | "inline";
}) => {
  return (
    <div
      className={cn(
        "flex justify-center items-center",
        variant == "full_screen" && "h-screen",
        variant == "inline" && "py-5"
      )}
    >
      <div className="loader border-t-transparent border-solid border-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
    </div>
  );
};

export default Loader;