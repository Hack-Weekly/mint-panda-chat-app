import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, logout } from "../api/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
        if (user && user !== null) {
            const q = query(collection(db, 'users'), where('uid', '==', user.uid));
            const doc = await getDocs(q);
            const docData = doc.docs[0];
            const username = user.displayName ? user.displayName : '';

            if (docData) {
                setName(docData.data().name);
            } else {
                setName(username)
            }
        }
    } catch (err) {
      alert("An error occurred while fetching user data");
    }
  };

  // onAuthStateChanged listens for both anonymous and Google sign in
  onAuthStateChanged(auth, (user) => {
    fetchUserName();
  })

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user) {
      return navigate("/");
    }
  }, [user, loading]);

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/rooms">Rooms</Link>
          </li>
        </ul>
      </nav>
      <p>Logged in as: {name}</p>
      <p>Email: {user?.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;
