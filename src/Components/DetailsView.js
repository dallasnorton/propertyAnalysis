import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import DateForm from '../Components/DateForm';
import EditMlsUrl from '../Components/EditMlsUrl';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
  detailsContainer: {
    display: 'flex',
    flexGrow: '1',
    alignItems: 'baseline',
  },
}));

export default function DetailsView({property, onChange, onDelete}) {
  const classes = useStyles();

  return (
    <div className={classes.detailsContainer}>
      <DateForm
        date={property.date}
        onChange={(value, field) => onChange(value, field, property)}
      />
      <FormControl>
        <InputLabel htmlFor="adornment-address">Address</InputLabel>
        <Input
          id="adornment-address"
          value={property.fullAddress}
          onChange={event =>
            onChange(event.target.value, 'fullAddress', property)
          }
          aria-describedby="address"
          inputProps={{
            'aria-label': 'Address',
          }}
        />
      </FormControl>
      <EditMlsUrl
        property={property}
        url={property.mlsURL}
        onChange={onChange}
      />
      <IconButton aria-label="Delete" onClick={() => onDelete(property.id)}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
}
