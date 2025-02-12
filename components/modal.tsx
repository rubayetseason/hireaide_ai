// @ts-nocheck
"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";

const schema = z.object({
  fullname: z.string().min(1, "Full Name is required"),
  companyname: z.string().min(1, "Company Name is required"),
  email: z.string().email("Invalid email address"),
  jobtitle: z.string().min(1, "Job Title is required"),
  companysize: z.string().min(1, "Company Size is required"),
  interviewSchedulingMethod: z.string().min(1, "Please select an option"),
  interviewChallenges: z.array(z.string()).optional(),
  otherChallenge: z.string().optional(),
  interviewCount: z.string().min(1, "Please select an option"),
  betaAccess: z.string().min(1, "Please select an option"),
  openToCall: z.string().min(1, "Please select an option"),
  calendly: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.startsWith("http"), // Only validate if entered
      "Calendly link must be a valid URL"
    ),
});

const Modal = () => {
  const [showCalendly, setShowCalendly] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      interviewChallenges: [],
      otherChallenge: "",
      calendly: "",
    },
  });

  // Watch the value of "Would you be open to a short call?"
  const openToCall = watch("openToCall");

  // Toggle Calendly field visibility
  if (openToCall === "Yes" && !showCalendly) setShowCalendly(true);
  if (openToCall !== "Yes" && showCalendly) {
    setShowCalendly(false);
    setValue("calendly", ""); // Reset Calendly link
  }

  const onSubmit = (data: any) => {
    console.log("Form Submitted:", data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="btn group mb-4 w-full bg-linear-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-sm hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
        >
          <span className="relative inline-flex items-center">
            Coming Soon
            <span className="ml-1 tracking-normal text-blue-300 transition-transform group-hover:translate-x-0.5">
              -&gt;
            </span>
          </span>
        </button>
      </DialogTrigger>
      <DialogContent
        className={
          "lg:max-w-screen-lg overflow-y-scroll lg:overflow-auto max-h-screen"
        }
      >
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
            <div>
              <label>Full Name</label>
              <input
                className="mt-1 w-full"
                {...register("fullname")}
                placeholder="Full Name"
              />
              <p className="mt-1 text-red-500">{errors.fullname?.message}</p>
            </div>
            <div>
              <label>Company Name</label>
              <input
                className="mt-1 w-full"
                {...register("companyname")}
                placeholder="Company Name"
              />
              <p className="mt-1 text-red-500">{errors.companyname?.message}</p>
            </div>
            <div>
              <label>Work Email</label>
              <input
                className="mt-1 w-full"
                type="email"
                {...register("email")}
                placeholder="Email"
              />
              <p className="mt-1 text-red-500">{errors.email?.message}</p>
            </div>
            <div>
              <label>Job Title</label>
              <input
                className="mt-1 w-full"
                {...register("jobtitle")}
                placeholder="Job Title"
              />
              <p className="mt-1 text-red-500">{errors.jobtitle?.message}</p>
            </div>
            <div>
              <label>Company Size</label>
              <select className="mt-1 w-full" {...register("companysize")}>
                <option value="">Select...</option>
                <option value="1 - 10">1 - 10</option>
                <option value="11 - 50">11 - 50</option>
                <option value="51 - 200">51 - 200</option>
                <option value="201 - 500">201 - 500</option>
                <option value="500+">500+</option>
              </select>
              <p className="mt-1 text-red-500">{errors.companysize?.message}</p>
            </div>
            <div>
              <label>How does your company schedule interviews?</label>
              <select
                className="mt-1 w-full"
                {...register("interviewSchedulingMethod")}
              >
                <option value="">Select...</option>
                <option value="manually via email">Manually via email</option>
                <option value="using scheduling tools">
                  Using scheduling tools
                </option>
                <option value="via an ATS">Via an ATS</option>
              </select>
              <p className="mt-1 text-red-500">
                {errors.interviewSchedulingMethod?.message}
              </p>
            </div>
            <div>
              <label>
                What are your biggest interview scheduling challenges?
              </label>
              <div className="mt-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  "Coordinating availability",
                  "Rescheduling",
                  "Reducing time-to-hire",
                  "Lack of automation",
                ].map((challenge) => (
                  <div key={challenge} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={challenge}
                      {...register("interviewChallenges")}
                    />
                    <label>{challenge}</label>
                  </div>
                ))}
                <input
                  className="mt-1 w-full"
                  {...register("otherChallenge")}
                  placeholder="Other (Specify)"
                />
              </div>
            </div>
            <div>
              <label>How many interviews per month?</label>
              <select className="mt-1 w-full" {...register("interviewCount")}>
                <option value="">Select...</option>
                <option value="1 - 10">1 - 10</option>
                <option value="11 - 50">11 - 50</option>
                <option value="51 - 100">51 - 100</option>
                <option value="100+">100+</option>
              </select>
              <p className="mt-1 text-red-500">
                {errors.interviewCount?.message}
              </p>
            </div>
            <div>
              <label>Would you like early access to beta testing?</label>
              <select className="mt-1 w-full" {...register("betaAccess")}>
                <option value="">Select...</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <p className="mt-1 text-red-500">{errors.betaAccess?.message}</p>
            </div>
            <div>
              <label>Would you be open to a short call?</label>
              <select className="mt-1 w-full" {...register("openToCall")}>
                <option value="">Select...</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            {showCalendly && (
              <div>
                <label>Add a Calendly link</label>
                <input
                  className="mt-1 w-full"
                  {...register("calendly")}
                  placeholder="Link"
                />
                <p className="mt-1 text-red-500">{errors.calendly?.message}</p>
              </div>
            )}
          </div>

          <DialogFooter className="mt-5">
            <button className="btn text-white bg-blue-600" type="submit">
              Save changes
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
