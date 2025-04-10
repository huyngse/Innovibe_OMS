import { CornerDownLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GoBackButton = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <button
      onClick={handleGoBack}
      className="flex gap-2 items-center font-semibold hover:text-orange-600 duration-200"
    >
      <CornerDownLeft className="size-5 mt-1" />
      Quay về
    </button>
  );
};

export default GoBackButton;
