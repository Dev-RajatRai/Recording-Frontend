import "./App.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ManageRecordings from "./Pages/ManageRecordings";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ManageRecordings />
      </div>
    </Provider>
  );
}

export default App;
