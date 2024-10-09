import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
// import GsapTransition from "./components/GsapTransition";
import Transition from "./components/Transistion";
import { Provider } from "react-redux";
import { store } from "../store/store";
export default function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          {/* <GsapTransition /> */}
          <Transition/>
        </BrowserRouter>
      </Provider>
    </>
  );
}