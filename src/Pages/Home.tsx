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
import CustomToast from "../Components/CustomToast";

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
  const { meal, numberPeople, restaurants, dataStep3 } = useHomeContext();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});
  const totalDishes = React.useMemo(() => {
    if (!dataStep3) return 0;

    return dataStep3.reduce((acc: any, item: any) => {
      return acc + item.total;
    }, 0);
  }, [dataStep3]);

  const totalSteps = () => {
    return steps.length;
  };
  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };
  const [openToast, setOpenToast] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const handleOpenToast = (message: string) => {
    setOpenToast(true);
    setMessage(message);
  };

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  const handleNext = () => {
    if (activeStep + 1 === StepType.Step1 && (!meal || !numberPeople)) {
      return handleOpenToast("Please enter all required information!");
    }
    if (activeStep + 1 === StepType.Step2 && !restaurants) {
      return handleOpenToast("Please enter all required information!");
    }
    if (activeStep + 1 === StepType.Step3 && totalDishes < numberPeople) {
      return handleOpenToast(
        "The total dishes must be greater than or equal to the number of people!"
      );
    }
    const newActiveStep = activeStep + 1;
    if (newActiveStep != StepType.Privew) {
      setActiveStep(newActiveStep);
    } else {
      setActiveStep(3);
    }
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
              {activeStep + 1 === StepType.Privew ? "Submit" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      </div>

      <CustomToast
        open={openToast}
        onClose={handleCloseToast}
        message={message}
        severity="error"
        duration={3000}
      />
    </Box>
  );
};

export default Home;
