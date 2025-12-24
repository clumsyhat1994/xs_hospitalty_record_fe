// import { createContext, useContext } from "react";
// import {
//   getCurrentUserFromToken,
//   isAdmin as isAdminFn,
// } from "../auth/authService";

// const UserRolesAndPermsContext = createContext({ isAdmin: null });

// export function UserRolesAndPermsProvider({ children }) {
//   const user = getCurrentUserFromToken();
//   const isAdmin = isAdminFn(user);
//   return (
//     <UserRolesAndPermsContext.Provider value={{ isAdmin }}>
//       {children}
//     </UserRolesAndPermsContext.Provider>
//   );
// }

// // eslint-disable-next-line react-refresh/only-export-components
// export function useUserRolesAndPerms() {
//   return useContext(UserRolesAndPermsContext);
// }
