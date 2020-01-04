import React, { useEffect, useState, ChangeEvent, SyntheticEvent } from "react";
import { TextField } from "@material-ui/core";
interface ISearchBox {
  map: any;
  mapsApi: any;
  addPlace?: Function;
  placeHolder?: string;
}

export const SearchBox: React.FC<ISearchBox> = props => {
  const [searchInput, setSearchInput] = useState("");
  const [searchBox, setSearchBox] = useState<any | null>(null);
  function onPlacesChanged({map, addPlace} = props) {
    const selected = searchBox.getPlaces();
    console.log(selected);
    const { 0: place } = selected;

    if (!place.geometry) return;
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }

    addPlace!(selected);
  }

  function clearSearchBox() {
    setSearchInput("");
  }

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setSearchInput(val);
  }

  useEffect(() => {
    const {
      mapsApi: { places },
      map
    } = props;

    setSearchBox(new places.SearchBox(searchInput));

    if (searchBox !== null) {
      console.log(searchBox)
      searchBox!.addListener("places_changed", onPlacesChanged);
      searchBox!.bindTo("bounds", map)
    }


    // clean up
    return () => {
      const {
        mapsApi: { event },
      } = props;
  
      event.clearInstanceListeners(searchInput);
    }

  }, [searchInput]);

//   <TextField id="filled-basic" label="Filled" variant="filled" />

  return(
    <TextField
      id="place-search"
      name="place-search"
      onChange={handleTextChange}
      placeholder="Search..."
      type="text"
      variant="filled"
      value={searchInput}
    />  
    // <input
    //   ref={searchInput}
    //   placeholder="Search..."
    //   type="text"
    //   style={{
    //     width: '392px',
    //     height: '48px',
    //     fontSize: '20px',
    //     padding: '12px 104px 11px 64px',
    //   }}
    // />
  )
}