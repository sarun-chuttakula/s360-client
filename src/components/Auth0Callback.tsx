// // Auth0Callback.tsx
// import React, { useEffect } from "react";
// import { useAuth0 } from "@auth0/auth0-react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { login } from "../redux/actions/userActions";

// const Auth0Callback: React.FC = () => {
//   const { isAuthenticated, isLoading, user, getIdTokenClaims } = useAuth0();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   console.log("User:", user);

//   useEffect(() => {
//     const handleAuthentication = async () => {
//       if (!isLoading && isAuthenticated && user) {
//         const idToken = await getIdTokenClaims();
//         // dispatch(login({ user, idToken }));
//         navigate("/");
//       }
//     };

//     handleAuthentication();
//   }, [isLoading, isAuthenticated, user, getIdTokenClaims, dispatch, navigate]);

//   return <div>Logging in...</div>;
// };

// export default Auth0Callback;
