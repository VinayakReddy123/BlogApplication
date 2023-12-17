import { useState } from 'react';
import './App.css';
import { BrowserRouter ,Navigate,Route,Routes,Outlet} from 'react-router-dom';
import DataProvider from './context/DataProvider';
import Login from './Components/account/Login';
import Home from './Components/home/Home';
import Header from './Components/header/Header';
import CreatePost from './Components/create/CreatePost';

const PrivateRoute=({isAuthenticated, ...props})=>{
   return isAuthenticated ? 
   <>
   <Header />
    <Outlet />
   </> : <Navigate replace to={'/login'} />
      
}


function App() {
  const [isAuthenticated,isUserAuthenticated]=useState(false);
  return (
    <>
    <DataProvider>
      <BrowserRouter>
      <div style={{marginTop:64}}>
        <Routes>
           <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated}/>} />

           <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                <Route path='/' element={<Home />} />
           </Route>

           <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                <Route path='/create' element={<CreatePost />} />
           </Route>

        </Routes>    
      </div> 
      </BrowserRouter>   
    </DataProvider>
    </>
  );
}

export default App;
