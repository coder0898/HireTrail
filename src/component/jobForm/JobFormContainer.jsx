import Button from "./Button";
import DateInput from "./DateInput";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

const JobFormContainer = ({
  jobTrackForm,
  handleInputChange,
  errors,
  onSubmitHandler,
  resetForm,
  editingId,
}) => {
  return (
    <>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-5">
          <FormInput
            label="Company Name"
            name="companyName"
            value={jobTrackForm.companyName}
            onChangeFunction={handleInputChange}
            error={errors.companyName}
            required
          />
          <FormInput
            label="Job Role / Job Position"
            name="jobRole"
            value={jobTrackForm.jobRole}
            onChangeFunction={handleInputChange}
            error={errors.jobRole}
            required
          />
          <FormInput
            label="Location"
            name="jobLocation"
            value={jobTrackForm.jobLocation}
            onChangeFunction={handleInputChange}
            error={errors.jobLocation}
            required
          />
          <FormSelect
            label="Job Type"
            name="jobType"
            value={jobTrackForm.jobType}
            onChangeFunction={handleInputChange}
            error={errors.jobType}
            required
            optionValue={[
              "Full-time",
              "Part-time",
              "Internship",
              "Contract",
              "Freelance",
            ]}
          />
        </div>

        <div className="space-y-5">
          <FormSelect
            label="Status"
            name="jobStatus"
            value={jobTrackForm.jobStatus}
            onChangeFunction={handleInputChange}
            required
            optionValue={[
              "Applied",
              "Screening",
              "Interview",
              "Offer",
              "Rejected",
              "Accepted",
            ]}
          />

          <FormSelect
            label="Priority"
            name="jobPriority"
            value={jobTrackForm.jobPriority}
            onChangeFunction={handleInputChange}
            required
            optionValue={["Medium", "Low", "High"]}
          />

          <DateInput
            label="Date Applied"
            name="appliedDate"
            value={jobTrackForm.appliedDate}
            onChangeFunction={handleInputChange}
            required
          />
        </div>

        <div className="md:col-span-2 flex justify-end gap-4 pt-4">
          {/* <Button
            type="button"
            onClickFunction={onSubmitHandler}
            Content="Add Job"
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
          />
          <Button
            type="button"
            onClickFunction={resetForm}
            Content="Reset Form"
            className="bg-yellow-500 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-yellow-700 transition"
          /> */}
          <Button
            type="button"
            onClickFunction={onSubmitHandler}
            Content={editingId ? "Save Changes" : "Add Job"}
            className={`text-white px-5 py-2.5 rounded-lg font-medium transition ${
              editingId
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          />

          <Button
            type="button"
            onClickFunction={resetForm}
            Content={editingId ? "Cancel Edit" : "Reset Form"}
            className={`text-white px-5 py-2.5 rounded-lg font-medium transition ${
              editingId
                ? "bg-red-500 hover:bg-red-600"
                : "bg-yellow-500 hover:bg-yellow-600"
            }`}
          />
        </div>
      </form>
    </>
  );
};

export default JobFormContainer;
