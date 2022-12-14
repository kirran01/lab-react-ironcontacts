import logo from "./logo.svg";
import "./App.css";
import contacts from "./contacts.json";
import { useState } from "react";
function App() {
  const first5Contacts = contacts.slice(0, 5);
  const allOtherContacts = contacts.slice(5);
  const [contactsArr, setContactsArr] = useState(first5Contacts);
  const [remainingContacts, setRemainingContacts] = useState(allOtherContacts);
  const sortByPop = () => {
    let sortedFirst5 = contactsArr.sort((a, b) => {
      if (a.popularity > b.popularity) {
        return 1;
      }
      if (b.popularity > a.popularity) {
        return -1;
      }
      return 0;
    });
    setContactsArr([...sortedFirst5]);
  };
  const addContact = () => {
    let roll = Math.floor(Math.random() * remainingContacts.length);
    const randomlySelectedPerson = remainingContacts[roll];
    const remainingWRandomRemoved = remainingContacts.filter(
      (contact, index) => {
        if (index === roll) {
          return false;
        }

        return true;
      }
    );
    setContactsArr([...contactsArr, randomlySelectedPerson]);
    setRemainingContacts(remainingWRandomRemoved);
  };
  const sortByName = () => {
    const sortedByName = contactsArr.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (b.name < a.name) {
        return 1;
      }
      return 0;
    });

    setContactsArr([...sortedByName]);
  };
  //we are passing in the id as a parameter here because we will need it
  //to delete the specific element that the button pertains to.
  //since the delete button lives inside the mapping out of the state data
  //we already have access to its keys, so we can just throw in the id key from
  const deleteContact = (id) => {
    const contactsAfterDelete = contactsArr.filter((el, index) => el.id !== id);
    setContactsArr([...contactsAfterDelete]);
  };

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <button
        type=""
        onClick={() => {
          addContact();
        }}
      >
        add contact
      </button>
      <button
        onClick={() => {
          sortByName();
        }}
      >
        sort by name
      </button>
      <button
        onClick={() => {
          sortByPop();
        }}
      >
        sort by popularity
      </button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar?</th>
            <th>Won Emmy?</th>
            <th>Actions</th>
          </tr>
        </thead>

        {contactsArr.map((oneContact) => {
          return (
            <tbody>
              <tr>
                <td>
                  <img
                    src={oneContact.pictureUrl}
                    alt="1"
                    style={{ height: 150 }}
                  />
                </td>
                <td>{oneContact.name}</td>
                <td>{oneContact.popularity}</td>
                <td>{oneContact.wonEmmy ? <p>emmy:⚔️</p> : <p></p>}</td>
                <td>{oneContact.wonOscar ? <p>oscar:⚔️</p> : <p></p>}</td>
                <td>
                  <button
                    type=""
                    onClick={(e) => {
                      deleteContact(oneContact.id);
                    }}
                  >
                    delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}

export default App;
