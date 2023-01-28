const express = require("express")
const router =  express.Router()

const User = require("../models/user");


router.post('/getUser', function(req, res) {
        User.find({}, function(err, userList) {
                res.status(200).json({
                data:userList
                });
        })
})
      
router.post('/addUser', function(req, res) {
        let user = new User();
        user.name = req.body.username
        user.save();
        res.status(200).json({
                data:user.name
        });
})
router.post("/deleteUser", function(req, res) {
        const query = { _id : req.body.userId }
        User.deleteOne(query , function(err) {
                if(err){
                        console.error(err)
                }
                else {
                        res.status(200).json({
                        data:"delete Ok"
                });
        }
        });
});
router.post('/updateUser', function(req, res) {
        let user = {}
        user.name = req.body.username
        const query = {_id:req.body.userId}
        User.updateOne(query, user, function(err) {
                if(err) {
                        res.status(200).json({
                        data:"failed"
                });
                } else {
                        res.status(200).json(
                                {data:"edit"}
                        );
                }
        });
})

module.exports = router