import { QueryDocumentSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { getIndividualMessages } from '../../api/messages';
import { auth } from "../../api/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import './ConversationsPage.css'

export default function Messages() {

    const [user] = useAuthState(auth);
    const [conversations, setConversations] = useState<QueryDocumentSnapshot[]>([]) ;
    const [previews, setPreviews] = useState<QueryDocumentSnapshot[]>([]) ;

    async function fetchMessages() {
        // all messages
        let conversations = await getIndividualMessages('');
        conversations.sort((a, b) => 
            a.data().created_at - b.data().created_at
        );
        setConversations(conversations);
    }

    async function parseConversationPreviews() {
        if (!user) {
            return;
        }
        let previews = [] as QueryDocumentSnapshot[];
        let seen: { [userId: string]: boolean; } = {};
        conversations.forEach((preview) => {
            let data = preview.data();
            if (data.user_from_id in seen || data.user_to_id in seen) {
                return;
            } else {
                console.log(seen)
                previews.push(preview);
                seen[user.uid] = true;
            }
        })
        setPreviews(previews);
    }

    const inflatePreviews = () => {
        return previews.map((preview) => (
            <div>
                <p>{preview.data().message}</p>
            </div>
        ));
    }

    useEffect(() => {
        fetchMessages();
    }, []);

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
            <div id='messages-content'>
                {inflatePreviews()}
            </div>
        </div>
    )
}