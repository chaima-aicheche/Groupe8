import React from 'react';

import {
    NotifContenair,
    NotifInfoContenair,
    NotifSubContenair,
    Notification
  } from '../styles/Notif.style'
  

const Notif = () => {
  return (
    <NotifContenair>
        <NotifInfoContenair>
            <div>
                <img src="https://cdn.pixabay.com/photo/2015/12/16/17/41/bell-1096280_1280.png" />
            </div>
            <div>
                <h1>Notification</h1>
                <p>Centre de Notification</p>
            </div>
        </NotifInfoContenair>
        <NotifSubContenair>
            <Notification>
                <p> Notification... </p>
            </Notification>
            <Notification>
                <p> Notification... </p>
            </Notification>
            <Notification>
                <p> Notification... </p>
            </Notification>
        </NotifSubContenair>
    </NotifContenair>
  );
};

export default Notif;

