import { createContext, useReducer, useMemo } from "react";

export const JobContext = createContext();

const initialState = {
  jobTrackForm: {
    companyName: "",
    jobRole: "",
    jobLocation: "",
    jobType: "",
    jobStatus: "Applied",
    jobPriority: "Medium",
    appliedDate: new Date().toISOString().split("T")[0],
  },
  errors: {},
  activeTab: "dash",
  jobs: JSON.parse(localStorage.getItem("jobTrackList")) || [],
  editingId: null,
};

const saveJobs = (jobs) => {
  localStorage.setItem("jobTrackList", JSON.stringify(jobs));
};

function JobReducer(state, action) {
  switch (action.type) {
    case "UPDATE_INPUT":
      return {
        ...state,
        jobTrackForm: {
          ...state.jobTrackForm,
          [action.payload.name]: action.payload.value,
        },
        errors: {
          ...state.errors,
          [action.payload.name]: "",
        },
      };

    case "SET_ERRORS":
      return {
        ...state,
        errors: action.payload,
      };

    case "SET_ACTIVE_TAB":
      return {
        ...state,
        activeTab: action.payload,
      };

    case "ADD_JOB": {
      const jobs = [...state.jobs, action.payload];
      saveJobs(jobs);
      return { ...state, jobs };
    }

    case "UPDATE_JOB": {
      const jobs = state.jobs.map((job) =>
        job.id === action.payload.id ? action.payload : job,
      );
      saveJobs(jobs);
      return { ...state, jobs, editingId: null };
    }

    case "DELETE_JOB": {
      const jobs = state.jobs.filter((job) => job.id !== action.payload);
      saveJobs(jobs);
      return { ...state, jobs };
    }

    case "SET_EDIT":
      return {
        ...state,
        jobTrackForm: action.payload,
        editingId: action.id,
        activeTab: "form",
      };

    case "RESET_FORM":
      return {
        ...state,
        jobTrackForm: { ...initialState.jobTrackForm },
        editingId: null,
        errors: {},
        activeTab: "list",
      };

    default:
      return state;
  }
}

export const JobProvider = ({ children }) => {
  const [state, dispatch] = useReducer(JobReducer, initialState);

  const stats = useMemo(() => {
    const applied = state.jobs.filter((j) => j.jobStatus === "Applied").length;
    const interviews = state.jobs.filter(
      (j) => j.jobStatus === "Interview",
    ).length;
    const rejected = state.jobs.filter(
      (j) => j.jobStatus === "Rejected",
    ).length;
    const offers = state.jobs.filter((j) => j.jobStatus === "Offer").length;

    return {
      totalApplications: state.jobs.length,
      applied,
      interviews,
      rejected,
      offers,
    };
  }, [state.jobs]);

  return (
    <JobContext.Provider value={{ state, dispatch, stats }}>
      {children}
    </JobContext.Provider>
  );
};
