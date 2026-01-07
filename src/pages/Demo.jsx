import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Demo = () => {
  const { store, actions } = useGlobalReducer();

  return (
    <div className="container py-4">
      <h1 className="mb-3">Demo</h1>

      <p className="text-muted">
        Esta vista usa el store real del proyecto (favorites).
      </p>

      {store.favorites.length === 0 ? (
        <div className="alert alert-secondary">(empty)</div>
      ) : (
        <>
          <ul className="list-group mb-3">
            {store.favorites.map((fav) => (
              <li
                key={`${fav.type}-${fav.uid}`}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <Link to={`/single/${fav.type}/${fav.uid}`} className="text-decoration-none">
                  {fav.name} <small className="text-muted">({fav.type})</small>
                </Link>

                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => actions.removeFavorite({ uid: fav.uid, type: fav.type })}
                  title="Remove"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="btn btn-outline-warning"
            onClick={actions.clearFavorites}
          >
            Clear favorites
          </button>
        </>
      )}

      <div className="mt-4">
        <Link to="/" className="btn btn-primary">
          Back home
        </Link>
      </div>
    </div>
  );
};