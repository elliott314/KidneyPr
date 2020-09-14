

const express = require('express');
const patientRoutes = express.Router();

let Patient = require('../models/patient.model');

// Defined store route
patientRoutes.route('/add').post(function (req, res) {
  let patient = new Patient(req.body);
  patient.save()
    .then(patient => {
      res.status(200).json({'Patient': 'Patient is added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
patientRoutes.route('/').get(function (req, res) {
    Patient.find(function(err, patients){
    if(err){
      console.log(err);
    }
    else {
      res.json(patients);
    }
  });
});
patientRoutes.route('/:id').get(function (req, res) {
   Patient.findById(req.params.id, function(err, patient){
       if(err){
           console.log(err);
       }
       else{
           res.json(patient);
       }
   });
});
    

// Defined edit route
patientRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Patient.findById( function (err, patient){
      res.json(patient);
  });
});

//  Defined update route
patientRoutes.route('/update/:id').post(function (req, res) {
  Patient.findById(req.params.id, function(err, patient) {
    if (!patient)
      res.status(404).send("data is not found");
    else {
        patient.FullName = req.body.FullName;
        patient.Email = req.body.Email;
        patient.Address = req.body.Address;
        patient.bGroup = req.body.bGroup;

        patient.save().then(patient => {
          res.json('Update complete');
        })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
patientRoutes.route('/delete/:id').get(function (req, res) {
    Patient.findByIdAndRemove({_id: req.params.id}, function(err, patient){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = patientRoutes;
