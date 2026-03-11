"use client";
import React, { useState, FormEvent, ReactNode, useEffect } from "react";
import { FaMapMarkerAlt, FaPlus, FaCheck, FaChevronRight, FaChevronLeft, FaTimes, FaPhone } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface JobData {
  id?: string;
  posting_as: string;
  company_name: string;
  title: string;
  description: string;
  requirements: string;
  location: string;
  job_category: string;
  employment_type: string;
  salary_min: string | number;
  salary_max: string | number;
  exp_min: string | number;
  exp_max: string | number;
  perks_and_benefits: string;
  department: string;
  job_role: string;
  qualifications: string;
  gender: string;
  skills: string;
  industry: string;
  languages: string;
  screening_questions: string;
  allow_calls: boolean;
  contact_name: string;
  contact_number: string;
  call_time_range: string;
  call_days: string;
}

interface JobFormProps {
  initialData?: JobData;
  isEdit?: boolean;
}

interface InputFieldProps {
  id: string;
  name: string;
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  placeholder: string;
  type?: string;
  icon?: ReactNode;
  required?: boolean;
}

const InputField = ({ id, name, label, value, onChange, placeholder, type = "text", icon, required = true }: InputFieldProps) => (
  <div className="relative group">
    <label htmlFor={id} className="block text-[13px] font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">
      {label}
    </label>
    <div className="relative">
      {icon && <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#00C9FF] transition-colors">{icon}</span>}
      <input
        type={type}
        id={id}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full ${icon ? "pl-11" : "pl-4"} pr-4 h-11 rounded-lg bg-gray-50 border border-gray-200 text-sm placeholder-slate-400 transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]/20 focus:border-[#00c9ff]`}
        required={required}
      />
    </div>
  </div>
);

const JobForm = ({ initialData, isEdit = false }: JobFormProps) => {
  const [activeStep, setActiveStep] = useState(1);
  const router = useRouter();
  const { user, token, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [manualQuestion, setManualQuestion] = useState("");

  const [formData, setFormData] = useState<JobData>({
    posting_as: "Company",
    company_name: "",
    title: "",
    description: "",
    requirements: "",
    location: "",
    job_category: "",
    employment_type: "Full-time",
    salary_min: "",
    salary_max: "",
    exp_min: "",
    exp_max: "",
    perks_and_benefits: "",
    department: "",
    job_role: "",
    qualifications: "Any",
    gender: "Any",
    skills: "",
    industry: "Any Industry",
    languages: "",
    screening_questions: "[]",
    allow_calls: false,
    contact_name: "",
    contact_number: "",
    call_time_range: "09:30 am to 06:30 pm",
    call_days: "Mon-Fri",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(prev => {
        const merged = { ...prev, ...initialData };
        // Ensure no null values for controlled inputs
        Object.keys(merged).forEach(key => {
          if ((merged as any)[key] === null) {
            (merged as any)[key] = "";
          }
        });
        return merged;
      });
    } else if (user?.companyName && !formData.company_name) {
      setFormData(prev => ({ ...prev, company_name: user.companyName || "" }));
    }
  }, [user, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as any;
    const val = type === 'checkbox' ? (e.target as any).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (activeStep < 5) {
      setActiveStep(activeStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (!isAuthenticated || !token) {
      alert("You must be logged in to perform this action.");
      return;
    }

    setLoading(true);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:4000/api";
      const url = isEdit ? `${backendUrl}/jobs/${formData.id}` : `${backendUrl}/jobs/create`;
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        alert(isEdit ? "Job updated successfully!" : "Job posted successfully!");
        router.push('/admin/manage-jobs');
      } else {
        alert(data.message || "Action failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const perksSuggestions = [
    "Office cab/shuttle", "Food allowance", "Health insurance", "Annual bonus", "Provident fund", "Remote work"
  ];

  const togglePerk = (perk: string) => {
    const currentPerks = formData.perks_and_benefits.split(',').map(p => p.trim()).filter(p => p);
    if (currentPerks.includes(perk)) {
      setFormData(prev => ({ ...prev, perks_and_benefits: currentPerks.filter(p => p !== perk).join(', ') }));
    } else {
      setFormData(prev => ({ ...prev, perks_and_benefits: [...currentPerks, perk].join(', ') }));
    }
  };

  const handleChipClick = (field: keyof JobData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addQuestion = (question: string) => {
    const questions = JSON.parse(formData.screening_questions || "[]");
    if (!questions.includes(question) && question.trim() !== "") {
      setFormData(prev => ({ ...prev, screening_questions: JSON.stringify([...questions, question]) }));
    }
  };

  const handleAddManualQuestion = () => {
    if (manualQuestion.trim()) {
      addQuestion(manualQuestion.trim());
      setManualQuestion("");
    }
  };

  const removeQuestion = (qToRemove: string) => {
    const questions = JSON.parse(formData.screening_questions || "[]");
    setFormData(prev => ({ ...prev, screening_questions: JSON.stringify(questions.filter((q: string) => q !== qToRemove)) }));
  };

  const screeningSuggestions = [
    "What's your current salary?", "What's your expected salary?", "What's your notice period?", "Are you willing to attend in-person interview?"
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 mt-8">
      {/* Steps Sidebar */}
      <div className="lg:w-64 shrink-0">
        <div className="space-y-1 sticky top-10">
          {[
            { id: 1, label: "Job details" },
            { id: 2, label: "Candidate preferences" },
            { id: 3, label: "Screening questions" },
            { id: 4, label: "Job description" },
            { id: 5, label: "Communication preferences" }
          ].map((step) => (
            <div key={step.id} className="flex items-center gap-4 group">
              <div className="flex flex-col items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                    activeStep === step.id ? "bg-[#00c9ff] text-white ring-4 ring-[#00c9ff]/20" : 
                    activeStep > step.id ? "bg-[#00c9ff] text-white" : "bg-white border-2 border-gray-200 text-gray-400"
                  }`}
                  onClick={() => activeStep >= step.id || isEdit ? setActiveStep(step.id) : null}
                >
                  {activeStep > step.id ? <FaCheck className="text-[10px]" /> : step.id}
                </div>
                {step.id < 5 && <div className="w-0.5 h-10 bg-gray-200 my-1"></div>}
              </div>
              <span 
                className={`text-sm font-medium transition-colors cursor-pointer ${activeStep === step.id ? "text-[#00c9ff]" : "text-gray-500"}`}
                onClick={() => activeStep >= step.id || isEdit ? setActiveStep(step.id) : null}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Area */}
      <div className="flex-1 max-w-3xl bg-white p-8 sm:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Step 1: Job Details */}
          {activeStep === 1 && (
            <>
              <section>
                <h3 className="text-base font-bold text-gray-900 mb-4">You're {isEdit ? "editing" : "posting"} this job as a:</h3>
                <div className="flex gap-3">
                  {["Company", "Consultancy"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, posting_as: type }))}
                      className={`px-6 py-2.5 rounded-full text-sm font-semibold border-2 transition-all ${formData.posting_as === type ? "bg-white border-[#00c9ff] text-[#00c9ff] shadow-md ring-2 ring-[#00c9ff]/10" : "bg-gray-50 border-gray-100 text-gray-500 hover:border-gray-200"}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </section>

              <section className="space-y-8">
                <InputField id="company_name" name="company_name" label="Your company name" value={formData.company_name} onChange={handleChange} placeholder="Enter company name" />
                <InputField id="title" name="title" label="Job title" value={formData.title} onChange={handleChange} placeholder="Ex. Sales manager" />

                <div className="space-y-3">
                  <label className="block text-[13px] font-semibold text-gray-600 uppercase tracking-wider">Work experience</label>
                  <div className="flex items-center gap-3">
                    <select name="exp_min" value={formData.exp_min} onChange={handleChange} className="flex-1 h-11 px-4 rounded-lg bg-gray-50 border border-gray-200 text-sm">
                      <option value="">Min exp.</option>
                      {[...Array(31)].map((_, i) => <option key={i} value={i}>{i} yrs</option>)}
                    </select>
                    <span className="text-gray-400 text-sm">to</span>
                    <select name="exp_max" value={formData.exp_max} onChange={handleChange} className="flex-1 h-11 px-4 rounded-lg bg-gray-50 border border-gray-200 text-sm">
                      <option value="">Max exp.</option>
                      {[...Array(31)].map((_, i) => <option key={i} value={i}>{i} yrs</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-[13px] font-semibold text-gray-600 uppercase tracking-wider">Salary per month (₹)</label>
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₹</span>
                      <input type="number" name="salary_min" value={formData.salary_min} onChange={handleChange} placeholder="Min" className="w-full pl-8 pr-4 h-11 rounded-lg bg-gray-50 border border-gray-200 text-sm" />
                    </div>
                    <span className="text-gray-400 text-sm">to</span>
                    <div className="relative flex-1">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₹</span>
                      <input type="number" name="salary_max" value={formData.salary_max} onChange={handleChange} placeholder="Max" className="w-full pl-8 pr-4 h-11 rounded-lg bg-gray-50 border border-gray-200 text-sm" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-[13px] font-semibold text-gray-600 uppercase tracking-wider">Perks and Benefits</label>
                  <div className="flex flex-wrap gap-2">
                    {perksSuggestions.map(perk => (
                      <button key={perk} type="button" onClick={() => togglePerk(perk)} className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${formData.perks_and_benefits.includes(perk) ? "bg-[#00c9ff] border-[#00c9ff] text-white" : "bg-white border-gray-200 text-gray-600 hover:border-[#00c9ff]"}`}>
                        {formData.perks_and_benefits.includes(perk) ? <FaCheck /> : <FaPlus />} {perk}
                      </button>
                    ))}
                  </div>
                </div>
              </section>
            </>
          )}

          {/* Step 2: Candidate Preferences */}
          {activeStep === 2 && (
            <section className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InputField id="department" name="department" label="Department" value={formData.department} onChange={handleChange} placeholder="Ex. Sales & Marketing" />
                <InputField id="job_role" name="job_role" label="Job Role" value={formData.job_role} onChange={handleChange} placeholder="Ex. Account Manager" />
              </div>

              <InputField id="location" name="location" label="Job Location" value={formData.location} onChange={handleChange} placeholder="Ex. Mumbai, Maharashtra" icon={<FaMapMarkerAlt />} />

              <div className="space-y-4">
                <label className="block text-[13px] font-semibold text-gray-600 uppercase tracking-wider">Qualification</label>
                <div className="flex flex-wrap gap-2">
                  {["12th Pass", "Diploma", "Graduate", "Post-Graduate", "Any"].map(q => (
                    <button key={q} type="button" onClick={() => handleChipClick("qualifications", q)} className={`px-5 py-2 rounded-full text-xs font-semibold border transition-all ${formData.qualifications === q ? "bg-[#00c9ff] border-[#00c9ff] text-white" : "bg-white border-gray-200 text-gray-600"}`}>
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-[13px] font-semibold text-gray-600 uppercase tracking-wider">Gender Preference</label>
                <div className="flex flex-wrap gap-2">
                  {["Any", "Male", "Female"].map(g => (
                    <button key={g} type="button" onClick={() => handleChipClick("gender", g)} className={`px-5 py-2 rounded-full text-xs font-semibold border transition-all ${formData.gender === g ? "bg-[#00c9ff] border-[#00c9ff] text-white" : "bg-white border-gray-200 text-gray-600"}`}>
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <InputField id="skills" name="skills" label="Key Skills" value={formData.skills} onChange={handleChange} placeholder="Ex. CRM, Sales Pitching..." />
              <InputField id="industry" name="industry" label="Preferred Industry" value={formData.industry} onChange={handleChange} placeholder="Ex. IT Services" />
            </section>
          )}

          {/* Step 3: Screening Questions */}
          {activeStep === 3 && (
            <section className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-base font-bold text-gray-900 uppercase">Screening Questions</h3>
                
                {/* Manual Question Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={manualQuestion}
                    onChange={(e) => setManualQuestion(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddManualQuestion();
                      }
                    }}
                    placeholder="Type your own question here..."
                    className="flex-1 h-11 px-4 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]/20 focus:border-[#00c9ff]"
                  />
                  <button
                    type="button"
                    onClick={handleAddManualQuestion}
                    className="px-6 h-11 bg-gray-900 text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-all flex items-center gap-2"
                  >
                    <FaPlus className="text-xs" /> Add
                  </button>
                </div>

                <div className="space-y-3 pt-2">
                  {JSON.parse(formData.screening_questions || "[]").map((q: string, i: number) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <span className="text-sm font-medium text-gray-700">{q}</span>
                      <button type="button" onClick={() => removeQuestion(q)} className="text-red-400 hover:text-red-600"><FaTimes /></button>
                    </div>
                  ))}
                </div>
                {JSON.parse(formData.screening_questions || "[]").length === 0 && (
                  <div className="text-center py-6 border-2 border-dashed border-gray-100 rounded-xl text-gray-400 text-sm">No screening questions added yet.</div>
                )}
              </div>

              <div className="space-y-4">
                <label className="block text-[13px] font-semibold text-gray-600 uppercase tracking-wider">Suggested Questions</label>
                <div className="flex flex-wrap gap-2">
                  {screeningSuggestions.map(q => (
                    <button key={q} type="button" onClick={() => addQuestion(q)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100 uppercase tracking-tight">
                      <FaPlus /> {q}
                    </button>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Step 4: Job Description */}
          {activeStep === 4 && (
            <section className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[13px] font-semibold text-gray-600 uppercase tracking-wider">Job Description</label>
                <textarea name="description" rows={10} value={formData.description} onChange={handleChange} placeholder="Tell candidates about the role..." className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 text-sm min-h-[250px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]/20" required />
              </div>
            </section>
          )}

          {/* Step 5: Communication */}
          {activeStep === 5 && (
            <section className="space-y-8">
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#00c9ff]/10 text-[#00c9ff] rounded-full flex items-center justify-center"><FaPhone /></div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">Communication Preferences</h4>
                      <p className="text-xs text-gray-500">Allow candidates to call you directly?</p>
                    </div>
                  </div>
                  <div className="flex bg-white rounded-lg p-1 border border-gray-200">
                    <button type="button" onClick={() => setFormData(prev => ({ ...prev, allow_calls: true }))} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${formData.allow_calls ? "bg-[#00c9ff] text-white" : "text-gray-500"}`}>Yes</button>
                    <button type="button" onClick={() => setFormData(prev => ({ ...prev, allow_calls: false }))} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${!formData.allow_calls ? "bg-[#00c9ff] text-white" : "text-gray-500"}`}>No</button>
                  </div>
                </div>

                {formData.allow_calls && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InputField id="contact_name" name="contact_name" label="Recruiter Name" value={formData.contact_name} onChange={handleChange} placeholder="Ex. John Doe" />
                      <InputField id="contact_number" name="contact_number" label="Mobile Number" value={formData.contact_number} onChange={handleChange} placeholder="Ex. 9876543210" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InputField id="call_time_range" name="call_time_range" label="Best time to call" value={formData.call_time_range} onChange={handleChange} placeholder="Ex. 10:00 am to 05:00 pm" />
                      <InputField id="call_days" name="call_days" label="Available Days" value={formData.call_days} onChange={handleChange} placeholder="Ex. Mon-Sat" />
                    </div>
                  </div>
                )}
              </div>

              <div className="text-center py-4">
               <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl"><FaCheck /></div>
               <h3 className="text-xl font-bold text-gray-900 mb-1">Ready to {isEdit ? "Update" : "Publish"}!</h3>
               <p className="text-gray-500 text-xs mb-6">Review your job details before submitting.</p>
               <div className="p-5 bg-blue-50 rounded-xl text-left border border-blue-100 max-w-sm mx-auto">
                  <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-3">Snapshot</p>
                  <p className="font-bold text-gray-800 text-sm leading-tight">{formData.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{formData.company_name} • {formData.location}</p>
                  <div className="mt-4 flex gap-4 text-[11px] font-bold">
                     <span className="text-blue-600">₹{formData.salary_min} - ₹{formData.salary_max}</span>
                     <span className="text-gray-400">{formData.exp_min} - {formData.exp_max} Yrs</span>
                  </div>
               </div>
              </div>
            </section>
          )}

          {/* Footer Controls */}
          <div className="pt-8 border-t border-gray-100 flex justify-between items-center">
            <button type="button" onClick={handleBack} disabled={activeStep === 1} className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${activeStep === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}>
              <FaChevronLeft className="text-xs" /> Back
            </button>
            <button type="submit" disabled={loading} className="h-12 px-10 bg-[#00c9ff] text-white font-bold rounded-full shadow-lg shadow-blue-100 hover:bg-[#00b4e6] hover:translate-y-[-2px] transition-all disabled:opacity-50 flex items-center gap-2">
              {loading ? "Processing..." : activeStep === 5 ? (isEdit ? "Update Job" : "Publish Job") : "Next"}
              {activeStep < 5 && <FaChevronRight className="text-xs" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;
