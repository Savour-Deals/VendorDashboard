import React, { useEffect, useState, ChangeEvent, SyntheticEvent, useMemo } from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import throttle from 'lodash/throttle';

interface ISearchBox {
  map: any;
  mapsApi: any;
  addPlace?: Function;
  placeHolder?: string;
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

export const SearchBox: React.FC<ISearchBox> = props => {
  const [searchInput, setSearchInput] = useState("");
  const [options, setOptions] = useState<PlaceType[]>([]);

  const { mapsApi } = props; 

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

    if (!autocompleteService.current && mapsApi) {
      autocompleteService.current = mapsApi.places.AutoCompleteService();
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
    <TextField
      id="place-search"
      name="place-search"
    />  
  )
}