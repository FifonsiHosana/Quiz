import { formatCategoryName } from "../../utils/quizUtils";


type Props = {
  name: string;
  onClick: () => void;
};

const CategoryCard = ({ name, onClick }: Props) => (
  <div
    onClick={onClick}
    className="bg-amber-500 cursor-pointer uppercase h-35 m-5"
  >
    <div className="mt-0.5 p-5 border border-amber-900/20 shadow-2xl h-full bg-[#16191A] flex justify-center items-center text-amber-100 hover:text-amber-300 hover:bg-[#435054] text-center">
      {formatCategoryName(name)}
    </div>
  </div>
);

export default CategoryCard;
