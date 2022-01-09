import React from 'react';
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import CriteriaTable from "./CriteriaTable";
import Form from "./Form";
import Grid from "./Grid";
import GridForm from "./GridForm";
import ResultGrid from './ResultGrid';

import { criteriaToDataColumns } from '../services/helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(5, 0, 3),
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));


export default function LinearStepper(props) {
  const classes = useStyles();

  const [state, setState] = useState({
    criteria: [],
    sum: 0,
    disabledForm: false,
    disableGrid: true,
    disableResults: true,
    dataset: [],
    loading: false
  });

  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Insert your criteria', 'Insert your dataset', 'See the results'];


  const handleSubmit = (row) => {
    //check the weights
    const nextSum = state.sum + parseInt(row.weight);
    setState({
      ...state,
      criteria: [...state.criteria, { ...row, weight: parseInt(row.weight) }],
      sum: nextSum,
      disabledForm: nextSum >= 100,
      disableGrid: false,
    });
  };


  const handleGridSubmit = (row) => {
    setState({ ...state, dataset: [...state.dataset, { ...row, id: state.dataset.length }], disableResults: false });
  };

  

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Box>
            <CriteriaTable rows={state.criteria} removeRow={removeRow} />
            <Form disabled={state.disabledForm} handleSubmit={handleSubmit} />
          </Box>
        );

      case 1:
        return (
          <Box>
            <Grid
              dataset={state.dataset}
              disable={state.disableGrid}
              columns={criteriaToDataColumns(state.criteria)}
              loading={state.loading}
            />
            <GridForm
              fields={state.criteria.map(d => d.criterionName)}
              disabled={state.disableGrid}
              handleSubmit={handleGridSubmit}
          
            />
          </Box>
        );
      case 2:
        return (
          <Box>
            <ResultGrid
              dataset={state.dataset}
              disable={state.disableResults}
              criteria={state.criteria}
              removeRow={removeRow}
            />
          </Box>
        );
      default:
        return <Typography>Unknown Step</Typography>;
    }
  }

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const removeRow = (idx) => {
    const nextSum = state.sum - parseInt(state.criteria[idx].weight);
    setState({
      ...state,
      criteria: [...state.criteria.filter((d, i) => i !== idx)],
      sum: nextSum,
      disabledForm: nextSum >= 100,
      disableGrid: nextSum === 0,
    });
  };

  return (
    <Box className={classes.root}>

      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (

        <div>
          <Typography className={classes.instructions}>
            All steps completed
          </Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </div>

      ) : (
        <div>
          <div>{getStepContent(activeStep)}</div>
          <div>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.button}
            >BACK</Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              disabled={(activeStep === 0 && state.disableGrid) || (activeStep === 1 && state.disableResults)}
              className={classes.button}
            >
              {activeStep === steps.length - 1 ? 'FINISH' : 'NEXT'}
            </Button>
          </div>
        </div>
        
      )}
    </Box>
  );
}
