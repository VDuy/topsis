import React from 'react';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography  from '@material-ui/core/Typography';

import LinearStepper from './view/LinearStepper';
import { makeStyles } from '@material-ui/core/styles';
import { Suspense} from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  title :{
    flexGrow: 1,
    textAlign: 'center'
  },
}));

function App() {
  const classes  = useStyles();
  return (
   <div className={classes.root}>
      <AppBar position="static">
      <Toolbar >
        <Suspense fallback='loading...'>
        <Typography variant="h6" className={classes.title} component="h1">
         TOPSIS DEMO
        </Typography>
        </Suspense>
      </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <LinearStepper />
      </Container>
   </div>
  );
}

export default App;
