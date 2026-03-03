import { Trefoil } from "ldrs/react";
import "ldrs/react/Trefoil.css";

type Props = {
  label?: string;
};

const Spinner = ({ label = "Loading..." }: Props) => (
  <div className="h-full w-full flex flex-col justify-center items-center">
    <Trefoil
      size="100"
      stroke="4"
      strokeLength="0.15"
      bgOpacity="0.1"
      speed=".8"
      color="#FFD237"
    />
    {label && (
      <p className="text-amber-500 animate-pulse tracking-widest uppercase text-sm mt-7 ml-3">
        {label}
      </p>
    )}
  </div>
);

export default Spinner;
