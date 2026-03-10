import { BriefcaseIcon } from "@heroicons/react/16/solid";
import {
  ClipboardDocumentListIcon,
  HomeModernIcon,
} from "@heroicons/react/20/solid";
import ListItem from "../sidebar/ListItem";
import { useContext } from "react";
import { JobContext } from "../../context/JobContext";
const Sidebar = () => {
  const { state, dispatch } = useContext(JobContext);
  const { activeTab } = state;
  return (
    <>
      <aside className="bg-white w-full md:w-64 shrink-0 ">
        <ul className="flex md:flex-col mt-6 mb-6 justify-around md:justify-start items-center gap-6 md:gap-4 ">
          <ListItem
            icon={HomeModernIcon}
            label="Dashboard"
            tabName="dash"
            activeTab={activeTab}
            dispatch={dispatch}
          />
          <ListItem
            icon={BriefcaseIcon}
            label="Job Applications"
            tabName="list"
            activeTab={activeTab}
            dispatch={dispatch}
          />
          <ListItem
            icon={ClipboardDocumentListIcon}
            label="Tracking Form"
            tabName="form"
            activeTab={activeTab}
            dispatch={dispatch}
          />
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
