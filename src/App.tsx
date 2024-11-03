import "./App.css";
import AllUsers from "./users/AllUsers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <AllUsers />
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </>
  );
}

export default App;
