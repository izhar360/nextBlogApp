import React, { createContext, useEffect, useState } from "react";

import { SignInUser, SignUpUser } from "../api/index";

const UserContext = createContext();

// const getuserfromLocalStrorage = () => {
//     return localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {username: null,token: null}
// }
const getuserfromLocalStrorage = () => {
  return localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : { username: null, token: null };
};

function UserProvider({ children }) {
  //  const [user,setUser] = useState(getuserfromLocalStrorage())
  const [user, setUser] = useState({ username: null, token: null });
  const [successLog, setSuccessLog] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setUser(getuserfromLocalStrorage());
  }, []);

  const userSignUp = async (userProp) => {
    try {
      const { data } = await SignUpUser({ ...userProp });

      const {
        token,
        data: {
          user: { email, firstName, _id },
        },
      } = data;
      const newUser = { email, firstName, token, _id };
      setUser(newUser);

      localStorage.setItem("userData", JSON.stringify(newUser));
      console.log("signed up successfully..!");
      if (data) {
        setSuccessLog(true);
      }
    } catch (error) {
      console.log(error, "couldn't sign up, from signup api...");
      setError(error);

      setSuccessLog(false);
    }
  };

  const userLogin = async (userProp) => {
    try {
      const { data } = await SignInUser({ ...userProp });

      const {
        token,
        data: {
          user: { email, firstName, _id },
        },
      } = data;

      const newUser = { email, firstName, token, _id };
      setUser(newUser);
      localStorage.setItem("userData", JSON.stringify(newUser));
      setSuccessLog(true);
    } catch (error) {
      console.log(error);
      setError(error);
      setSuccessLog(false);
    }
  };

  const userLogout = () => {
    setUser({ email: null, firstName: null, token: null, _id: null });
    localStorage.removeItem("userData");
  };

  return (
    <UserContext.Provider
      value={{ user, error, userSignUp, userLogin, userLogout }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
