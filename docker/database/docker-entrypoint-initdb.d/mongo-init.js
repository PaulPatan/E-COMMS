/* eslint-disable*/
db = db.getSiblingDB('e-comms');
db.createUser(
  {
    user: 'root',
    pwd: 'password',
    roles: [{ role: 'dbOwner', db: 'e-comms' }],
  },
);