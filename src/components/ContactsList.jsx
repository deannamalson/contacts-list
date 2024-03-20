import React from "react";

function ContactsList({ contacts }) {
  return (
    <div>
      <ul className="contacts-list">
        {contacts.map((contact) => (
          <li key={contact.id} className="contact-item">
            <div className="item-value">
              <strong>Name:</strong> {contact.name}
            </div>
            <div className="item-value">
              <strong>Email:</strong> {contact.email}
            </div>
            <div className="item-value">
              <strong>Address:</strong> {contact.address}
            </div>
          </li>
        ))}
        {!contacts.length && <div>No contacts</div>}
      </ul>
    </div>
  );
}

export default ContactsList;
