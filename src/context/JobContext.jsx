import { createContext, useReducer } from "react";

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
      break;

    case "SET_ERRORS":
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
      break;

      return {
        ...state,
        errors: action.payload,
      };

    case "SET_ACTIVE_TAB":
      return {
        ...state,
        activeTab: action.payload,
      };

    case "ADD_JOB":
      const newJobs = [...state.jobs, action.payload];
      localStorage.setItem("jobTrackList", JSON.stringify(newJobs));
      return {
        ...state,
        jobs: newJobs,
      };

    case "UPDATE_JOB":
      const updatedJobs = state.jobs.map((job) =>
        job.id === action.payload.id ? action.payload : job,
      );
      localStorage.setItem("jobTrackList", JSON.stringify(updatedJobs));
      return {
        ...state,
        jobs: updatedJobs,
        editingId: null,
      };

    case "DELETE_JOB":
      const filteredJobs = state.jobs.filter(
        (job) => job.id !== action.payload,
      );
      localStorage.setItem("jobTrackList", JSON.stringify(filteredJobs));
      return {
        ...state,
        jobs: filteredJobs,
      };

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
        jobTrackForm: initialState.jobTrackForm,
        errors: {},
        editingId: null,
        activeTab: "list",
      };

    default:
      return state;
  }
}

export const JobProvider = ({ children }) => {
  const [state, dispatch] = useReducer(JobReducer, initialState);

  return (
    <JobContext.Provider value={{ state, dispatch }}>
      {children}
    </JobContext.Provider>
  );
};
