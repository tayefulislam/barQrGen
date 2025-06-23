import { Route, Routes } from "react-router-dom";

import Home from "./Home/Home";
import Bar100 from "./Pages/Bar100/Bar100";
import Invoice from "./Invoice/Invoice";
import Appi from "./Invoice/app";
import Home2 from "./Home/Home2";
import Home3 from "./Home/Home3";
import Home5 from "./Home/Home5";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Routes>
        <Route path="/2" element={<Home></Home>}></Route>
        {/* <Route path="/2" element={<Home2></Home2>}></Route> */}
        {/* <Route path="/4" element={<Home4></Home4>}></Route> */}
        <Route path="/" element={<Home5></Home5>}></Route>
        {/* <Route path="/100" element={<Bar100></Bar100>}></Route>
        <Route path="/invoice" element={<Invoice></Invoice>}></Route>
        <Route path="/app" element={<Appi></Appi>}></Route>
        <Route path="/Home3" element={<Home3></Home3>}></Route> */}
      </Routes>

      <div className="py-[30px]"></div>
    </div>
  );
}

export default App;
