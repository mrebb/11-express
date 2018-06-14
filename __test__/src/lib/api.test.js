'use strict';

import superagent from 'superagent';
import app from '../../../src/app';
import uuid from 'uuid/v4';

describe('Simple Web Server', () => {
  beforeAll( () => {
    app.start(8080);
    
  });
  afterAll( () => {
    var server = app.start(8080);
    server.close();
  });
  it('handles a post request to create note with unique ID along with JSON object', () => {
    let id = uuid();
    let obj = {'id':`${id}`,'title':'java','content':'all about java'};
    return superagent.post(`http://localhost:8080/api/v1/notes/`)
      .send(obj)
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.text).toEqual(expect.stringContaining('java'));
        //app.stop();
      });
  });
  it('handles a post request to create note with custom_ID along with JSON object', () => {
    let obj = {'id':3212,'title':'javaScript','content':'all about javaScript'};
    return superagent.post(`http://localhost:8080/api/v1/notes/`)
      .send(obj)
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.text).toEqual(expect.stringContaining('javaScript'));
      });
  });
  it('handles a get request for notes with a query string with correct id value passed', () => {
    let value = 3212;
    return superagent.get(`http://localhost:8080/api/v1/notes/${value}`)
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.text).toEqual(expect.stringContaining('3212'));
      });
  });
  it('handles a bad get request for notes api with an empty id as query string', () => {
    return superagent.get(`http://localhost:8080/api/v1/notes/`)
      .catch(response => {
        expect(response.status).toEqual(400);
        expect(response.toString()).toEqual('Error: Bad Request');
      });
  });
  it('handles a get request for notes api with a query string with id that was not found', () => {
    let id = 2222;
    return superagent.get(`http://localhost:8080/api/v1/notes/${id}`)
      .catch(response => {
        expect(response.status).toEqual(404);
        expect(response.toString()).toEqual('Error: Not Found');
      });
  });
  
  it('handles a bad post request with empty object passed', () => {
    return superagent.post(`http://localhost:8080/api/v1/notes/`)
      .catch(response => {
        expect(response.status).toEqual(400);
        expect(response.toString()).toEqual('Error: Bad Request');
      });
  });
  it('handles a delete request for note that has valid id', () => {
    let id = 3212;
    return superagent.delete(`http://localhost:8080/api/v1/notes/${id}`)
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.text).toEqual(expect.stringContaining('deleted'));
      });
  });
  it('handles a bad delete request for note that has no id', () => {
    return superagent.delete(`http://localhost:8080/api/v1/notes/`)
      .catch(response => {
        expect(response.status).toEqual(404);
        expect(response.toString()).toEqual('Error: Not Found');
      });
  });
});