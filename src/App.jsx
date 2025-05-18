import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./pages/login/Login.jsx";
import Game from "./pages/game/Game.jsx";
import SignUp from "./pages/signup/SignUp.jsx";
import ProtectedRoute from "./utils/ProtectedRoutes.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase.js";
import GameOver from "./pages/game/GameOver.jsx";
import Leaderboard from "./pages/game/Leaderboard.jsx";
import Unauthorised from "./pages/Unauthorised.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Unauthorised />,
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/gameover",
    element: (
      <ProtectedRoute>
        <GameOver />
      </ProtectedRoute>
    ),
  },
  {
    path: "/leaderboard",
    element: (
      <ProtectedRoute>
        <Leaderboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/game",
    element: (
      <ProtectedRoute>
        <Game />
      </ProtectedRoute>
    ),
  },
]);
const App = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  if (!authChecked) return <div>Loading...</div>;
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
