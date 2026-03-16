import { useContext } from "react";
import { JobContext } from "../../context/JobContext";
import Dashboard from "../tabs/Dashboard";
import JobFormSection from "../tabs/JobFormSection";
import JobListSection from "../tabs/JobListSection";

const Content = () => {
  const { state } = useContext(JobContext);
  const { activeTab } = state;

  return (
    <section className="flex-1 overflow-y-auto p-4 md:p-6">
      <div className="w-full bg-white shadow-md rounded-xl p-6 md:p-8">
        {activeTab === "dash" && <Dashboard />}
        {activeTab === "form" && <JobFormSection />}
        {activeTab === "list" && <JobListSection />}
      </div>
    </section>
  );
};

export default Content;
