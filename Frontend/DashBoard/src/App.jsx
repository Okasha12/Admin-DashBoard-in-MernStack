
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/login';
import Dashboard from './components/Dashboard';
import EditProduct from './components/EditProduct';
import AllProducts from './components/showProduct';


function App() {

  return (
    <Router>
      <div className="App">
    
        <Routes>
           <Route exact path="/adminLogin" element={<LoginForm />} /> 
           <Route  path="/dashBoard" element={<Dashboard/>} />
           <Route  path="/showProduct" element={<AllProducts/>} />
           <Route  path="/editProduct/:id" element={<EditProduct/>} />         
        </Routes>
      </div>
    </Router>
  );
}

export default App;
