const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/a', async (req, res) => {
    res.json({
        message: 'works!'
    });
})

export default router;
