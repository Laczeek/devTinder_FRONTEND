import { getTimeString } from "../../utils/date.js";

export default function BubbleEnd({ message }) {
    return (
        <li className='chat chat-end '>
            <div className='chat-header'>
                <time className='text-xs opacity-50 ml-2'>
                    {getTimeString(message.createdAt)}
                </time>
            </div>
            <div className='chat-bubble bg-blue-600 text-white'>{message.text}</div>
        </li>
    );
}