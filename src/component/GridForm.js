import React from 'react';
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0, 1),
    minWidth: 150
  },
  input: {
    minWidth: 100,
    margin: theme.spacing(0, 0)
  },
  button: {
    margin: theme.spacing(1, 1, 1, 0)
  },
  form: {
    margin: theme.spacing(0, 0),
  }
}));

export default function GridForm(props) {
  const initState = {
    'name': '',
  };

  props.fields.forEach(d => {
    initState[d] = '';
  });

  const styles = useStyles();
  const [state, setState] = useState(initState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'file-input') {
      const files = event.target.files;
      if (files && files[0]) props.handleFile(files[0]);
    } else {
      setState({
        ...state,
        [name]: value,
      });
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    props.handleSubmit(state);
    setState(initState);
  }

  return (
    <form className={styles.form} onSubmit={submitForm} >

      <Box display="flex" flexDirection='row'>
        
        <TextField disabled={props.disabled} required name="name" className={styles.input}
          label={'Name'} variant="filled"
          value={state.name} onChange={handleChange} />

        {props.fields.map((d, idx) => (
          <TextField key={idx} disabled={props.disabled} required name={d} className={styles.input}
            label={d} variant="filled"
            value={state[d]} onChange={handleChange}
          />
        ))}
      </Box>

      <Button disabled={props.disabled} className={styles.button} type="submit"
        variant="contained" color="primary"> ADD </Button>
    </form>
  );
}
