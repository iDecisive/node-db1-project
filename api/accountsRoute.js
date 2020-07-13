const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

router.post('/', (req, res) => {
	console.log(req.body);

	db('accounts')
		.insert({
			name: req.name,
			budget: req.budget,
		})
		.then(() => {
			res.status(201).json({ message: 'worked!' });
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

router.put('/:id', (req, res) => {});

router.delete('/:id', (req, res) => {
	db('accounts').where({ id: req.params.id }).del().then(() => {
        res.json({ message: 'Deleted' });
    }).catch(err => {
        res.status(500).json({error: err});
    });
});

module.exports = router;
