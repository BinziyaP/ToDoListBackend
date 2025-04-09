const express = require('express');
const router = express.Router();
const Homepage = require('../Models/Homepage');

// Get all homepage items
router.get('/', async (req, res) => {
    try {
        const homepages = await Homepage.find();
        res.json(homepages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one homepage item
router.get('/:id', async (req, res) => {
    try {
        const homepage = await Homepage.findById(req.params.id);
        if (homepage == null) {
            return res.status(404).json({ message: 'Cannot find homepage' });
        }
        res.json(homepage);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create homepage item
router.post('/', async (req, res) => {
  

    const homepage = new Homepage({
        title: req.body.title
    });

    try {
        const newHomepage = await homepage.save();
        res.status(201).json(newHomepage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update homepage item
router.patch('/:id', async (req, res) => {
    try {
        const homepage = await Homepage.findById(req.params.id);
        if (homepage == null) {
            return res.status(404).json({ message: 'Cannot find homepage' });
        }

        if (req.body.title != null) {
            homepage.title = req.body.title;
        }

        const updatedHomepage = await homepage.save();
        res.json(updatedHomepage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete homepage item
router.delete('/:id', async (req, res) => {
 
    try {
        const deletedHomepage = await Homepage.findByIdAndDelete(req.params.id);
        if (!deletedHomepage) {
            return res.status(404).json({ message: 'Cannot find homepage' });
        }
        res.json({ message: 'Deleted Homepage' });
    } catch (err) {
        console.error('Delete error:', err);
        res.status(500).json({ message: 'Error deleting homepage' });
    }
});

module.exports = router;
