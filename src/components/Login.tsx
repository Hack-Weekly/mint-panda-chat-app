import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signInWithGoogle } from "../api/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }

        if (user) {
            navigate("/dashboard");
        }
    }, [user, loading]);

    return (
        <div >
            <button onClick={signInWithGoogle}>
                Login with Google
            </button>
        </div>
    );
}
export default Login;
