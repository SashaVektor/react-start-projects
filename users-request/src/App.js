import React, { useEffect, useState } from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = useState([]);
  const [invites, setInvites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [searchValue, setsearchValue] = useState('');

  useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then(res => res.json())
      .then(json => {
        setUsers(json.data);

      })
      .catch(() => {
        alert('Users getting error')
      })
      .finally(setIsLoading(false))
  }, []);

  const onChangeSearchValue = (event) => {
    setsearchValue(event.target.value)
  }

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites(prev => prev.filter((_id) => _id !== id));
    } else {
      setInvites(prev => [...prev, id]);
    }
  }
  const onSendInvites = () => {
    setSuccess(true)
  }

  return (
    <div className="App">
      {success 
        ? <Success count={invites.length}/>
        : <Users searchValue={searchValue} onChangeSearchValue={onChangeSearchValue}
          items={users} isLoading={isLoading}
          invites={invites} onClickInvite={onClickInvite} onSendInvites={onSendInvites}/>}
    </div>
  );
}

export default App;
