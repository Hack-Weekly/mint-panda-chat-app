import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../api/firebase";
import classes from "./Profile.module.css";

interface ProfileProps {
  logout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ logout }) => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  useEffect(() => {
    if (!user) {
        window.location.href = '/';
    }
  }, []);

  const photoURL = user?.photoURL ? user.photoURL : undefined;
  const email = user?.email ? user.email : "You're signed in as a guest!";

  return user ? (
    <div className={classes.profileContainer}>
      <img src={photoURL} alt="User Photo" className={classes.profileImage} />
      <p className={classes.profileWelcome}>Welcome {user.displayName}!</p>
      <p>Email: {email}</p>
      <button onClick={handleLogout} className={classes.profileLogout}>
        Logout
      </button>
    </div>
  ) : null;
};

export default Profile;
