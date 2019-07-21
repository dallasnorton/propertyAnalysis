import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
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
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

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
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
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
          <ExpansionPanel key={property.id}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
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
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="mui-pickers-date"
                  label="Date"
                  value={property.date}
                  onChange={event =>
                    onChange(event.toISOString(), 'date', property)
                  }
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
              <IconButton
                className={classes.button}
                aria-label="Delete"
                onClick={() => onDelete(property.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ExpansionPanelDetails>
          </ExpansionPanel>
      ))}
      <Tooltip title="Add New Property" aria-label="Add">
        <Fab color="primary" aria-label="Add" className={classes.fab}>
          <AddIcon onClick={onAdd} />
        </Fab>
      </Tooltip>
    </div>
  );
}
