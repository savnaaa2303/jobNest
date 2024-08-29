import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

const CreateJob = () => {
  const [selectedOption, setSelectedOption] = useState([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    data.skills = selectedOption;

    try {
      const response = await fetch("http://localhost:5000/post-job", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.acknowledged) {
        alert("Job posted successfully!");
        reset();
      } else {
        alert("Failed to post the job. Please try again.");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const options = [
    { value: "Javascript", label: "Javascript" },
    { value: "C", label: "C" },
    { value: "C++", label: "C++" },
    { value: "ReactJS", label: "ReactJS" },
    { value: "HTML", label: "HTML" },
    { value: "Java", label: "Java" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "CSS", label: "CSS" },
  ];

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex flex-wrap -mx-2">
            <div className="lg:w-1/2 w-full px-2">
              <label className="block mb-2 text-lg">Job Title</label>
              <input
                type="text"
                defaultValue={"Web Developer"}
                {...register("jobTitle")}
                className="create-job-input"
                aria-label="Job Title"
              />
            </div>
            <div className="lg:w-1/2 w-full px-2">
              <label className="block mb-2 text-lg">Company Name</label>
              <input
                type="text"
                placeholder="Ex: Apple"
                {...register("companyName")}
                className="create-job-input"
                aria-label="Company Name"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-2">
            <div className="lg:w-1/2 w-full px-2">
              <label className="block mb-2 text-lg">Salary</label>
              <input
                type="text"
                placeholder="Ex: 1000"
                {...register("salary")}
                className="create-job-input"
                aria-label="Salary"
              />
            </div>
            <div className="lg:w-1/2 w-full px-2">
              <label className="block mb-2 text-lg">Location</label>
              <input
                type="text"
                placeholder="Ex: United States"
                {...register("location")}
                className="create-job-input"
                aria-label="Location"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-2">
            <div className="lg:w-1/2 w-full px-2">
              <label className="block mb-2 text-lg">Job Type</label>
              <select className="create-job-input" {...register("jobType")}>
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div className="lg:w-1/2 w-full px-2">
              <label className="block mb-2 text-lg">Experience Level</label>
              <select className="create-job-input" {...register("experienceLevel")}>
                <option value="Fresher">Fresher</option>
                <option value="Junior">Junior</option>
                <option value="Mid Level">Mid Level</option>
                <option value="Senior">Senior</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block mb-2 text-lg">Skills</label>
            <CreatableSelect
              className="basic-multi-select"
              isMulti
              onChange={setSelectedOption}
              options={options}
            />
          </div>
          <div className="flex flex-wrap -mx-2">
            <div className="lg:w-1/2 w-full px-2">
              <label className="block mb-2 text-lg">Posted By</label>
              <input
                type="email"
                placeholder="Ex: john@doe.com"
                {...register("postedBy")}
                className="create-job-input"
                aria-label="Posted By"
              />
            </div>
            <div className="lg:w-1/2 w-full px-2">
              <label className="block mb-2 text-lg">About Company</label>
              <textarea
                rows="5"
                placeholder="About your company"
                {...register("aboutCompany")}
                className="create-job-input"
                aria-label="About Company"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-2">
            <div className="lg:w-1/2 w-full px-2">
              <label className="block mb-2 text-lg">Job Description</label>
              <textarea
                rows="5"
                placeholder="About the job"
                {...register("jobDescription")}
                className="create-job-input"
                aria-label="Job Description"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="btn-primary">Post Job</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
