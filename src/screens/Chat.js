import React, { useEffect, useState } from 'react';
import { auth, db } from '../services/firebase';

const Chat = () => {

  const [user, setUser] = useState(auth().currentUser);
  const [chats, setChats] = useState([]);
  const [content, setContent] = useState('');
  const [readError, setReadError] = useState(null);
  const [writeError, serWriteError] = useState(null);

  useEffect(() => {
    setReadError(null);
    try {
      db.ref("chats").on("value", snapshot => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        setChats(chats);
      });
    } catch (error) {
      setReadError(error.message);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    serWriteError(null);
    try {
      await db.ref("chats").push({
        content: content,
        username: user.displayName,
        timestamp: Date.now(),
        uid: user.uid
      });
      setContent('');
    } catch (error) {
      serWriteError(error.message);
    }
  }

  const LogOut = () => {
    auth().signOut().then(function () {
      console.log('success signout');
    }).catch(function (error) {
      console.log('signout failed');
    });
  };

  return (
    <div>
      <div className="chats">
        {chats.map(chat => {
          return (
            <div key={chat.timestamp}>
              <h3>{chat.username ? chat.username : 'test123'}</h3>
              <p >{chat.content}</p>
            </div>
          )
        })}
      </div>
      <form onSubmit={handleSubmit}>
        <input onChange={(e) => setContent(e.target.value)} value={content} />
        {readError ? <p>{writeError}</p> : null}
        <button type='submit'>Send</button>
      </form>
      <div>
        Login in as: <strong>{user.email}</strong>
      </div>
      <button onClick={() => LogOut()}>Logout</button>
    </div>
  )
};

export default Chat;