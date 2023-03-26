import { convertMessageDate, firestoreDate } from '../../../api/dates';
import './ConversationBubbles.css';

export default function ConversationBubbleIn(message: string, messageDate: firestoreDate) {
    return (
        <div className='conversation-bubble bubble-in' key={Math.random()}>
            <span>{message}</span>
            <p className='conversation-bubble-date'>{convertMessageDate(messageDate)}</p>
        </div>
    );
}