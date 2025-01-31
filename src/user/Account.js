import React, { useState, useEffect } from 'react'
import { get, set } from './api';


const Account = () => {
  const [selectedAccount, setSelectedAccount] = useState();
  const [updatedDisplayName, setUpdatedDisplayName] = useState('');
  const [message, setMessage] = useState('');
  useEffect(() => {
    const effectFunc = async () => {
      const account = await get();
      setSelectedAccount(account);
      const displayName = account.data().displayName
      setUpdatedDisplayName(displayName);
    }
    effectFunc();

  }, [])
  const onChageDisplayName = e => {
    setUpdatedDisplayName(e.target.value);
    setMessage("");
  }
  const onSubmitAccountSave = async e=>{
    e.preventDefault();
    await set(selectedAccount.id, {...selectedAccount.data(), displayName: updatedDisplayName})
    setMessage("update successful");
  }
  if (!selectedAccount) return <div>Loading...</div>;
  const { displayName } = selectedAccount.data();
  return (
    <div>
      {selectedAccount.id}
      <form onSubmit={onSubmitAccountSave}>
        <div>Display name: {displayName} </div>
        <input type="text" value={updatedDisplayName} onChange={onChageDisplayName}></input>
        <input type="submit" value="Save"></input>
      </form>
      <div>{message}</div>
    </div>
  )
}

export default Account;
