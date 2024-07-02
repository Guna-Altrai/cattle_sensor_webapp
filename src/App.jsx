import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./Routes/Routes";

function App() {
  return (
    <BrowserRouter>
      <AllRoutes />
    </BrowserRouter>
  );
}

export default App;
