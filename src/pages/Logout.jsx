import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { clearFavouriteCars } from "../features/favouriteCarSlice";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearFavouriteCars());

    localStorage.removeItem("user");

    navigate("/login");

    window.location.reload();
  }, [dispatch, navigate]);

  return null;
}

export default Logout;