import React, { createRef, useEffect } from "react";
import { TextField } from "@material-ui/core";
interface ISearchBox {
  map: any;
  mapsApi: any;
  placeHolder?: string;
}

export const SearchBox: React.FC<ISearchBox> = props => {
  const searchInput = createRef<HTMLInputElement>();
  // const [searchBox, setSearchBox] = useState();

  function onPlacesChanged() {

  }

  useEffect(() => {
    const {
      mapsApi: { places },
    } = props;

    const searchBox = new places.SearchBox(searchInput.current);
    searchBox.addListener("places_changed", onPlacesChanged)

    // clean up
    return () => {
      const {
        mapsApi: { event },
      } = props;
  
      event.clearInstanceListeners(searchBox);
    }

  });

//   <TextField id="filled-basic" label="Filled" variant="filled" />

  return(
    <TextField
      ref={searchInput}
      placeholder="Search..."
      type="text"
      variant="filled"
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