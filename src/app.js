'use strict';

// Third Party Modules
import express from 'express';
const app = express();
app.use(express.json());

// Our modules
import api from '../src/api/api';
app.use(api);
require('../src/models/notes');

// Flag to know if we are up and going
let isRunning = false;


const server = {
  start: (port) => {
    if(! isRunning) {
      return app.listen(port, function () {
        console.log('app is listening at port %s', port);
      });
    }
    else {
      console.log('Server is already running');
    }
    
  },
  // stop: () => { 
  //   isRunning = false;
  //   console.log(server.connection);
  //   server.connection.close();
  // },
};

export default server;