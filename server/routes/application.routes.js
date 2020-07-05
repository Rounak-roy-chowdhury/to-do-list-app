const express = require('express');


const applicationController = require("../controllers/application.controller");


const router = express.Router();

router.get('/showTask', applicationController.showTask) //done
router.post('/addTask', applicationController.addTask) //done
router.put('/editTask/:id', applicationController.editTask)
router.post('/deleteTask/:id', applicationController.deleteTask)
router.get('/queryTask', applicationController.queryTask)

module.exports = router;