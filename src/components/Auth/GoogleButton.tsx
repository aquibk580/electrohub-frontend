interface GoogleButtonProps {
  onClick: () => void;
  text: string;
}

import { icons } from "@/assets/assets";

export function GoogleButton({ onClick, text }: GoogleButtonProps) {
  return (
    <button
      className="flex items-center justify-center gap-2 w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      onClick={onClick}
    >
      <img src={icons.GoogleLogo} alt="Google" className="h-6 w-6" />
      {text}
    </button>
  );
}
