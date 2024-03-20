import React, { useState } from "react";

function AddContactForm({ createContact }) {
  const [contact, setContact] = useState({ name: '', email: '', address: '' });

  function onSubmit(e) {
    e.preventDefault();

    createContact(contact);

    // clear form
    setContact({ name: '', email: '', address: '' });
  }

  return (
    <form onSubmit={onSubmit}>
      <label>Name</label>
      <input
        type="text"
        value={contact.name}
        onChange={e => setContact({ ...contact, name: e.target.value })}
      />

      <label>Email</label>
      <input
        type="text"
        value={contact.email}
        onChange={e => setContact({ ...contact, email: e.target.value })}
      />

      <label>Address (Optional)</label>
      <input
        type="text"
        value={contact.address}
        onChange={e => setContact({ ...contact, address: e.target.value })}
      />

      <button type="submit" disabled={!contact.name || !contact.email}>
        Create Contact
      </button>
    </form>
  );
}

export default AddContactForm;
