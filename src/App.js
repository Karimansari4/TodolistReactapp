import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import AddToDo from './Pages/AddToDo';
import UpdateToDo from './Pages/UpdateToDo';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/addToDo' element={ <AddToDo /> } />
        <Route path='/update/:id' element={ <UpdateToDo /> } />
      </Routes>
    </>
  );
}

export default App;
