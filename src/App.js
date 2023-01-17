import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';

import './App.css'
// import layouts 
import RootLayout from './layouts/RootLayout';

// import pages 

import Home from './pages/Home';
import Timer from './pages/Timer';
import Login  from './pages/Login';
import Signup  from './pages/Signup';
import ErrorPage from './pages/ErrorPage';
import Database from './pages/Database';
import DatabaseLayout from './layouts/DatabaseLayout';
import Winable from './pages/Winable';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='timer' element={<Timer />} />
      <Route path='login' element={<Login />} />
      <Route path='sign-up' element={<Signup />} />
      
      <Route path='database' element={<DatabaseLayout />}>
        <Route path='wcaid' element={<Database />} />
        <Route path='winable' element={<Winable />} />
      </Route>

      <Route path='*' element={<ErrorPage />} />
    </Route>
  )
)

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App