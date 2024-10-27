import { Route, Routes } from 'react-router-dom';
import './App.css';
import Signin from './Users/Signin/Signin';
import Signup from './Users/Signup/Signup';
import Forget from './Users/Forget/Forget';
import Reset from './Users/Reset/Reset';
import Home from './Component/Home/Home';
import Add from './Component/AddRecipe/Add';
import Profile from './Component/Profile/Profile';
import FoodList from './Component/FoodList/FoodList';
import AddCategory from './Component/AddCategory/AddCategory';
import SearchFood from './Component/SearchFood/SearchFood';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route exact path='/' element={<Signin/>}/>

      <Route path='/register' element={<Signup/>}/>

      <Route path='/forget-password' element={<Forget/>}/>

      <Route path='/reset/:id/:token' element={<Reset/>}/>

      <Route path='/home/:token' element={<Home/>}/>

      <Route path='/foodlist/:name/:c_id/:token' element={<FoodList/>}/>
      
      <Route path='/:id/addFood' element={<Add/>}/>

      <Route path='/profile_edit' element={<Profile/>}/>

      <Route path='/addCategory' element={<AddCategory/>}/>

      <Route path='/search/:keyword' element={<SearchFood/>}/>

      </Routes>
    </div>
  );
}

export default App;
