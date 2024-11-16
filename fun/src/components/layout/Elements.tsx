import { NavArrowRight } from "iconoir-react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface ElementsProps {
  title: string;
  link?: string | undefined;
  logo: ReactNode;
}
function Elements({ title, link, logo }: ElementsProps) {
  return (
    <div className="flex flex-row justify-between">
      <Link to={link as string} className="flex flex-row gap-2 items-center">
        {logo}
        <h2>{title}</h2>
      </Link>
      <NavArrowRight className="w-4 h-4" />
    </div>
  );
}

export default Elements;
