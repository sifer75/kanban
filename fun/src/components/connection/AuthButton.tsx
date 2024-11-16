import { Button } from "../ui/button";

interface AuthButtonProps {
  onClick: () => void;
  iconSrc: string;
  label: string;
}
function AuthButton({ onClick, iconSrc, label }: AuthButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="w-full bg-white border text-back text-base border-gray-300 rounded-md"
    >
      <img className="h-6 w-6 mr-2" src={iconSrc} alt={label}></img>
      {label}
    </Button>
  );
}

export default AuthButton;
