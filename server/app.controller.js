const fs = require('fs');

// GET request to retrieve contacts list
function getContacts(req, res) {
  // get users from json
  readContactsFile((error, data) => {
    if (error) {
      res.status(404).send('An error occurred while reading contacts data.');
      return;
    }

    res.send(data);
  });
}

// POST request to create a new contact
function createContact(req, res) {
  const name = req.query.name;
  const email = req.query.email;
  // (note: for simplicity, I'm using a string type for address, as an object type was not specified)
  const address = req.query.address || '';

  // basic validation
  if (!name) {
    res.status(404).send('Name is a required field.');
    return;
  }
  if (!email) {
    res.status(404).send('Email is a required field.');
    return;  
  }

  // get existing contacts
  readContactsFile((readError, data) => {
    if (readError) {
      res.status(404).send('An error occurred while reading contacts data.');
      return;
    }

    // create id and push new contact to list
    // (note: uuid is preferred, but I'm using index to keep things simple)
    const id = data.length + 1
    const contacts = [...data, { id, name, email, address }]

    // save contacts list
    saveContactsToFile(contacts, (saveError) => {
      if (saveError) {
        res.status(404).send('An error occurred while saving contacts data.');
      }

      res.send(contacts);
    });
  });
}

// Reads from file and returns data or errors
function readContactsFile(callback) {
  fs.readFile('./public/contacts.json', (readError, data) => {
    if (readError) {
      callback(readError);
      return;
    }

    try {
      // if contact list is empty, return empty array
      if (!data.length) {
        callback(null, []);
        return;
      }

      callback(null, JSON.parse(data));
    } catch (parseError) {
      callback(parseError);
    }
  });
}

// Writes to file to save new contact
function saveContactsToFile(contacts, callback) {
  fs.writeFile('./public/contacts.json', JSON.stringify(contacts), callback);
}

module.exports = {
  getContacts,
  createContact
}
