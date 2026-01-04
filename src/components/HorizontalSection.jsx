import PropTypes from "prop-types";
import { StarWarsCard } from "./StarWarsCard";


const safeGetUid = (item) => {
  if (item?.uid) return String(item.uid);

  
  const match = item?.url?.match(/\/(\d+)\/?$/);
  if (match && match[1]) return String(match[1]);

 
  return "";
};

export const HorizontalSection = ({ title, type, items }) => {
  return (
    <div className="mb-5">
      <h2 className="mb-3">{title}</h2>

      <div
        className="d-flex gap-3"
        style={{ overflowX: "auto", paddingBottom: "10px" }}
      >
        {items.map((item) => {
          const uid = safeGetUid(item);
          const name = item?.name || "Unknown";

          return (
            <StarWarsCard
              key={`${type}-${uid || name}`}
              type={type}
              uid={uid}
              name={name}
            />
          );
        })}
      </div>
    </div>
  );
};

HorizontalSection.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};