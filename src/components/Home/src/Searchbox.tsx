import React, { createRef } from "react";
interface ISearchBox {
  map: any;
  mapsApi: any;
  placeHolder?: string;
}

export const SearchBox: React.FC<ISearchBox> = props => {
  const searchInput = createRef<HTMLInputElement>();

  const {
    mapsApi: { places },
    placeHolder
  } = props;

  const searchBox = new places.SearchBox(searchInput.current);

  console.log(props);
  return(
    <input
      ref={searchInput}
      placeholder={placeHolder}
      type="text"
      style={{
        width: '392px',
        height: '48px',
        fontSize: '20px',
        padding: '12px 104px 11px 64px',
      }}
    />
  )
}