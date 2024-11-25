import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import AddCategory from './component/AddCategory';
import Category from './component/Category';
import RootLayout from './component/RootLayout';
import Detail from './component/Detail';
import Update from './component/Update';
import Login from './component/Login.js';
import Signup from "./component/Signup";
import { isLogin } from '../src/util/checkAuth'

const router = createBrowserRouter([
  { path: "", element: <Login /> },
  { path: "login", element: <Login /> },
  { path: "signup", element: <Signup /> },
  {
    path: "dashboard", loader: () => isLogin, element: <RootLayout />, children: [
      { path: "", element: <Category /> },
      { path: "category", element: <Category /> },
      { path: "add-category", element: <AddCategory /> },
      { path: "detail/:id", element: <Detail /> }, // Matches /dashboard/detail/:id
      { path: "edit/:id", element: <Update /> }
    ]
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
