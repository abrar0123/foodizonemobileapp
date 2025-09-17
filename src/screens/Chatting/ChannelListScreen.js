import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ChannelList } from 'stream-chat-react-native';

export default function ChannelListScreen({ navigation }) {
  const [filters, setFilters] = useState(null);
  const {login} = useSelector((state)=>state.auth);
  const id  = login?.user?.id;

  useEffect(() => {
    
      setFilters({ type: 'messaging', members: { $in: [id] } });
    
  }, [id]);

  // console.log(sort,"logged : ",filters);

  if (!filters) return null;

  const sort = { last_message_at: -1 };


  
  return (
    <ChannelList
      filters={filters}
      sort={sort}
      onSelect={(channel) =>
        navigation.navigate('Chat', { channel })
      }
    />
  );
}