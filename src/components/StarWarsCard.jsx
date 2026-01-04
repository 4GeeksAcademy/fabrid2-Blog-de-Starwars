import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import useGlobalReducer from "../hooks/useGlobalReducer";

const getProxyImageUrl = (type, uid) => {
  const cleanUid = String(uid).trim();

  
  const folderMap = {
    people: "characters",
    planets: "planets",
    vehicles: "vehicles",
  };

  const folder = folderMap[type] || type;

 
  const originalUrl = `https://starwars-visualguide.com/assets/img/${folder}/${cleanUid}.jpg`;

  
  return `https://wsrv.nl/?url=${encodeURIComponent(originalUrl)}&default=https://wsrv.nl/placeholder.svg`;
};

export const StarWarsCard = ({ type, uid, name }) => {
  const { actions } = useGlobalReducer();

  const cleanUid = String(uid).trim();
  const isFav = actions.isFavorite({ uid: cleanUid, type });

  const imageUrl = getProxyImageUrl(type, cleanUid);

  const handleFav = () => {
    if (isFav) {
      actions.removeFavorite({ uid: cleanUid, type });
    } else {
      actions.addFavorite({ uid: cleanUid, type, name });
    }
  };

  return (
    <div className="card" style={{ minWidth: "18rem" }}>
      <img
        src={imageUrl}
        className="card-img-top"
        alt={name}
        loading="lazy"
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{name}</h5>

        <div className="mt-auto d-flex justify-content-between">
          <Link to={`/single/${type}/${cleanUid}`} className="btn btn-outline-primary">
            Learn more
          </Link>

          <button
            type="button"
            className={`btn ${isFav ? "btn-warning" : "btn-outline-warning"}`}
            onClick={handleFav}
            title={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            {isFav ? "★" : "☆"}
          </button>
        </div>
      </div>
    </div>
  );
};

StarWarsCard.propTypes = {
  type: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};