import { BriefcaseIcon } from "@heroicons/react/16/solid";
import {
  ClipboardDocumentListIcon,
  HomeModernIcon,
} from "@heroicons/react/20/solid";
import JobFormContainer from "../jobForm/JobFormContainer";
import { useContext } from "react";
import React, { useMemo } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#3B82F6", "#FACC15", "#10B981", "#EF4444"];

import TableContainer from "../table/TableContainer";
import { JobContext } from "../../context/JobContext";
import toast from "react-hot-toast";
const Content = () => {
  const { state, dispatch } = useContext(JobContext);
  const { jobTrackForm, errors, activeTab, jobs, editingId } = state;
  // --------------------------
  // Compute Stats
  // --------------------------
  const totalApplications = jobs.length;
  const applied = jobs.filter((j) => j.jobStatus === "Applied").length;
  const interviews = jobs.filter((j) => j.jobStatus === "Interview").length;
  const rejected = jobs.filter((j) => j.jobStatus === "Rejected").length;
  const offers = jobs.filter((j) => j.jobStatus === "Offer").length;

  const stats = [
    {
      title: "Total Applications",
      value: totalApplications,
      icon: <BriefcaseIcon className="h-6 w-6 text-white" />,
      bg: "bg-blue-500",
    },
    {
      title: "Applied",
      value: applied,
      icon: <ClipboardDocumentListIcon className="h-6 w-6 text-white" />,
      bg: "bg-yellow-500",
    },
    {
      title: "Interviews",
      value: interviews,
      icon: <CheckCircleIcon className="h-6 w-6 text-white" />,
      bg: "bg-green-500",
    },
    {
      title: "Rejected",
      value: rejected,
      icon: <XCircleIcon className="h-6 w-6 text-white" />,
      bg: "bg-red-500",
    },
  ];

  // --------------------------
  // Chart Data
  // --------------------------
  const statusData = [
    {
      name: "Total",
      value: totalApplications - applied - interviews - rejected - offers,
    },
    { name: "Applied", value: applied },
    { name: "Interviews", value: interviews },
    { name: "Rejected", value: rejected },
    { name: "Offer", value: offers },
  ].filter((d) => d.value > 0); // remove zero entries

  // Applications Over Time (grouped by date)
  const trendData = useMemo(() => {
    const map = {};
    jobs.forEach((job) => {
      const date = job.createdAt || job.date || "Unknown";
      map[date] = (map[date] || 0) + 1;
    });
    return Object.entries(map).map(([date, applications]) => ({
      week: date,
      applications,
    }));
  }, [jobs]);

  // Applications by Company
  const companyData = useMemo(() => {
    const map = {};
    jobs.forEach((job) => {
      map[job.companyName] = (map[job.companyName] || 0) + 1;
    });
    return Object.entries(map).map(([company, applications]) => ({
      company,
      applications,
    }));
  }, [jobs]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_INPUT", payload: { name, value } });
  };

  function validateForm(values) {
    const newErrors = {};

    if (!values.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    if (!values.jobRole.trim()) {
      newErrors.jobRole = "Job role is required";
    }

    if (!values.jobLocation.trim()) {
      newErrors.jobLocation = "Location is required";
    }

    if (!values.jobType.trim()) {
      newErrors.jobType = "Job type is required";
    }

    return newErrors;
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(jobTrackForm);

    if (Object.keys(validationErrors).length > 0) {
      dispatch({ type: "SET_ERRORS", payload: validationErrors });
      toast.error("Please fix the inputs error");
      return;
    }

    if (editingId) {
      dispatch({
        type: "UPDATE_JOB",
        payload: {
          ...jobTrackForm,
          id: editingId,
          updatedAt: new Date().toISOString().split("T")[0],
        },
      });
      toast.success("Job Edited successfully");
    } else {
      dispatch({
        type: "ADD_JOB",
        payload: {
          ...jobTrackForm,
          id: Date.now(),
          createdAt: new Date().toISOString().split("T")[0],
          updatedAt: new Date().toISOString().split("T")[0],
        },
      });
      toast.success("Job added successfully");
    }

    dispatch({ type: "RESET_FORM" });
  };

  const handleEdit = (job) =>
    dispatch({ type: "SET_EDIT", payload: job, id: job.id });
  const handleDelete = (jobId) => {
    dispatch({ type: "DELETE_JOB", payload: jobId });
    toast.success("Job deleted successfully");
  };

  return (
    <>
      <section className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="w-full bg-white shadow-md rounded-xl p-6 md:p-8">
          {activeTab === "dash" && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <HomeModernIcon className="h-7 w-7 text-blue-600" />
                <h2 className="text-xl md:text-2xl font-semibold text-blue-600">
                  Dashboard
                </h2>
              </div>
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="flex flex-wrap gap-6">
                  {stats.map((stat) => (
                    <div
                      key={stat.title}
                      className="flex-1 min-w-[200px] flex items-center p-4 bg-white rounded-lg shadow-md"
                    >
                      <div className={`p-3 rounded-full ${stat.bg} mr-4`}>
                        {stat.icon}
                      </div>
                      <div>
                        <p className="text-gray-500">{stat.title}</p>
                        <p className="text-2xl font-semibold">{stat.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Pie Chart */}
                  <div className="bg-white rounded-lg shadow-md p-4 w-full overflow-x-auto">
                    <h3 className="text-lg font-semibold mb-4">
                      Application Status
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={statusData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label
                        >
                          {statusData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Line Chart */}
                  <div className="bg-white rounded-lg shadow-md p-4 w-full overflow-x-auto">
                    <h3 className="text-lg font-semibold mb-4">
                      Applications Over Time
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={trendData}>
                        <XAxis dataKey="week" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="applications"
                          stroke="#3B82F6"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Bar Chart */}
                <div className="bg-white rounded-lg shadow-md p-4 w-full overflow-x-auto">
                  <h3 className="text-lg font-semibold mb-4">
                    Applications by Company
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={companyData}>
                      <XAxis dataKey="company" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="applications" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Recent Applications Table */}
                <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto">
                  <h3 className="text-lg font-semibold mb-4">
                    Recent Applications
                  </h3>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Company
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {jobs
                        .slice(-10)
                        .reverse()
                        .map((job) => (
                          <tr key={job.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {job.companyName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {job.jobRole}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {job.jobStatus}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {job.createdAt}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
          {activeTab === "form" && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <ClipboardDocumentListIcon className="h-7 w-7 text-blue-600" />
                <h2 className="text-xl md:text-2xl font-semibold text-blue-600">
                  Job Tracking Form
                </h2>
              </div>

              <JobFormContainer
                jobTrackForm={jobTrackForm}
                handleInputChange={handleInputChange}
                errors={errors}
                onSubmitHandler={onSubmitHandler}
                resetForm={() => dispatch({ type: "RESET_FORM" })}
                editingId={editingId}
              />
            </>
          )}
          {activeTab === "list" && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <BriefcaseIcon className="h-7 w-7 text-blue-600" />
                <h2 className="text-xl md:text-2xl font-semibold text-blue-600">
                  Job Applications
                </h2>
              </div>

              {/* Temporary placeholder */}
              {jobs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="text-5xl mb-4">📭</div>
                  <h2 className="text-xl font-semibold text-gray-700">
                    No job applications yet
                  </h2>
                  <p className="text-gray-500 mt-2">
                    Click "Add Job" to start tracking.
                  </p>
                </div>
              ) : (
                <div className="hidden w-full overflow-x-auto md:block">
                  <TableContainer
                    jobs={jobs}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Content;
