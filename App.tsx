import { useEffect, useState } from 'react';
import { Channel as StreamChannel, User } from 'stream-chat';
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  VirtualizedMessageList,
  Window,
} from 'stream-chat-react';

import { useClient } from './hooks/useClient.ts';


import 'stream-chat-react/dist/css/v2/index.css';
import './layout.css';
import React from 'react';

const userId = '1349695';
const userName = 'aalouani soumia';

const user: User = {
  id: userId,
  name: userName,
  image: `https://getstream.io/random_png/?id=${userId}&name=${userName}`,
};

const apiKey = 'f9beg66kk8ba';
const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTM0OTY5NSJ9.NBzaF4dyllZd-KuR8meb9eTNB-mmzhC1QfIx57KPlIA';

const App = () => {
  const chatClient = useClient({
    apiKey,
    user,
    tokenOrProvider: userToken,
  });

  const [channel, setChannel] = useState<StreamChannel>();
  useEffect(() => {
    if (!chatClient) return;

    const spaceChannel = chatClient.channel('livestream', 'spacex', {
      image: 'https://goo.gl/Zefkbx',
      name: 'SpaceX launch discussion',
    });

    setChannel(spaceChannel);
  }, [chatClient]);


  if (!chatClient) return null;

  return (
    <Chat client={chatClient} theme='str-chat__theme-light'>
      <Channel channel={channel}>
        <Window>
          <ChannelHeader live />
          <VirtualizedMessageList />
          <MessageInput focus />
        </Window>
      </Channel>
    </Chat>
  );
};

export default App;
