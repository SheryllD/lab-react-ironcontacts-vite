import { useState } from "react";
import "./App.css";
import contactsJSON from "./contacts.json";

function App() {
  const [contacts, setContacts] = useState(contactsJSON.slice(0, 5));
  const [remaining, setRemaining] = useState(contactsJSON.slice(5));
  const [alpha, setAlpha] = useState(true); 
 
  const addContact = () => {
    const randomIndex = Math.floor(Math.random() * remaining.length);
    const RandomContact = remaining[randomIndex];
    setContacts([RandomContact, ...contacts]); 
    const newRemaining = remaining.filter(contact => {
      if (contact.id !== RandomContact.id) {
        return contact; 
      }
    });
    setRemaining(newRemaining);
  };

  const sortContactsName = () => {
    const deepCopy = JSON.parse(JSON.stringify(contacts));
    if (alpha) {
      const sortedArr = deepCopy.sort((a, b) => a.name.localeCompare(b.name));  
      // const sortedArr = deepCopy.sort((a, b) => a.name.localeCompare(b.name)); 
    } else {
      const sortedArr = deepCopy.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        } else {
          return 0;
        }
        });
       setContacts(sortedArr); 
      }
      setAlpha(!alpha);
    }; 

    const deleteContact = (contactId) => {
      console.log("delete this person", contactId);
      const filteredContacts = contacts.filter((filterContact) => {
        if (filterContact.id !== contactId) {
          return filterContact; 
        }
      }); 
      console.log("filtered contacts", filteredContacts); 
      setContacts(filteredContacts); 
    }; 

  return (
    <div className="App">
      <h1>IronContacts</h1>
        <button onClick={addContact}>Add Random Contact</button>
      <button onClick={sortByPopularity}>Sort by popularity</button>
      <button onClick={sortByName}> {alpha ? "Sort Alpha" : "Sort Rev Alpha"} </button>
      <br></br>
      <br></br>
      <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Oscar</th>
              <th>Emmy</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          <br></br>
            {contacts.map((contact) => { 
              return (
              <tr key={contact.id}>
                <td>
                  <img className="contact__img" src={contact.pictureUrl} alt="actor" style ={{ height:"100px"}} />
                </td>
                <td><h3>{contact.name}</h3></td>
                <td><h3>{contact.popularity}</h3> </td>
                <td>{contact.wonOscar ? "🏆" : null}</td>
                <td>{contact.wonEmmy ? "🌟" : null}</td>
                <td>
                  <button onClick={() => removeContact(contact.id)}>Delete</button>
                </td>
              </tr>
           );
            })}
          </tbody>
        </table>
    </div>
  );
}

export default App;