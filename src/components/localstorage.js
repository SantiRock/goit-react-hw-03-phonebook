let contactsLocal = []


function getContacts() {
    const response = JSON.parse(localStorage.getItem('contacts'));
    if (response === null) {
      contactsLocal = [];
    } else {
       contactsLocal = response;
    }
}

getContacts()

//localStorage.setItem('contacts', JSON.stringify(contactsLocal))

export { contactsLocal }

/*const contactsSave = [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
];*/