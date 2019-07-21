import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add'; 
import firebase from '../firebase';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const emptyPropertyObj = {
  name: '',
  address: '',
  amount: 0,
  date: new Date().toISOString(),
};

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  paper: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const GetProperties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('properties')
      .onSnapshot(snapshot => {
        const newProperties = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data() ,
        }));
        setProperties(newProperties);
      });

    return () => unsubscribe();
  }, []);

  return properties;
};

export default function PropertyPaper() {
  const activeProperties = GetProperties();
  const classes = useStyles();

  const onAdd = () => {
    firebase
      .firestore()
      .collection('properties')
      .add(emptyPropertyObj);
  };
  
  const onDelete = key => {
    firebase
      .firestore()
      .collection('properties')
      .doc(key)
      .delete();
  };

  const onChange = (value, key, property) => {
    firebase
      .firestore()
      .collection('properties')
      .doc(property.id)
      .set({
        ...property,
        [key]: value,
      });
  }

  return (
    <div className={classes.root}>
      {activeProperties.map(property => (
        <Paper className={classes.paper} key={property.id}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="mui-pickers-date"
              label="Date picker"
              value={property.date}
              onChange={event =>
                onChange(event.toISOString(), 'date', property)}
              // onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
          <FormControl className={classes.margin}>
            <TextField
              id="date-entered"
              label="Address"
              className={classes.textField}
              value={property.address}
              onChange={event =>
                onChange(event.target.value, 'address', property)
              }
              margin="normal"
            />
          </FormControl>
          <FormControl className={classes.margin}>
            <InputLabel htmlFor="adornment-amount">Amount</InputLabel>
            <Input
              type={'number'}
              id="adornment-amount"
              value={property.amount}
              onChange={event =>
                onChange(event.target.value, 'amount', property)
              }
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>
          <IconButton
            className={classes.button}
            aria-label="Delete"
            onClick={() => onDelete(property.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Paper>
      ))}
      <Tooltip title="Add New Property" aria-label="Add">
        <Fab color="primary" aria-label="Add" className={classes.fab}>
          <AddIcon onClick={onAdd} />
        </Fab>
      </Tooltip>
    </div>
  );
}
