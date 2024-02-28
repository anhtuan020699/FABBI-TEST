import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useHomeContext } from "./HomeContext";
import Step1 from "../Components/Step1";
import Preview from "../Components/Preview";
import Step2 from "../Components/Step2";
import FoodSelection from "../Components/FoodSelection";

const steps = [
  "Meal Selection",
  "Restaurant Selection",
  "Dish Customization",
  "privew",
];
export enum StepType {
  Step1 = 1,
  Step2 = 2,
  Step3 = 3,
  Privew = 4,
}
const Home = () => {
  const { meal, numberPeople, restaurants } = useHomeContext();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    if (activeStep + 1 === StepType.Step1 && (!meal || !numberPeople)) {
      return;
    }
    if (activeStep + 1 === StepType.Step2 && !restaurants) {
      return;
    }
    const newActiveStep = isLastStep()
      ? steps.findIndex((step, i) => !(i in completed))
      : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNextStep = (step: number) => () => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper nonLinear activeStep={activeStep} sx={{ mt: 2 }}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleNextStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
            {activeStep + 1 === StepType.Step1 && <Step1 />}
            {activeStep + 1 === StepType.Step2 && <Step2 />}
            {activeStep + 1 === StepType.Step3 && <FoodSelection />}
            {activeStep + 1 === StepType.Privew && <Preview />}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext} sx={{ mr: 1 }}>
              Next
            </Button>
          </Box>
        </React.Fragment>
      </div>
    </Box>
  );
};

export default Home;
