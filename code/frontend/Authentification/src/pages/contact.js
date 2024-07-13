import React from 'react';

import {
  ContainerContact,

} from '../styles/contact.style';

import ContactForm from '../components/forms/ContactForm';

const Contact = () => {
  return (
    <ContainerContact>
        <h2>Contact</h2>
        <ContactForm />
    </ContainerContact>
  );
};

export default Contact;
