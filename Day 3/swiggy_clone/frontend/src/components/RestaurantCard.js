import { baseURL } from "../utils/constants";

const RestaurantCard = ({ hotelData }) => {
  // const { hotelData } = props;
  const { resName, cuisine, avgRating, delieveryTime, costForTwo, imgId } =
    hotelData;

  return (
    <div className="res-card">
      <div className="res-img-container">
        <img
          className="res-logo"
          alt="res-logo"
          src={
            baseURL +
            imgId
          }
        />
      </div>
      <h3 className="res-title">{resName} </h3>
      <h4>{cuisine.join(", ")}</h4>
      <h4>⭐ {avgRating} Stars</h4>
      <h4>
        {delieveryTime} mins | ₹{costForTwo} for two
      </h4>
    </div>
  );
};

export default RestaurantCard;