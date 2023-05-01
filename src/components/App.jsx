import { nanoid } from 'nanoid';
import { Component } from 'react';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import css from './App.module.css'
import { contactsLocal } from './localstorage';


class App extends Component {
  state = {
    contacts: [],
    filter: ''
  }

  async componentDidMount() {
    try {
    const response = await JSON.parse(localStorage.getItem('contacts'));
    if (response === null) {
      return
    } else {
      this.setState({contacts: response})
    }
    } catch {
      console.log('Something went wrong')
      this.setState({contacts: []})
    }
  }

  handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const name = form.elements.name.value;
    const namee = name.toLowerCase();

    for (let person of this.state.contacts) {
      if (person.name.toLowerCase() === namee) {
        alert(name + ' is already in contacts')
        return
      } else {
        continue
      }
    }

    const number = form.elements.number.value;
    const id = nanoid();
    const personObject = { name: name, number: number, id: id }
    contactsLocal.push(personObject)
    localStorage.setItem('contacts', JSON.stringify(contactsLocal))
   //console.log(localStorage.getItem('contacts'))
    const response = JSON.parse(localStorage.getItem('contacts'));
    this.setState({contacts: response})

    //this.setState( {contacts: this.state.contacts.concat(personObject)})
    //console.log(personObject)
    form.reset();

  }

  setFilter = ( {target} ) => { this.setState({filter: target.value})  }

  handleDelete = (id) => {
    const index = contactsLocal.findIndex((contact) => contact.id === id);
    contactsLocal.splice(index, 1)
    localStorage.setItem('contacts', JSON.stringify(contactsLocal))
    //console.log(localStorage.getItem('contacts'))
    const response = JSON.parse(localStorage.getItem('contacts'));
    this.setState({contacts: response})
  }

  render() {
    const { filter } = this.state;
    const { contacts } = this.state;
    
    const byFilterField = p => p.name.toLowerCase().includes(filter.toLowerCase())
    const personsToShow = filter ? contacts.filter(byFilterField) : contacts;

    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ContactForm handleSubmit={this.handleSubmit}/>
        <h2>Contacts</h2>
        <Filter setFilter={this.setFilter} filter={filter}/>
        <ContactList arr={personsToShow} handleDelete={this.handleDelete} />
      </div>
    );
  }

};

export { App }