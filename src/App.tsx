import "./App.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import List from "./pages/List";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/MainLayout";
import {
  GlobalStateContext,
  globalStateReducer,
  initialState,
} from "./context/state";
import { useReducer } from "react";

function App() {
  const [state, dispatch] = useReducer(globalStateReducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/list" element={<List />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </GlobalStateContext.Provider>
  );
}

export default App;
