
import {ToastContainer, toast} from 'react-toastify';
import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';


import Home from './components/home';
import AddUser from './components/addUser';
import EditUser from './components/editUser';
import ViewUser from './components/viewUser';

function App() {

  const notify = ()=> toast("That's noicee")

  return (

    <Router>
      <div className="App">
      <ToastContainer position='top-center' />
    </div>
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/addUser' Component={AddUser} />
        <Route path='/update/:id' Component={EditUser} />
        <Route path='/view/:id' Component={ViewUser} />

      </Routes>

    </Router>

    
  );
}

export default App;
