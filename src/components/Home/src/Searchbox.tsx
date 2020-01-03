import React from "react";

interface ISearchBox {
  map: any;
  mapsApi: any;
}

export const SearchBox: React.FC<ISearchBox> = props => {

  console.log(props);
  return(
    <input
    />
  )
}