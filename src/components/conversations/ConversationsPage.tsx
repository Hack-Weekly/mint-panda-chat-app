import { QueryDocumentSnapshot, query, collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { getIndividualMessages } from '../../api/messages';
import { auth, db } from "../../api/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';

import { convertMessageDate } from '../../api/dates';

import './ConversationsPage.css'

export default function Messages() {

    interface UserData {
        name: string;
        photoURL: string;
    }

    const [user] = useAuthState(auth);
    const [conversations, setConversations] = useState<QueryDocumentSnapshot[]>([]);
    const [users, setUsers] = useState({} as { [key: string]: UserData});
    const [previews, setPreviews] = useState<QueryDocumentSnapshot[]>([]) ;

    async function fetchConversations() {
        if (!user) {
            return;
        }
        let conversations = await getIndividualMessages(user.uid);
        conversations.sort((a, b) => 
            b.data().created_at - a.data().created_at
        );
        setConversations(conversations);
    }

    async function fetchUsers() {
        const userQuery = query(collection(db, 'users'));
        const userDocs = await getDocs(userQuery);
        const users = userDocs.docs.reduce((a, v) => {
            let user = v.data();
            return {...a, [user.uid]: {name: user.name, photoURL: user.photoURL}};
        }, {});
        setUsers(users);
    }

    // Previews: for every contact seen, add a preview for its latest message
    async function parseConversationPreviews() {
        if (!user) {
            return;
        }
        let previews = [] as QueryDocumentSnapshot[];
        let seen: { 
            [userId: string]: boolean; 
        } = {};
        conversations.forEach((preview) => {
            let data = preview.data();
            let contactId = (data.user_to_id == user.uid) ? data.user_from_id : data.user_to_id;
            if (contactId in seen) {
                return;
            } else {
                previews.push(preview);
                seen[contactId] = true;
            }
        })
        setPreviews(previews);
    }

    const inflatePreviews = () => {
        const previewsElem = previews.map((preview) => {
            const data = preview.data();
            const previewUserId = ((data.user_from_id == user?.uid) ? data.user_to_id : data.user_from_id) as string;
            const photoURL = data.photoURL ? data.photoURL : undefined;
            return (
                <div className='message-preview'>
                    {photoURL
                        ? <img className='message-preview-image' src={photoURL} alt='user-image'></img>
                        : <span className='message-preview-round'></span>
                    }
                    <span className='message-preview-text'>
                        <h4 className='message-preview-name'>{users[previewUserId].name}</h4>
                        <p className='message-preview-message'>{data.message}</p>
                    </span>
                    <p className='message-preview-date'>{convertMessageDate(data.created_at)}</p>
                </div>
            );
        });
        return previewsElem;
    }

    useEffect(() => {
        fetchUsers();
        fetchConversations();
    }, [user]);

    useEffect(() => {
        parseConversationPreviews();
    }, [conversations]);

    return (
        <div id="messages-page">
            <div id='messages-page-header'>
                <h1>Messages</h1>
                <img id='new-message-icon' className='messages-icon' src='/images/pencil.png'></img>
            </div>
            <div id="messages-search">
                <img className='messages-icon' src='/images/search.png'></img>
                <input id='search-input' placeholder='Search'></input>
            </div>
            {/* Online users list */}
            <div id='messages-content'>
                {inflatePreviews()}
            </div>
        </div>
    )
}