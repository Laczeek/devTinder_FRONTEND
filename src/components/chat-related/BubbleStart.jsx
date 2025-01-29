import { getTimeString } from "../../utils/date";

export default function BubbleStart({ message }) {
    return (
        <li className='chat chat-start'>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img
                        alt='Participant avatar'
                        src={message.photoURL}
                        className='w-10 h-10 object-cover rounded-full'
                    />
                </div>
            </div>
            <div className='chat-header'>
                <time className='text-xs opacity-50 ml-2'>
                    {getTimeString(message.createdAt)}
                </time>
            </div>
            <div className='chat-bubble'>{message.text}</div>
        </li>
    );
}