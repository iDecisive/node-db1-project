const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

router.post('/', (req, res) => {
	db('accounts')
		.insert(req.body, 'id')
		.then((id) => {
			res.status(201).json(id);
		})
		.catch((err) => {
			res.status(500).json({ error: 'Server error', details: err });
		});
});

router.get('/', (req, res) => {
	db('accounts')
		.then((accounts) => {
			res.json(accounts);
		})
		.catch((err) => {
			res.status(500).json({
				message: 'Server error: Failed to get accounts from database',
				error: err,
			});
		});
});

router.put('/:id', (req, res) => {
    db('accounts').where({ id: req.params.id })
    .update(req.body)
    .then(count => {
        if(count > 0){
            res.status(200).json({message: 'Account was updated'});
        } else {
            res.status(404).json({message: 'Account not found'})
        }
    })
    .catch(err => {
        res.status(500).json({error: err});
    });
});

router.delete('/:id', (req, res) => {
	db('accounts')
		.where({ id: req.params.id })
		.del()
		.then(() => {
			res.json({ message: 'Deleted' });
		})
		.catch((err) => {
			res.status(500).json({ error: err });
		});
});

module.exports = router;
