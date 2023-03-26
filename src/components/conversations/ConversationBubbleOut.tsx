import { convertMessageDate, firestoreDate } from '../../api/dates';
import './ConversationBubbles.css';

export default function ConversationBubbleOut(message: string, messageDate: firestoreDate) {
    return (
        <div className='conversation-bubble' key={Math.random()}>
            <span>{message}</span>
            <p className='conversation-bubble-date'>{convertMessageDate(messageDate)}</p>
        </div>
    );
}