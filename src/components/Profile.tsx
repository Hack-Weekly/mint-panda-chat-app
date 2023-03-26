import { User, UserInfo } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../api/firebase";
import classes from "./Profile.module.css";

interface ProfileProps {
  logout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ logout }) => {
  const [user] = useAuthState(auth);
  const [fullUser, setFullUser] = useState<UserInfo>();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  useEffect(() => {
    if (!user) {
        window.location.href = '/';
    }
  }, []);

  useEffect(() => {
    if (user) {
        setFullUser(user.providerData[0]);
    }
  }, [user])

  const email = user?.email ? user.email : "You're signed in as a guest!";

  return user ? (
    <div className={classes.profileContainer}>
      <img src={fullUser?.photoURL as string} alt="User Photo" className={classes.profileImage} />
      <p className={classes.profileWelcome}>Welcome {user.displayName}!</p>
      <p>Email: {email}</p>
      <button onClick={handleLogout} className={classes.profileLogout}>
        Logout
      </button>
    </div>
  ) : null;
};

export default Profile;
