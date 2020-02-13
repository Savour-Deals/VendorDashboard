import React, { useEffect, useState, ChangeEvent, SyntheticEvent, useMemo } from "react";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';

interface ISearchBox {
  map: any;
  mapsApi: any;
  addPlace?: Function;
  placeHolder?: string;
  setVendorName: Function;
  setPrimaryAddress: Function;
  setSecondaryAddress: Function;
  setPlaceId: Function;
}

interface PlaceType {
  structured_formatting: {
    secondary_text: string;
    main_text_matched_substrings: [
      {
        offset: number;
        length: number;
      }
    ];
  };
}



const autocompleteService = { current: null };

const useStyles = makeStyles(theme => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
  field: {
    background: "white"
  }
}));

export const SearchBox: React.FC<ISearchBox> = props => {
  const classes = useStyles();

  const [searchInput, setSearchInput] = useState("");
  const [options, setOptions] = useState<PlaceType[]>([]);

  const { mapsApi, setVendorName } = props; 

  const getPlaceInformation = (options: any, part?: any) => {
    console.log(options);
    const restaurantName: string = options.structured_formatting.main_text;

    setVendorName(restaurantName);
    setSearchInput(options.description);
  }
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setSearchInput(event.target.value);
  }

  const fetch = useMemo(() =>
      throttle((input: any, callback: any) => {
        (autocompleteService.current as any).getPlacePredictions(input, callback);
      }, 200), 
    [],
  );
  

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      console.log(mapsApi.places);
      autocompleteService.current = new (window as any).google.maps.places.AutocompleteService();
    }

    if (!autocompleteService.current) return undefined;

    if (searchInput === "") {
      setOptions([]);
      return undefined;
    }

    fetch({input: searchInput}, (results?: PlaceType[]) => {
      if (active) {
        setOptions(results || []);
      }
    });

    return () => {
      active = false;
    };
  }, [searchInput, fetch]);

  return(
    <Autocomplete
      id="google-map-demo"
      style={{ width: 300 }}
      getOptionLabel={option => (typeof option === 'string' ? option : option.description)}
      filterOptions={x => x}
      options={options}
      autoComplete
      includeInputInList
      freeSolo
      disableOpenOnFocus
      renderInput={params => (
            <TextField
              {...params}
              label="Add a location"
              variant="filled"
              fullWidth
              color="primary"
              className={classes.field}
              value={searchInput}
              onChange={handleChange}
            />
 
      )}
      renderOption={option => {
        const matches = option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match: any) => [match.offset, match.offset + match.length]),
        );

        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon className={classes.icon} onClick={() => getPlaceInformation(option)} />
            </Grid>
            <Grid item xs>
              {parts.map((part: any, index: any) => (
                <span onClick={() => getPlaceInformation(option, part)} key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                  {part.text}
                </span>
              ))}
              <Typography variant="body2" color="textSecondary"  onClick={() => getPlaceInformation(option)}>
                {option.structured_formatting.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  )
}