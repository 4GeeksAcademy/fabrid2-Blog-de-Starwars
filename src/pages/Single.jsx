import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Single = () => {
  const { type, uid } = useParams();
  const { actions } = useGlobalReducer();

  const cleanUid = String(uid).trim();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const resp = await fetch(`https://www.swapi.tech/api/${type}/${cleanUid}`);
        if (!resp.ok) throw new Error("No se pudo cargar el detalle");

        const data = await resp.json();
        setItem(data.result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [type, cleanUid]);

  if (loading) return <div className="container py-4"><p>Loading...</p></div>;

  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger">{error}</div>
        <Link to="/" className="btn btn-primary">Back</Link>
      </div>
    );
  }

  const props = item?.properties || {};
  const name = props.name || "Unknown";

  const isFav = actions.isFavorite({ uid: cleanUid, type });

  const handleFav = () => {
    if (isFav) actions.removeFavorite({ uid: cleanUid, type });
    else actions.addFavorite({ uid: cleanUid, type, name });
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <h1 className="mb-2">{name}</h1>
          <p className="text-muted">{item?.description || "No description available."}</p>
        </div>

        <button
          type="button"
          className={`btn ${isFav ? "btn-warning" : "btn-outline-warning"}`}
          onClick={handleFav}
          title={isFav ? "Remove from favorites" : "Add to favorites"}
        >
          {isFav ? "★ Favorite" : "☆ Add to favorites"}
        </button>
      </div>

      <div className="card mt-4">
        <div className="card-header">Details</div>
        <ul className="list-group list-group-flush">
          {Object.entries(props).map(([key, value]) => (
            <li key={key} className="list-group-item d-flex justify-content-between">
              <strong>{key}</strong>
              <span>{String(value)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-3">
        <Link to="/" className="btn btn-primary">Back home</Link>
      </div>
    </div>
  );
};