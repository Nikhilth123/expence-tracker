  import { BrowserRouter, Routes, Route } from 'react-router-dom'
   import Mainlayout from './layout/Mainlayout'
   import Home from './pages/Home'
   import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProtectedRoute from './utils/Protectedroute'

function App() {
 return(
<>
<BrowserRouter>
 
<Routes>
  <Route element={<Mainlayout></Mainlayout>}>
  <Route path='/' element={<Home></Home>}></Route>
  <Route path='/dashboard' element={<ProtectedRoute><Dashboard></Dashboard></ProtectedRoute>}></Route>
  </Route>
  
  <Route path='/login' element={<Login></Login>}></Route>
  <Route path='/signup' element={<Signup></Signup>}></Route>
</Routes>

</BrowserRouter>
</>
  )
}

export default App
