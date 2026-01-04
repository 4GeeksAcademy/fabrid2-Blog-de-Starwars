import { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const Card = ({ type, item }) => {
  const { actions } = useGlobalReducer();

  const uid = String(item.uid).trim();
  const name = item.name;

  const isFav = actions.isFavorite({ uid, type });

  const handleFav = () => {
    if (isFav) actions.removeFavorite({ uid, type });
    else actions.addFavorite({ uid, type, name });
  };

  return (
    <div className="card" style={{ minWidth: "18rem" }}>
      
      <div
        style={{
          height: "220px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0f1a",
          color: "#ffd54a",
          fontWeight: 700,
          letterSpacing: "0.5px",
        }}
      >
        {type.toUpperCase()}
      </div>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{name}</h5>

        <div className="mt-auto d-flex justify-content-between">
          <Link to={`/single/${type}/${uid}`} className="btn btn-outline-primary">
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

export const Home = () => {
  const { store, actions } = useGlobalReducer();

  const fetchResource = async (resource) => {
    try {
      actions.setLoading(resource, true);
      actions.setError(null);

      const resp = await fetch(`https://www.swapi.tech/api/${resource}`);
      if (!resp.ok) throw new Error(`Error fetching ${resource}`);

      const data = await resp.json();
      actions.setResource(resource, data.results || []);
    } catch (err) {
      actions.setError(err.message);
    } finally {
      actions.setLoading(resource, false);
    }
  };

  useEffect(() => {
    if (store.people.length === 0) fetchResource("people");
    if (store.planets.length === 0) fetchResource("planets");
    if (store.vehicles.length === 0) fetchResource("vehicles");
    
  }, []);

  return (
    <div className="container py-4">
      {store.error && <div className="alert alert-danger">{store.error}</div>}

      <h2 className="mb-3">Characters</h2>
      {store.loading.people ? (
        <p>Loading people...</p>
      ) : (
        <div className="d-flex gap-3" style={{ overflowX: "auto", paddingBottom: "10px" }}>
          {store.people.map((p) => (
            <Card key={`people-${p.uid}`} type="people" item={p} />
          ))}
        </div>
      )}

      <h2 className="mt-5 mb-3">Planets</h2>
      {store.loading.planets ? (
        <p>Loading planets...</p>
      ) : (
        <div className="d-flex gap-3" style={{ overflowX: "auto", paddingBottom: "10px" }}>
          {store.planets.map((p) => (
            <Card key={`planets-${p.uid}`} type="planets" item={p} />
          ))}
        </div>
      )}

      <h2 className="mt-5 mb-3">Vehicles</h2>
      {store.loading.vehicles ? (
        <p>Loading vehicles...</p>
      ) : (
        <div className="d-flex gap-3" style={{ overflowX: "auto", paddingBottom: "10px" }}>
          {store.vehicles.map((v) => (
            <Card key={`vehicles-${v.uid}`} type="vehicles" item={v} />
          ))}
        </div>
      )}
    </div>
  );
};