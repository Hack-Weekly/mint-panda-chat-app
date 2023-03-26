import { KeyboardEvent, useEffect, useState } from "react"
import { useLocation } from "react-router-dom";

import { DocumentData, addDoc, setDoc, collection, Timestamp } from 'firebase/firestore';

import { auth, createCollection, db } from "../../api/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';

import { getConversationMessages } from '../../api/messages';
import ConversationBubbleIn from "./ConversationBubbleIn";
import ConversationBubbleOut from "./ConversationBubbleOut";

import './Conversation.css';

export default function Conversation() {
    const [parsedConversation, setParsedConversation] = useState<DocumentData[]>([]);
    const [user] = useAuthState(auth);
    const location = useLocation();
    const { contact } = location.state;
    
    async function fetchConversation() {
        if (!user) {
            return;
        }
        let conversations = await getConversationMessages(user.uid);

        // filter out docs where contact received it but user did not send
        let filteredTo = conversations.to.docs.filter((doc) => {
            return doc.data().user_from_id != user.uid;
        });

        // filter out docs where contact sent it but user did not receive
        let filteredFrom = conversations.from.docs.filter((doc) => {
            return doc.data().user_to_id != user.uid;
        });
        const sortedMessages = filteredTo.concat(filteredFrom).sort((a, b) => 
            a.data().created_at - b.data().created_at
        );
        const parsedMessages = sortedMessages.map((messageDoc) => {
            return messageDoc.data();
        })
        setParsedConversation(parsedMessages);
    }

    const navigateToMessages = () => {
        window.location.href = '/messages';
    }

    const inflateConversation = () => {
        const conversationElem = parsedConversation.map((message) => {
            return (message.user_from_id == contact.uid) 
               ? ConversationBubbleIn(message.message, message.created_at)
               : ConversationBubbleOut(message.message, message.created_at)
        })
        return conversationElem;
    }
    
    async function sendMessage(message: string) {
        const docRef = await addDoc(collection(db, "conversations"), {
            message: message,
            user_from_id: user?.uid,
            user_to_id: contact.uid,
            created_at: Timestamp.fromDate(new Date())
        });
        setDoc(docRef, { id: docRef.id }, { merge: true });
    }

    const handleMessageSend = (e: KeyboardEvent) => {
        let input = document.getElementById('conversation-message-input') as HTMLInputElement;
        if (input.value.replace(/ /g, '') === "") return;
        if (e.key == 'Enter') {
            sendMessage(input.value);
            input.value = '';
        }
    }

    useEffect(() => {
        fetchConversation();
    }, [user]);

    return (
        <div className='conversation-page'>
            <div className='conversation-header'>
                <button className='conversation-back-button' onClick={navigateToMessages}></button>
                {contact?.photoURL
                    ? <img className='conversation-header-image' src={contact?.photoURL} alt='user-image'></img>
                    : <span className='conversation-header-round'></span>
                }
                <h3>{contact.name}</h3>
            </div>
            <div className='conversation-content'>
                {inflateConversation()}
            </div>
            <div className='conversation-message-box'>
                <input onKeyDown={(e) => handleMessageSend(e)} id='conversation-message-input' placeholder='Message'></input>
            </div>
        </div>
    )
}