'use strict';
import express from 'express';
const app = express();
app.use(express.json());
const router = express.Router();
import Notes from '../models/notes.js';
/**
 * Simple method to send a JSON response (all of the API methods will use this)
 * @param res
 * @param data
 */

router.get('/api/v1/notes/', (req,res) => {
  if ( req.body.id!==undefined ) {
    Notes.findOne(req.params.id)
      .then( data => res.send(data) )
      .catch( err => {
        res.status(404);
        res.send(err); 
      }
      );
  }
  else {
    res.status(400);
    res.send('Bad Request: Request body not received');
  }
  // Notes.fetchAll()
  //   .then( data => sendJSON(res,data) )
  //   .catch( err => serverError(res,err) );
});
router.get('/api/v1/notes/:id', (req,res) => {
  if ( req.params.id!==null ) {
    Notes.findOne(req.params.id)
      .then( data => res.send(data) )
      .catch( err => {
        res.status(404);
        res.send(err); 
      }
      );
  }
  else {
    res.status(400);
    res.send('Bad Request: Request body not received');
  }
  // Notes.fetchAll()
  //   .then( data => sendJSON(res,data) )
  //   .catch( err => serverError(res,err) );
});
router.delete('/api/v1/notes/:id', (req,res) => {
  if ( req.params.id ) {
    Notes.deleteOne(req.params.id)
      .then( success => {
        let data = {id:req.params.id,deleted:success};
        res.send(data);
      })
      .catch(console.error);
  }
  else {
    res.status(400);
    res.send('Bad Request: Request body not received');
  }
});

router.post('/api/v1/notes/', (req,res) => {
  if(!req.body.id){
    res.status(400);
    res.send('Bad Request: Request body not received');
  }
  else{
    let record = new Notes(req.body);
    record.save()
      .then(data => res.send(data))
      .catch(console.error);
  }
});

export default router;