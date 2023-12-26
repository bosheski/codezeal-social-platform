import { useContext } from "react";
import Login from "../../components/Auth/Login/Login"
import { loginUser } from "../actions";


function LoginPage({ }) {

 return <Login loginUser={loginUser} />
}

export default LoginPage