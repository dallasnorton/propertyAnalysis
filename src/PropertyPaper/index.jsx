import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
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
import emptyPropertyObj from '../propertyObject';
import DateForm from '../Components/DateForm';
import SummaryView from '../Components/SummaryView';
import DetailsView from '../Components/DetailsView';
import EditMlsUrl from '../Components/EditMlsUrl';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
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

const useProperties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('properties')
      .onSnapshot(snapshot => {
        const newProperties = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProperties(newProperties);
      });

    return () => unsubscribe();
  }, []);

  return properties;
};

export default function PropertyPaper() {
  const activeProperties = useProperties();
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
  };

  return (
    <div className={classes.root}>
      {activeProperties.map(property => (
        <ExpansionPanel key={property.id}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
          >
            <SummaryView property={property} onChange={onChange} />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <DetailsView property={property} onChange={onChange} onDelete={onDelete} />
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
