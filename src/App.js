import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/LoginPage";
import UsersList from "./components/UsersList";

const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/signup", element: <LoginPage /> },
  { path: "/userslist", element: <UsersList /> },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
