import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  summaryContainer: {
    display: 'flex',
    flexGrow: '1',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
}));

export default function SummaryView({property, onChange}) {
  const classes = useStyles();

  return (
    <div className={classes.summaryContainer}>
      <Typography>
        <Link href={property.mlsURL}>{property.location.address}</Link>
      </Typography>
      <FormControl>
        <InputLabel htmlFor="adornment-listPrice">List Price</InputLabel>
        <Input
          type={'number'}
          id="adornment-listPrice"
          value={property.listPrice}
          onChange={event =>
            onChange(event.target.value, 'listPrice', property)
          }
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="adornment-totalRent">Total Rent</InputLabel>
        <Input
          type={'number'}
          id="adornment-totalRent"
          value={property.totalRent}
          onChange={event =>
            onChange(event.target.value, 'totalRent', property)
          }
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="adornment-cocReturn">
          Estimated Rehab Cost
        </InputLabel>
        <Input
          type={'number'}
          id="adornment-estimatedRehabCost"
          value={property.estimatedRehabCost}
          onChange={event =>
            onChange(event.target.value, 'estimatedRehabCost', property)
          }
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="adornment-annualCOCReturn">
          Cash on Cash Return
        </InputLabel>
        <Input
          id="adornment-annualCOCReturn"
          value={property.annualCOCReturn}
          onChange={event =>
            onChange(event.target.value, 'annualCOCReturn', property)
          }
          endAdornment={<InputAdornment position="end">%</InputAdornment>}
          aria-describedby="annualCOCReturn"
          inputProps={{
            'aria-label': 'Annual COC Returns',
          }}
        />
      </FormControl>
      <FormControl>
        <TextField
          id="date-entered"
          label="MLS Url"
          className={classes.textField}
          value={property.mlsURL}
          onChange={event => onChange(event.target.value, 'mlsURL', property)}
          margin="normal"
        />
      </FormControl>
    </div>
  );
}
