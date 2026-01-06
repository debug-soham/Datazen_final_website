import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, ChevronRight, ChevronLeft, Check, User, Trophy, Lightbulb, Users, Info } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

// --- Validation Schemas ---

const step1Schema = z.object({
  teamName: z.string().min(2, "Team name is required"),
  college: z.string().min(2, "College name is required"),
  year: z.string().min(1, "Year is required"),
  teamSize: z.string().min(1, "Team size is required"),
});

const step2Schema = z.object({
  leaderName: z.string().min(2, "Leader name is required"),
  leaderResume: z.string().url("Valid Resume URL required (include https://)"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  members: z.array(z.object({
    name: z.string().min(2, "Member name is required"),
    resume: z.string().url("Valid Resume URL required (include https://)")
  })).optional(),
});

const combinedSchema = step1Schema.merge(step2Schema);
type FormData = z.infer<typeof combinedSchema>;

// --- Components ---

const Stepper = ({ currentStep, steps }: { currentStep: number; steps: { id: number; name: string; icon: any }[] }) => {
  return (
    <div className="relative w-full mb-10 px-2">
      <div className="absolute top-5 left-0 w-full h-[2px] z-0">
        <div className="absolute top-0 left-5 right-5 h-full bg-muted/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-power-red to-vitality-red"
            initial={{ width: "0%" }}
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>
      <div className="flex justify-between w-full relative z-10">
        {steps.map((step, index) => {
          const isCompleted = currentStep > index;
          const isCurrent = currentStep === index;
          return (
            <div key={step.id} className="flex flex-col items-center gap-3">
              <motion.div
                animate={{
                  backgroundColor: isCompleted || isCurrent ? "hsl(var(--primary))" : "hsl(var(--card))",
                  borderColor: isCompleted || isCurrent ? "hsl(var(--primary))" : "hsl(var(--muted))",
                  color: isCompleted || isCurrent ? "#ffffff" : "hsl(var(--muted-foreground))",
                  scale: isCurrent ? 1.1 : 1
                }}
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 shadow-md ${isCurrent ? 'ring-4 ring-primary/20 shadow-lg shadow-red-500/20' : ''}`}
              >
                {isCompleted ? <Check size={18} strokeWidth={3} /> : <step.icon size={18} />}
              </motion.div>
              <span className={`text-xs font-semibold tracking-wide transition-colors duration-300 ${isCurrent ? "text-primary" : "text-muted-foreground"}`}>{step.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function Register() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [previousStep, setPreviousStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const steps = [
    { id: 0, name: "Team Info", icon: Trophy },
    { id: 1, name: "Members", icon: Users },
  ];

  const form = useForm<FormData>({
    resolver: zodResolver(combinedSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      teamName: "", college: "", year: "", teamSize: "2",
      leaderName: "", leaderResume: "", email: "", phone: "",
      members: []
    }
  });

  const { register, control, trigger, handleSubmit, setValue, watch, formState: { errors }, getValues, clearErrors } = form;
  const { fields, replace } = useFieldArray({ control, name: "members" });
  const [validatedSteps, setValidatedSteps] = useState<number[]>([]);

  const watchTeamSize = watch("teamSize");

  useEffect(() => {
    const size = parseInt(watchTeamSize) - 1;
    const currentMembers = Array.from({ length: size }, () => ({ name: "", resume: "" }));
    replace(currentMembers);
  }, [watchTeamSize, replace]);

  const nextStep = async () => {
    let fieldsToValidate: any[] = [];
    if (currentStep === 0) {
      fieldsToValidate = ["teamName", "college", "year", "teamSize"];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setValidatedSteps((prev) => [...prev, currentStep]);
      setPreviousStep(currentStep);
      setCurrentStep((prev) => prev + 1);

      // Prevent errors from showing on step 2 by default
      if (currentStep === 0) {
        clearErrors(["leaderName", "leaderResume", "email", "phone", "members"]);
      }
    }
  };

  const prevStep = () => {
    setPreviousStep(currentStep);
    setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = async (data: FormData) => {
    setSubmitAttempted(true);
    setIsSubmitting(true);
    
    try {
      const response = await apiRequest("POST", "/api/register", data);
      const result = await response.json();
      
      if (result.success) {
        setIsSuccess(true);
        toast({
          title: "Registration Successful!",
          description: "Your team has been registered successfully.",
          variant: "default",
        });
      } else {
        throw new Error(result.message || "Registration failed");
      }
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 30 : -30, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 30 : -30, opacity: 0 }),
  };

  const direction = currentStep - previousStep;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-24 relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="grid lg:grid-cols-2 gap-12 w-full max-w-6xl items-center">

          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="space-y-8 hidden lg:block">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-power-red/30 bg-power-red/10 text-power-red text-sm font-medium mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                Registrations Open
              </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">Case Study <br /><span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-power-red to-vitality-red">Competition</span></h1>
              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">Unleash your analytical skills. Solve real-world business problems using data storytelling and visualization techniques.</p>
            </div>
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-card/50 border border-border backdrop-blur-sm">
                <div className="h-10 w-10 rounded-full bg-power-red/10 flex items-center justify-center text-power-red"><Trophy size={20} /></div>
                <div><h3 className="font-semibold">Prize Pool</h3><p className="text-sm text-muted-foreground">Worth ₹50,000 + Certificates</p></div>
              </div>
              {/* <div className="flex items-center gap-4 p-4 rounded-lg bg-card/50 border border-border backdrop-blur-sm">
                <div className="h-10 w-10 rounded-full bg-vitality-red/10 flex items-center justify-center text-vitality-red"><Lightbulb size={20} /></div>
                <div><h3 className="font-semibold">Problem Statements</h3><p className="text-sm text-muted-foreground">Finance, Healthcare, and Social Good</p></div>
              </div> */}
              <div className="flex items-center gap-4 p-4 rounded-lg bg-card/50 border border-border backdrop-blur-sm">
                <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500"><Users size={20} /></div>
                <div><h3 className="font-semibold">Team Size</h3><p className="text-sm text-muted-foreground">2 to 3 Members allowed</p></div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="w-full mx-auto">
            <div className="bg-card/80 border border-border/50 rounded-2xl shadow-2xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-power-red to-vitality-red" />

              {isSuccess ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center text-center py-10 space-y-6 min-h-[500px]">
                  <div className="bg-green-500/10 text-green-500 rounded-full p-6"><Check className="h-12 w-12 stroke-[3]" /></div>
                  <h2 className="text-3xl font-bold tracking-tight text-primary">Registration Successful!</h2>
                  <p className="text-muted-foreground max-w-md">Team **{getValues('teamName')}** has been successfully registered.</p>
                  <Button onClick={() => window.location.href = "/"} className="mt-4 bg-gradient-to-r from-power-red to-vitality-red text-white">Go to Homepage</Button>
                </motion.div>
              ) : (
                <>
                  <Stepper currentStep={currentStep} steps={steps} />
                  <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                    <div className="relative min-h-[450px]">
                      <AnimatePresence custom={direction} mode="wait">
                        {/* STEP 1: TEAM INFO */}
                        {currentStep === 0 && (
                          <motion.div key="step1" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-4">
                            <div className="space-y-2">
                              <Label>Team Name</Label>
                              <Input placeholder="e.g. Data Wizards" {...register("teamName")} className="bg-background/50" />
                              {errors.teamName && <span className="text-xs text-red-500">{errors.teamName.message}</span>}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>College Name</Label>
                                <Input placeholder="Institute Name" {...register("college")} className="bg-background/50" />
                                {errors.college && <span className="text-xs text-red-500">{errors.college.message}</span>}
                              </div>
                              <div className="space-y-2">
                                <Label>Year of Study</Label>
                                <Select onValueChange={(val) => setValue("year", val)} defaultValue={watch("year")}>
                                  <SelectTrigger className="bg-background/50"><SelectValue placeholder="Select Year" /></SelectTrigger>
                                  <SelectContent><SelectItem value="FE">First Year</SelectItem><SelectItem value="SE">Second Year</SelectItem><SelectItem value="TE">Third Year</SelectItem><SelectItem value="BE">Final Year</SelectItem></SelectContent>
                                </Select>
                                {errors.year && <span className="text-xs text-red-500">{errors.year.message}</span>}
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label>Team Size</Label>
                              <Select onValueChange={(val) => setValue("teamSize", val)} defaultValue={watch("teamSize")}>
                                <SelectTrigger className="bg-background/50"><SelectValue placeholder="Select Size" /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="2">2 Members</SelectItem>
                                  <SelectItem value="3">3 Members</SelectItem>
                                </SelectContent>
                              </Select>
                              {errors.teamSize && <span className="text-xs text-red-500">{errors.teamSize.message}</span>}
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 2: MEMBERS & RESUMES */}
                        {currentStep === 1 && (
                          <motion.div key="step2" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
                            <div className="flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-500 mb-4">
                              <Info size={18} className="mt-0.5 shrink-0" />
                              <p className="text-xs leading-relaxed"><strong>Note:</strong> Please ensure that your resume Drive links are set to <strong>"Anyone with the link"</strong>.</p>
                            </div>

                            <div className="p-4 border border-power-red/20 rounded-lg bg-power-red/5 space-y-4">
                              <h3 className="text-sm font-bold flex items-center gap-2 text-primary"><User size={16} /> Leader (Member 1)</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Name</Label>
                                  <Input placeholder="Full Name" {...register("leaderName")} className="bg-background/50" />
                                  {errors.leaderName && submitAttempted && <span className="text-xs text-red-500">{errors.leaderName.message}</span>}
                                </div>
                                <div className="space-y-2">
                                  <Label>Resume URL</Label>
                                  <Input placeholder="Drive Link" {...register("leaderResume")} className="bg-background/50" />
                                  {errors.leaderResume && submitAttempted && <span className="text-xs text-red-500">{errors.leaderResume.message}</span>}
                                </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Email</Label>
                                  <Input type="email" placeholder="leader@somaiya.edu" {...register("email")} className="bg-background/50" />
                                  {errors.email && submitAttempted && <span className="text-xs text-red-500">{errors.email.message}</span>}
                                </div>
                                <div className="space-y-2">
                                  <Label>Phone</Label>
                                  <Input placeholder="+91 XXXXX XXXXX" {...register("phone")} className="bg-background/50" />
                                  {errors.phone && submitAttempted && <span className="text-xs text-red-500">{errors.phone.message}</span>}
                                </div>
                              </div>
                            </div>

                            {fields.map((field, index) => (
                              <div key={field.id} className="p-4 border border-border rounded-lg bg-card/30 space-y-4">
                                <h3 className="text-sm font-bold flex items-center gap-2"><Users size={16} /> Member {index + 2}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label>Name</Label>
                                    <Input placeholder="Full Name" {...register(`members.${index}.name` as const)} className="bg-background/50" />
                                    {errors.members?.[index]?.name && submitAttempted && <span className="text-xs text-red-500">{errors.members[index]?.name?.message}</span>}
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Resume URL</Label>
                                    <Input placeholder="Drive Link" {...register(`members.${index}.resume` as const)} className="bg-background/50" />
                                    {errors.members?.[index]?.resume && submitAttempted && <span className="text-xs text-red-500">{errors.members[index]?.resume?.message}</span>}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="flex justify-between mt-8 pt-4 border-t border-border">
                      <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 0} className={currentStep === 0 ? "opacity-0 pointer-events-none" : ""}><ChevronLeft className="mr-2 h-4 w-4" /> Previous</Button>
                      {currentStep === steps.length - 1 ? (
                        <Button type="submit" className="bg-gradient-red text-white" disabled={isSubmitting}>{isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />} Submit Registration</Button>
                      ) : (
                        <Button type="button" onClick={nextStep} className="bg-primary text-white">Next Step <ChevronRight className="ml-2 h-4 w-4" /></Button>
                      )}
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}