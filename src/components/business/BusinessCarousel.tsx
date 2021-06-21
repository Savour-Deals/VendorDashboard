import React, { useState } from "react";
import Carousel, { CarouselInternalState } from "react-multi-carousel";

import Business from "../../model/business";
import CampaignBusinessCard from "../campaign/CampaignBusinessCard";

import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

interface IBusinessCarousel {
  businesses: Business[];
	selectedBusiness: Business;
	onBusinessSelected: (business: Business) => void;
}

export const BusinessCarousel: React.FC<IBusinessCarousel> = props => {
	const { businesses, selectedBusiness, onBusinessSelected } = props;
  const [endOfCarousel, setEndOfCarousel] = useState(false);
  return (
		<>
			<Carousel 
				responsive={responsive}
        afterChange={(previousSlide: number, state: CarouselInternalState) => {
          if (businesses.length - previousSlide <= state.slidesToShow) { setEndOfCarousel(true); console.log("TRUE")}
          else if (endOfCarousel && businesses.length - previousSlide > state.slidesToShow) {setEndOfCarousel(false); console.log("FALSE")}
        }}
      >
      
				{
					businesses.map((business: Business) => 
						<CampaignBusinessCard
							business={business}
							selected={selectedBusiness ? selectedBusiness.id === business.id : false}
							onSelect={onBusinessSelected}/>)
				}
			</Carousel>
		</>
  )
};