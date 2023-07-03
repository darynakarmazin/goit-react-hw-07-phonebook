import React, { useEffect } from 'react';

import { Wrapper, Header } from './App.styled';
import { ContactForm } from './contactForm/ContactForm';
import { Filter } from './filter/Filter';
import { ContactList } from './contactList/ContactList';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/filterSlice';
import {
  getСontacts,
  getFilter,
  getError,
  getIsLoading,
} from 'redux/selectors';
import { addContact, fetchContacts } from 'redux/operations';

export function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(getСontacts);
  const filter = useSelector(getFilter);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  // const deleteContact = contactId => {
  //   dispatch(deletedContact(contactId));
  // };

  const onAddContact = newcontact => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === newcontact.name.toLowerCase()
      )
    ) {
      alert(`${newcontact.name} is already in contacts!`);
      return;
    }

    dispatch(addContact(newcontact));
  };

  const changeFilter = event => dispatch(setFilter(event.currentTarget.value));

  const getFiltredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  const filtredContacts = getFiltredContacts();

  return (
    <Wrapper>
      <Header>Phonebook</Header>
      <ContactForm onSubmit={onAddContact} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      {isLoading && !error && <b>Request in progress...</b>}
      <ContactList
        filtredContacts={filtredContacts}
        // onDeleteContact={deleteContact}
      />
    </Wrapper>
  );
}
