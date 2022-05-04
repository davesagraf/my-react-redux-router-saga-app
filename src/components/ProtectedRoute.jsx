import React, {useEffect, useState} from 'react'
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../actions/userAction";

const useAuth = () => {
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(getUserData());
    setUser(currentUser);
  }, [dispatch, currentUser]);

  return user && currentUser;
};

const ProtectedRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;



// import Alert from "@mui/material/Alert";
// import AlertTitle from "@mui/material/AlertTitle";
// import Collapse from "@mui/material/Collapse";


//       <>
//         <Collapse timeout={5000}>
//           <Alert
//             sx={{ width: "50em", height: "20em" }}
//             severity="error"
//             variant="filled"
//           >
//             <AlertTitle>User not logged in</AlertTitle>
//             You need to Sign Up or Log In — {" "}
//             <strong>
//               <Link to="/">Click here</Link>
//             </strong>
//           </Alert>
//         </Collapse>

//         <Navigate to="/" replace />
//       </>
