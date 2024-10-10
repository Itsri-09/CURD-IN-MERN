import { BrowserRouter as  Router,Routes,Route } from 'react-router-dom';
import './App.css';
import Login from './components/login/login';
import Register from './components/register/register';
import Table from './components/table/table';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Curd Operation</h1>
      <Router>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/table' element={<Table />} />
        </Routes>
      </Router>
      </header>
    </div>
  );
}

export default App;
