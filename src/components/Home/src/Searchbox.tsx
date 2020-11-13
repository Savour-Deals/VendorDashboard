import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AutoComplete from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';
import React, { ChangeEvent, useMemo, useEffect } from "react";
import CloseIcon from "@material-ui/icons/Close";

interface ISearchBox {
  addPlace?: Function;
  placeHolder?: string;
  setVendorName: Function;
  setPrimaryAddress: Function;
  setPlaceId: Function;
}

interface PlaceType {
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
    main_text_matched_substrings: [
      {
        offset: number;
        length: number;
      }
    ];
  };
}

function loadScript(src: string, position: HTMLElement | null, id: string) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
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
  const loaded = React.useRef(false);

  const [searchInput, setSearchInput] = React.useState("");
  const [options, setOptions] = React.useState<PlaceType[]>([]);

  const { setVendorName, setPrimaryAddress, setPlaceId } = props; 

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      console.log(process.env);
      loadScript(
        'https://maps.googleapis.com/maps/api/js?key=' + process.env.REACT_APP_GOOGLE_MAPS_API_KEY! +  "&libraries=places",
        document.querySelector('head'),
        'google-maps',
      );
    }
    loaded.current = true;
  }

  const getPlaceInformation = (options: any, part?: any) => {
    const restaurantName: string = options.structured_formatting.main_text;
    const address: string = options.structured_formatting.secondary_text;
    setPlaceId(options.place_id);
    setVendorName(restaurantName);
    setPrimaryAddress(address);
    setSearchInput(options.description);
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
      autocompleteService.current = new (window as any).google.maps.places.AutocompleteService();
    }

    if (!autocompleteService.current) return undefined;

    if (searchInput === '') {
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
    <AutoComplete
      id="google-map-demo"
      style={{ width: "75%", textAlign: 'center', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
      getOptionLabel={option => (typeof option === 'string' ? option : option.description)}
      filterOptions={x => x}
      options={options}
      autoComplete
      includeInputInList
      freeSolo
      closeIcon={
        <CloseIcon
          fontSize="small"
          onClick={() => {
            setSearchInput("");
          }} 
        />
      }
      autoSelect
      inputValue={searchInput}
      renderInput={params => (
        <TextField
          {...params}
          label="Business Address Look-up"
          variant="outlined"
          fullWidth
          value={searchInput}	
          rowsMax="4"
          color="primary"
          
          className={classes.field}
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
          <Grid container alignItems="center" onClick={() => getPlaceInformation(option)}>
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