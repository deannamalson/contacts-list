import React, { useEffect, useState } from "react";
import axios from "axios";
import ContactsList from "./ContactsList";
import AddContactForm from "./AddContactForm";

function MyContacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios.get('/contacts').then((response) => {
      setContacts([...response.data]);
    }); 
  }, [])

  function createContact(contact) {
    const { name, email, address } = contact
    axios.post(`/contact/create`, null, { params: {
      name,
      email,
      address
    }})
    .then((response) => {
      setContacts([...response.data]);
    })
    .catch(error => console.error(error));
  }

  return (
    <div className="container">
      <div className="create-wrapper">
        <h2>Create Contact</h2>
        <AddContactForm createContact={createContact} />
      </div>
      <div className="list-wrapper">
        <h2>My Contacts</h2>
        <ContactsList contacts={contacts} />
      </div>
    </div>
  );
}

export default MyContacts;
