import { useState } from "react";
import "./App.css";
import contactsJSON from "./contacts.json";

function App() {
  const [contacts, setContacts] = useState(contactsJSON.slice(0, 5));
  const [remaining, setRemaining] = useState(contactsJSON.slice(5));
  const [alpha, setAlpha] = useState(true);

  const addContact = () => {
    const randomIndex = Math.floor(Math.random() * remaining.length);
    const randomContact = remaining[randomIndex];
    setContacts([randomContact, ...contacts]);
    const newRemaining = remaining.filter((contact) => {
      if (contact.id !== randomContact.id) {
        return contact;
      }
    });
    setRemaining(newRemaining);
  };

  const sortContactsName = () => {
    const deepCopy = JSON.parse(JSON.stringify(contacts));
    if (alpha) {
      const sortedArr = deepCopy.sort((a, b) => a.name.localeCompare(b.name));
      setContacts(sortedArr);
    } else {
      const sortedArr = deepCopy.sort((a, b) => {
        if (a.name < b.name) {
          return 1;
        } else if (a.name > b.name) {
          return -1;
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
      <h1>LAB | React IronContacts</h1>
      <button onClick={addContact}>Add Random Contact</button>
      <button onClick={sortContactsName}>
        {alpha ? "Sort Alpha" : "Sort  Rev Alpha"}
      </button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Emmy</th>
            <th>Oscar</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((oneContact) => {
            return (
              <tr key={oneContact.id}>
                <td>
                  <img
                    src={oneContact.pictureUrl}
                    alt={oneContact.name}
                    style={{ height: "100px" }}
                  />
                </td>
                <td>
                  <h3>{oneContact.name}</h3>
                </td>
                <td>
                  <h3>{oneContact.popularity}</h3>
                </td>
                <td>{oneContact.wonEmmy ? "🏆" : null}</td>
                <td>{oneContact.wonOscar ? "🏆" : null}</td>
                <td>
                  <button
                    onClick={() => {
                      deleteContact(oneContact.id);
                    }}
                  >
                    Delete
                  </button>
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