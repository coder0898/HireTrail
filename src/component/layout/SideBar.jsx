import { BriefcaseIcon } from "@heroicons/react/16/solid";
import { ClipboardDocumentListIcon } from "@heroicons/react/20/solid";
import ListItem from "../sidebar/ListItem";
const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <>
      <aside className="bg-white w-full md:w-64 shrink-0 ">
        <ul className="flex md:flex-col mt-6 mb-6 justify-around md:justify-start items-center gap-6 md:gap-4 ">
          <ListItem
            icon={BriefcaseIcon}
            label="Job Applications"
            tabName="list"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <ListItem
            icon={ClipboardDocumentListIcon}
            label="Tracking Form"
            tabName="form"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
