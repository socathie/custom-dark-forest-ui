//import logo from './logo.svg';
import './App.css';
import { connectDarkForest } from './main'
import PositionForm from "./positionForm"

function App() {
  connectDarkForest();
  return (
    <div className="App">
      <PositionForm />
    </div>
  );
}

export default App;
