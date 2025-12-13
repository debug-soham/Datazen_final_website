import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, ChevronRight, ChevronLeft, Check, User, Target, Trophy, Lightbulb, Users } from "lucide-react";

// --- Validation Schemas ---

const step1Schema = z.object({
  teamName: z.string().min(2, "Team name is required"),
  leaderName: z.string().min(2, "Leader name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  college: z.string().min(2, "College name is required"),
  year: z.string().min(1, "Year is required"),
  teamSize: z.string().min(1, "Team size is required"),
});

const step2Schema = z.object({
  problemPreference: z.string().min(1, "Please select a track"),
  motivation: z.string().optional(),
});

const combinedSchema = step1Schema.merge(step2Schema);
type FormData = z.infer<typeof combinedSchema>;

// --- Components ---

const Stepper = ({ currentStep, steps }: { currentStep: number; steps: { id: number; name: string; icon: any }[] }) => {
  return (
    <div className="relative w-full mb-10 px-2"> 
      {/* Line Container */}
      <div className="absolute top-5 left-0 w-full h-[2px] z-0">
        <div className="absolute top-0 left-5 right-5 h-full bg-muted/30 rounded-full overflow-hidden">
           {/* Active Gradient Line */}
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
                initial={false}
                animate={{
                  backgroundColor: isCompleted || isCurrent ? "hsl(var(--primary))" : "hsl(var(--card))",
                  borderColor: isCompleted || isCurrent ? "hsl(var(--primary))" : "hsl(var(--muted))",
                  color: isCompleted || isCurrent ? "#ffffff" : "hsl(var(--muted-foreground))",
                  scale: isCurrent ? 1.1 : 1
                }}
                transition={{ duration: 0.3 }}
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 shadow-md
                  ${isCurrent ? 'ring-4 ring-primary/20 shadow-lg shadow-red-500/20' : ''}
                `}
              >
                {isCompleted ? <Check size={18} strokeWidth={3} /> : <step.icon size={18} />}
              </motion.div>
              <span className={`text-xs font-semibold tracking-wide transition-colors duration-300 ${isCurrent ? "text-primary" : "text-muted-foreground"}`}>
                {step.name}
              </span>
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
  // 1. New state for success screen
  const [isSuccess, setIsSuccess] = useState(false);

  const steps = [
    { id: 0, name: "Team Details", icon: User },
    { id: 1, name: "Track Selection", icon: Target },
  ];

  const form = useForm<FormData>({
    resolver: zodResolver(combinedSchema),
    mode: "onChange",
    defaultValues: {
      teamName: "", leaderName: "", email: "", phone: "",
      college: "", year: "", teamSize: "", 
      problemPreference: "", motivation: ""
    }
  });

  const { register, trigger, handleSubmit, setValue, watch, formState: { errors }, getValues } = form;

  const nextStep = async () => {
    let isValid = false;
    if (currentStep === 0) {
      isValid = await trigger(["teamName", "leaderName", "email", "phone", "college", "year", "teamSize"]);
    }

    if (isValid) {
      setPreviousStep(currentStep);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setPreviousStep(currentStep);
    setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Final Form Data:", data);
    
    // 2. Updated success logic
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 30 : -30,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 30 : -30,
      opacity: 0,
    }),
  };

  const direction = currentStep - previousStep;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Main content container changed to a centered grid layout on large screens */}
      <main className="flex-1 container mx-auto px-4 py-24 relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="grid lg:grid-cols-2 gap-12 w-full max-w-6xl items-center">
          
          {/* --- LEFT COLUMN: COMPETITION DETAILS (Requested Content) --- */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-8 hidden lg:block" /* Hide on small screens */
          >
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-power-red/30 bg-power-red/10 text-power-red text-sm font-medium mb-2">
                    <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    Registrations Open
                </div>

                <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                    Case Study <br />
                    <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-power-red to-vitality-red">
                        Competition
                    </span>
                </h1>
                
                <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                    Unleash your analytical skills. Solve real-world business problems using data storytelling and visualization techniques.
                </p>
            </div>

            {/* Feature Cards */}
            <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-card/50 border border-border backdrop-blur-sm">
                    <div className="h-10 w-10 rounded-full bg-power-red/10 flex items-center justify-center text-power-red">
                    <Trophy size={20} />
                    </div>
                    <div>
                    <h3 className="font-semibold">Prize Pool</h3>
                    <p className="text-sm text-muted-foreground">Worth ₹10,000 + Certificates</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 rounded-lg bg-card/50 border border-border backdrop-blur-sm">
                    <div className="h-10 w-10 rounded-full bg-vitality-red/10 flex items-center justify-center text-vitality-red">
                    <Lightbulb size={20} />
                    </div>
                    <div>
                    <h3 className="font-semibold">Problem Statements</h3>
                    <p className="text-sm text-muted-foreground">Finance, Healthcare, and Social Good</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg bg-card/50 border border-border backdrop-blur-sm">
                    <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <Users size={20} />
                    </div>
                    <div>
                    <h3 className="font-semibold">Team Size</h3>
                    <p className="text-sm text-muted-foreground">1 to 4 Members allowed</p>
                    </div>
                </div>
            </div>
          </motion.div>
          {/* --- END LEFT COLUMN --- */}

          {/* --- RIGHT COLUMN: REGISTRATION FORM/SUCCESS SCREEN --- */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full mx-auto"
          >
            {/* The centralized title is removed here as it's now on the left */}
            
            <div className="bg-card/80 border border-border/50 rounded-2xl shadow-2xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden">
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-power-red to-vitality-red" />
              
              {/* 3. Conditional Rendering of Success Screen or Form */}
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center text-center py-10 space-y-6 min-h-[500px]" // Added min-h for consistent height
                >
                  <motion.div
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="bg-green-500/10 text-green-500 rounded-full p-6"
                  >
                    <Check className="h-12 w-12 stroke-[3]" />
                  </motion.div>
                  
                  <h2 className="text-3xl font-bold tracking-tight text-primary">Registration Successful!</h2>
                  
                  <p className="text-muted-foreground max-w-md">
                    Team **{getValues('teamName')}** has been successfully registered for the Case Study Competition.
                    You will receive a confirmation email shortly with the next steps and important details.
                  </p>

                  <Button onClick={() => window.location.href = "/"} className="mt-4 bg-gradient-to-r from-power-red to-vitality-red text-white hover:opacity-90">
                    Go to Homepage
                  </Button>
                </motion.div>
              ) : (
                <>
                  <Stepper currentStep={currentStep} steps={steps} />

                  <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                    <div className="relative min-h-[400px]"> 
                      <AnimatePresence custom={direction} mode="wait">
                        
                        {/* STEP 1: TEAM DETAILS */}
                        {currentStep === 0 && (
                          <motion.div
                            key="step1"
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3, type: "tween" }}
                            className="space-y-4"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Team Name</Label>
                                <Input placeholder="e.g. Data Wizards" {...register("teamName")} className="bg-background/50 focus:bg-background" />
                                {errors.teamName && <span className="text-xs text-red-500">{errors.teamName.message}</span>}
                              </div>
                              <div className="space-y-2">
                                <Label>Team Leader</Label>
                                <Input placeholder="Full Name" {...register("leaderName")} className="bg-background/50 focus:bg-background" />
                                {errors.leaderName && <span className="text-xs text-red-500">{errors.leaderName.message}</span>}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Email</Label>
                                <Input type="email" placeholder="leader@somaiya.edu" {...register("email")} className="bg-background/50 focus:bg-background" />
                                {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
                              </div>
                              <div className="space-y-2">
                                <Label>Phone</Label>
                                <Input placeholder="+91 XXXXX XXXXX" {...register("phone")} className="bg-background/50 focus:bg-background" />
                                {errors.phone && <span className="text-xs text-red-500">{errors.phone.message}</span>}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>College</Label>
                                <Input placeholder="Institute Name" {...register("college")} className="bg-background/50 focus:bg-background" />
                                {errors.college && <span className="text-xs text-red-500">{errors.college.message}</span>}
                              </div>
                              <div className="space-y-2">
                                <Label>Year</Label>
                                <Select onValueChange={(val) => setValue("year", val)} defaultValue={watch("year")}>
                                  <SelectTrigger className="bg-background/50 focus:bg-background"><SelectValue placeholder="Select Year" /></SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="FE">First Year</SelectItem>
                                    <SelectItem value="SE">Second Year</SelectItem>
                                    <SelectItem value="TE">Third Year</SelectItem>
                                    <SelectItem value="BE">Final Year</SelectItem>
                                  </SelectContent>
                                </Select>
                                {errors.year && <span className="text-xs text-red-500">{errors.year.message}</span>}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label>Team Size</Label>
                              <Select onValueChange={(val) => setValue("teamSize", val)} defaultValue={watch("teamSize")}>
                                <SelectTrigger className="bg-background/50 focus:bg-background"><SelectValue placeholder="Select Size" /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="2">2 Members</SelectItem>
                                  <SelectItem value="3">3 Members</SelectItem>
                                  <SelectItem value="4">4 Members</SelectItem>
                                </SelectContent>
                              </Select>
                              {errors.teamSize && <span className="text-xs text-red-500">{errors.teamSize.message}</span>}
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 2: TRACK & MOTIVATION */}
                        {currentStep === 1 && (
                          <motion.div
                            key="step2"
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3, type: "tween" }}
                            className="space-y-6"
                          >
                            <div className="space-y-3">
                              <Label className="text-lg font-semibold">Select Your Problem Track</Label>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {['finance', 'healthcare', 'social'].map((track) => (
                                  <div key={track} 
                                    className={`cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center justify-center transition-all hover:scale-105 ${
                                      watch("problemPreference") === track 
                                      ? "border-primary bg-primary/10" 
                                      : "border-border bg-card/50 hover:border-primary/50"
                                    }`}
                                    onClick={() => setValue("problemPreference", track, { shouldValidate: true })}
                                  >
                                    <Target className={`mb-2 h-8 w-8 ${watch("problemPreference") === track ? "text-primary" : "text-muted-foreground"}`} />
                                    <span className="capitalize font-medium">{track}</span>
                                  </div>
                                ))}
                              </div>
                              {errors.problemPreference && <span className="text-xs text-red-500 block text-center mt-2">{errors.problemPreference.message}</span>}
                            </div>

                            <div className="space-y-2">
                              <Label>Why do you want to participate? (Optional)</Label>
                              <Textarea 
                                placeholder="Tell us briefly about your team's motivation..." 
                                className="bg-background/50 focus:bg-background min-h-[120px]"
                                {...register("motivation")}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8 pt-4 border-t border-border">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className={currentStep === 0 ? "opacity-0 pointer-events-none" : ""}
                      >
                        <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                      </Button>

                      {currentStep === steps.length - 1 ? (
                        <Button 
                          type="submit" 
                          className="bg-gradient-red text-white hover:opacity-90 transition-opacity"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
                          ) : (
                            <>Submit Registration <Send className="ml-2 h-4 w-4" /></>
                          )}
                        </Button>
                      ) : (
                        <Button 
                          type="button"
                          onClick={nextStep}
                          className="bg-primary text-white hover:bg-red-700"
                        >
                          Next Step <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      )}
                    </div>

                  </form>
                </>
              )}
            </div>
          </motion.div>
          {/* --- END RIGHT COLUMN --- */}

        </div>
      </main>
      <Footer />
    </div>
  );
}