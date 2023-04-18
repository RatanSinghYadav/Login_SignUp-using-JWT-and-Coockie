import './App.css';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import Signup from './component/signup';
import Loign from './component/login';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Loign/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
