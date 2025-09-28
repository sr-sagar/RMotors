import React from 'react'
import ChatPageExtractedComponent from './chatPageExtractedComponent';
import { getRequestWithAuth } from '@/utils/getRequestWithAuth';

const ChatList = async() => {
    const res = await getRequestWithAuth("messageRoom");
    const rooms = await res.res.data;
    return <ChatPageExtractedComponent success={res.success} message={res.res.message} rooms={rooms}/>
}

export default ChatList
