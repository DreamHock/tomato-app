import "./App.css";
import { json, Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { SellerDashboard } from "./pages/seller/SellerDashboard";
import { ManageProducts } from "./pages/seller/ManageProducts";
import { useSelector, useDispatch } from "react-redux";
import { Shop } from "./pages/custommer/Shop";
import { Cart } from "./pages/custommer/Cart";
import CustommerHeader from "./components/CustommerHeader";
import SellerHeader from "./components/SellerHeader";
import { useEffect } from "react";
import { RedirectToHome } from "./components/RedirectToHome";
import { setLogin } from "./stateManager/actions/actions";
// import { getSearchParamsForLocation } from "react-router-dom/dist/dom";

function App() {
  let state = useSelector((state) => state);
  let dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!localStorage.getItem("loginState")) {
  //     navigate("/");
  //   }
  // }, []);

  useEffect(() => {
    if (window.sessionStorage.getItem("loginState") !== null) {
      dispatch(
        setLogin(
          JSON.parse(window.sessionStorage.getItem("loginState")),
          JSON.parse(window.sessionStorage.getItem("loginUser"))
        )
      );
    } else {
      dispatch(setLogin(false, ""));
      navigate("/");
    }
  }, [state.refreshLog]);

  // useEffect(() => {
  //   if (window.sessionStorage.getItem("loginState") !== "") {
  //     setLogin(
  //       JSON.parse(window.sessionStorage.getItem("loginState")),
  //       JSON.parse(window.sessionStorage.getItem("loginUser"))
  //     );
  //   } else {
  //     setLogin(false, "");
  //   }
  // }, [state.refreshLog]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/seller" element={<SellerHeader />}>
          <Route index element={<ManageProducts />} />
          <Route path="dashboard" element={<SellerDashboard />} />
        </Route>
        <Route path="/custommer" element={<CustommerHeader />}>
          <Route index element={<Shop />} />
          <Route path="cart" element={<Cart />} />
        </Route>
        <>
          <Route path="*" element={<RedirectToHome />} />
        </>
      </Routes>
    </div>
  );
}

export default App;
