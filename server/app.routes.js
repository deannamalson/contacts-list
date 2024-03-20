const controller = require('./app.controller')

module.exports = function(app) {
  app.get('/contacts', controller.getContacts);
  app.post('/contact/create', controller.createContact);
}
