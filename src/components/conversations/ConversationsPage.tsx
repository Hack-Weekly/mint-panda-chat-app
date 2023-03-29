import { query, collection, getDocs, DocumentData } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { getConversationPreviews } from '../../api/messages';
import { auth, db } from "../../api/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';

import { convertMessageDate } from '../../api/dates';

import './ConversationsPage.css'
import { Link } from 'react-router-dom';
import { Conversation } from '../../entities/conversation';

export interface UserData {
    uid: string;
    name: string;
    photoURL: string;
}

export default function Messages() {

    const [user] = useAuthState(auth);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [users, setUsers] = useState({} as { [key: string]: UserData});
    const [previews, setPreviews] = useState<Conversation[]>([]);
    const [selecting, setSelecting] = useState(false);

    async function fetchConversations() {
        if (!user) {
            return;
        }
        getConversationPreviews(user.uid, (messages: any) => {
            setConversations(messages);
        });;
    }

    async function fetchUsers() {
        const userQuery = query(collection(db, 'users'));
        const userDocs = await getDocs(userQuery);

        // userDocs => {uid: user}
        const users = userDocs.docs.reduce((a, v) => {
            let user = v.data();
            return {...a, 
                [user.uid]: {
                    uid: user.uid,
                    name: user.name, 
                    photoURL: user.photoURL
                }};
        }, {});
        setUsers(users);
    }

    type seenUsers = {[userId: string]: boolean};

    const determineContactId = (data: DocumentData): string => {
        return (data.user_to_id == user?.uid) ? data.user_from_id : data.user_to_id;
    }

    // Previews: for every contact seen, add a preview for its latest message
    async function parseConversationPreviews() {
        if (!user) {
            return;
        }
        let previews = [] as Conversation[];
        let seen: seenUsers = {};
        conversations.forEach((preview) => {
            let contactId = determineContactId(preview);
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
            const previewUserId = determineContactId(preview);
            const contactData = users[previewUserId];
            return (
                <Link to={`/messages/${previewUserId}`} key={previewUserId} state={{contact: contactData}}>
                    <div className='message-preview'>
                        {contactData && contactData.photoURL
                            ? <img className='message-preview-image' src={contactData.photoURL} alt='user-image'></img>
                            : <span className='message-preview-round'></span>
                        }
                        <span className='message-preview-text'>
                            <h4 className='message-preview-name'>{contactData?.name}</h4>
                            <p className='message-preview-message'>{preview.message}</p>
                        </span>
                        <p className='message-preview-date'>{convertMessageDate(preview.created_at)}</p>
                    </div>
                </Link>
            );
        });
        return previewsElem;
    }

    const inflateUsers = () => {
        let usersElem = [] as JSX.Element[];
        for (let user in users) {
            usersElem.push(
                <Link to={`/messages/${users[user].uid}`} key={Math.random()} state={{contact: users[user]}}>
                    <div className='users-preview-user' key={users[user].uid}>
                        {users[user].photoURL != undefined
                            ? <img src={users[user].photoURL}/>
                            : <span className='user-preview-image-round'></span>
                        }
                        <p>{users[user].name}</p>
                    </div>
                </Link>
            )
        }
        return usersElem;
    }

    useEffect(() => {
        fetchUsers();
        fetchConversations();
    }, [user]);

    useEffect(() => {
        let pencil = document.getElementById('new-message-icon') as HTMLButtonElement;
        selecting
            ? pencil.style.backgroundImage = 'url("./images/back.png")'
            : pencil.style.backgroundImage = 'url("./images/pencil.png")'
    }, [selecting])

    useEffect(() => {
        parseConversationPreviews();
    }, [conversations]);

    return (
        <div id="messages-page">
            <div id='messages-page-header'>
                <h1>Messages</h1>
                <button id='new-message-icon' onClick={(e) => setSelecting(!selecting)}></button>
            </div>
            <div id="messages-search">
                <img className='messages-icon' src='/images/search.png'></img>
                <input id='search-input' placeholder='Search'></input>
            </div>
            <div id='messages-page-content'>
                {selecting ? inflateUsers() : inflatePreviews()}
            </div>
        </div>
    )
}