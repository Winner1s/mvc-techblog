const express = require('express');
const router = express.Router();
const {User, Comment} = require('../../models');

const handleErrors = (res, err) => {
    console.log(err);
    res.status(500).json({msg: 'An error occurred', err});
    };

    const checkAuth = (req, res, next) => {
        if (!req.session.user_id) {
            res.status(401).json({msg: 'Please log in'});
            return;
        }
        next();
    };

    router.get('/:id', (req, res) => {
        Comment.findAll ({ include: [User, Blog] })
            .then(dbComments => {
                res.json(dbComments);
            })
            .catch(err => {
                handleErrors(res, err);
            });
    });

    router.get('/:id', (req, res) => {
        Comment.findByPk(req.params.id, { include: [User, Blog] })
                .then(dbComment => {
                    res.json(dbComment);
                })
                .catch(err => {
                    handleErrors(res, err);
                });
    });

    router.put('/:id', (req, res) => {
        checkAuth(req, res);

        Comment.update(req.body, {
            where: {id: req.params.id}
        })
        .then(updatedComment => {
            res.json(updatedComment);
        })
        .catch(err => {
            handleErrors(res, err);
        }); 
    });

    router.delete('/:id', (req, res) => {
        checkAuth(req, res);

        Comment.destroy({
            where: {id: req.params.id}
        })
        .then(deletedComment => {
            res.json(deletedComment);
        })
        .catch(err => {
            handleErrors(res, err);
        });
    });

    module.exports = router;