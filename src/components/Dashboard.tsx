import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../api/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

function Dashboard() {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const fetchUserName = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();

            setName(data.name);
        } catch (err) {
            alert("An error occurred while fetching user data");
        }
    };

    useEffect(() => {
        if (loading) {
            return;
        }
        if (!user) {
            return navigate("/");
        }

        fetchUserName();
    }, [user, loading]);

    return (
        <div>
            <p>Logged in as: {name}</p>
            <p>Email: {user?.email}</p>
            <button onClick={logout}>
                Logout
            </button>
        </div>

    );
}

export default Dashboard;