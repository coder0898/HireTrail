import { useContext, useMemo } from "react";
import { JobContext } from "../../context/JobContext";

import StatsCard from "../cards/StatsCard";
import ChartCard from "../cards/ChartCard";
import TableHeader from "../table/TableHeader";
import SectionHeader from "../layout/SectionHead";

import {
  BriefcaseIcon,
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  XCircleIcon,
  HomeModernIcon,
} from "@heroicons/react/24/solid";

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

const Dashboard = () => {
  const { state, stats } = useContext(JobContext);
  const { jobs } = state;

  const { totalApplications, applied, interviews, rejected, offers } = stats;

  const statsData = [
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

  const statusData = [
    { name: "Applied", value: applied },
    { name: "Interviews", value: interviews },
    { name: "Rejected", value: rejected },
    { name: "Offer", value: offers },
  ].filter((d) => d.value > 0);

  const trendData = useMemo(() => {
    const map = {};

    jobs.forEach((job) => {
      const date = job.appliedDate || "Unknown";
      map[date] = (map[date] || 0) + 1;
    });

    return Object.entries(map).map(([date, applications]) => ({
      week: date,
      applications,
    }));
  }, [jobs]);

  const companyData = useMemo(() => {
    const map = {};

    jobs.forEach((job) => {
      const company = job.companyName || "Unknown";
      map[company] = (map[company] || 0) + 1;
    });

    return Object.entries(map).map(([company, applications]) => ({
      company,
      applications,
    }));
  }, [jobs]);

  const recentJobs = useMemo(() => {
    return [...jobs].slice(-10).reverse();
  }, [jobs]);

  const dashHead = ["Company", "Role", "Status", "Date"];

  return (
    <section className="flex-1 overflow-y-auto p-4 md:p-6">
      <div className="w-full bg-white shadow-md rounded-xl p-6 md:p-8">
        <SectionHeader Icon={HomeModernIcon} title="Dashboard" />

        <div className="space-y-6">
          {/* Stats */}
          <div className="flex flex-wrap gap-6">
            {statsData.map((stat) => (
              <StatsCard key={stat.title} {...stat} />
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ChartCard title="Application Status">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={statusData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={80}
                    label
                  >
                    {statusData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Applications Over Time">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={trendData}>
                  <XAxis dataKey="week" tick={{ fontSize: 12 }} />
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
            </ChartCard>
          </div>

          {/* Company Chart */}
          <ChartCard title="Applications by Company">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={companyData}>
                <XAxis dataKey="company" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="applications" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Recent Jobs */}
          <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4">Recent Applications</h3>

            <table className="min-w-full divide-y divide-gray-200">
              <TableHeader headings={dashHead} />

              <tbody className="bg-white divide-y divide-gray-200">
                {recentJobs.map((job) => (
                  <tr key={job.id}>
                    <td className="px-6 py-4">{job.companyName}</td>
                    <td className="px-6 py-4">{job.jobRole}</td>
                    <td className="px-6 py-4">{job.jobStatus}</td>
                    <td className="px-6 py-4">{job.appliedDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
