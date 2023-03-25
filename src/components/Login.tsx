import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signInByNickname, signInWithGoogle } from "../api/firebase";
import { useAuthState, } from "react-firebase-hooks/auth";
import { onAuthStateChanged } from "firebase/auth";

import "./Login.css";

function Login() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let nameInput = document.getElementById("nickname-input") as HTMLInputElement;
    let name = nameInput.value;
    signInByNickname(name);
  };

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }

    if (user) {
        navigate("/messages");
    }
  }, [user, loading]);

  return (
    <div id="login-page">
      <h1>Chat App</h1>
      <form id="login-form" onSubmit={(e) => handleSubmit(e)}>
        <input id="nickname-input" type="text" placeholder="Nickname"></input>
        <input id="sign-in-button" type="submit" value="Sign in"></input>
      </form>
      <p>or</p>
      <button id="google-login-button" onClick={signInWithGoogle}>
        <img src="/images/google.png" width="35" height="35" alt="google"></img>
        Sign in with Google
      </button>
    </div>
  );
}
export default Login;
