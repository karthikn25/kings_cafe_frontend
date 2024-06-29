import { Route, Routes } from 'react-router-dom';
import './App.css';
import Signin from './Users/Signin/Signin';
import Signup from './Users/Signup/Signup';
import Forget from './Users/Forget/Forget';
import Reset from './Users/Reset/Reset';
import Home from './Component/Home/Home';
import Add from './Component/AddRecipe/Add';
import Profile from './Component/Profile/Profile';
import Empty from './Component/Empty/Empty';
import FoodList from './Component/FoodList/FoodList';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route exact path='/' element={<Signin/>}/>

      <Route path='/register' element={<Signup/>}/>

      <Route path='/forget-password' element={<Forget/>}/>

      <Route path='/reset/:id/:token' element={<Reset/>}/>

      <Route path='/home/:token' element={<Home/>}/>

      <Route path='/foodlist/:id/:name' element={<FoodList/>}/>
      
      <Route path='/:id/addFood' element={<Add/>}/>

      <Route path='/profile_edit' element={<Profile/>}/>

      <Route path='/empty' element={<Empty/>}/>

      </Routes>
    </div>
  );
}

export default App;
