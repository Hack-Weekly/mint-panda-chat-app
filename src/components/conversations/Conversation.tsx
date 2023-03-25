import { useEffect, useState } from "react"
import { useParams, useLocation } from "react-router-dom";

import { QueryDocumentSnapshot, query, collection, getDocs, DocumentData, QuerySnapshot } from 'firebase/firestore';

import { auth, db } from "../../api/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';

import { getIndividualMessages } from '../../api/messages';

export default function Conversation() {
    const [conversation, setConversation] = useState<QueryDocumentSnapshot[]>([]);
    const [parsedConversation, setParsedConversation] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
    const [user] = useAuthState(auth);
    const { id } = useParams();
    const location = useLocation();
    const { contactName } = location.state;
    
    async function fetchConversation() {
        if (!user) {
            return;
        }
        let conversations = await getIndividualMessages(user.uid);

        // filter out docs where contact received it but user did not send
        let filteredTo = conversations.to.docs.filter((doc) => {
            return doc.data().user_from_id != user.uid;
        });

        // filter out docs where contact sent it but user did not receive
        let filteredFrom = conversations.from.docs.filter((doc) => {
            return doc.data().user_to_id != user.uid;
        });
        const parsed = filteredTo.concat(filteredFrom).sort((a, b) => 
            b.data().created_at - a.data().created_at
        );
        setParsedConversation(parsed);
    }

    useEffect(() => {
        fetchConversation();
    }, [user]);

    return (
        <div className='conversation-page'>
            <h3>{contactName}</h3>
        </div>
    )
}