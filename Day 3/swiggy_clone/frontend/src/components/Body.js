
import { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";

const Body = () => {
  const [resArr, setResArr] = useState([]);

  // create backend then it will work
  useEffect(() => {
    fetch("http://localhost:8080/restaurants")
      .then((response) => response.json())
      .then((data) => setResArr(data.restaurants))
      .catch((error) =>
        console.error("Error fetching restaurant data:", error),
      );
  }, []);

  return (
    <div className="body">
      <div className="filter-btn-div">
        <button
          onClick={() => {
            const filteredArr = resArr.filter((resObj) => {
              return resObj.avgRating >= 4.5;
            });

            setResArr(filteredArr);
          }}
          className="filter-btn"
        >
          Top Rated Restaurants
        </button>
      </div>

      <div className="res-container">
        {resArr.map((resObj) => (
          <RestaurantCard key={resObj.id} hotelData={resObj} />
        ))}
      </div>
    </div>
  );
};

export default Body;
