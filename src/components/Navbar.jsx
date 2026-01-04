import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store, actions } = useGlobalReducer();

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand mb-0 h1 text-decoration-none">
          Star Wars Databank
        </Link>

        <div className="dropdown">
          <button
            className="btn btn-warning dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Favorites ({store.favorites.length})
          </button>

          <ul className="dropdown-menu dropdown-menu-end" style={{ minWidth: "280px" }}>
            {store.favorites.length === 0 ? (
              <li className="dropdown-item text-muted">(empty)</li>
            ) : (
              store.favorites.map((fav) => (
                <li key={`${fav.type}-${fav.uid}`} className="dropdown-item">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to={`/single/${fav.type}/${fav.uid}`} className="text-decoration-none">
                      {fav.name}
                    </Link>

                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => actions.removeFavorite({ uid: fav.uid, type: fav.type })}
                      title="Remove"
                    >
                      ✕
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};