import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function TitleView({property, onChange}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      {/*
        MLS URL
        List Price
        Total Rent
        Estimated Rehab Cost
        Cash on Cash Return
       */}
      <FormControl>
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
      <FormControl>
        <InputLabel htmlFor="adornment-list-price">List Price</InputLabel>
        <Input
          type={'number'}
          id="adornment-list-price"
          value={property.listPrice}
          onChange={event => onChange(event.target.value, 'listPrice', property)}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
      </FormControl>
    </React.Fragment>
  );
}
