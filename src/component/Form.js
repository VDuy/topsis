import React from 'react';
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0, 0),
    minWidth: 150
  },
  button: {
    margin: theme.spacing(1, 0)
  },
  form: {
    margin: theme.spacing(2, 0),
    // spacing: '4px'
  }
}));

export default function Form(props) {
  const initState = {
    criterionName: '',
    weight: '',

  };

  const styles = useStyles();
  const [state, setState] = useState(initState);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    props.handleSubmit(state);
    setState(initState);
  }

  const { criterionName, weight } = state;
  return (
    <form disabled className={styles.form} onSubmit={submitForm}>
      <Box display="flex" flexDirection='row' maxWidth={'100%'} >

        <TextField fullWidth disabled={props.disabled} required
          className={styles.input}
          name="criterionName" label={'Criteria'} variant="filled"
          value={criterionName} onChange={handleChange} />

        <TextField fullWidth disabled={props.disabled} required
          className={styles.input} type="number"
          name="weight" label={"Weight (%)"} variant="filled"
          value={weight} onChange={handleChange} />
      </Box>

      <Button disabled={props.disabled} 
      className={styles.button} type="submit" 
      variant="contained" color="primary"> Add </Button>
    </form>
  );
}
