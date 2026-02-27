import { BriefcaseIcon } from "@heroicons/react/16/solid";
const Header = () => {
  return (
    <>
      <header className="bg-blue-500 p-4">
        <div className="flex items-center gap-3">
          <BriefcaseIcon className="h-8 w-8 text-white" />
          <h1 className="text-3xl font-bold text-white">HireTrail</h1>
        </div>
      </header>
    </>
  );
};

export default Header;
