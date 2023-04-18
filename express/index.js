const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
app.use(cors())
app.get('/cards/:id', async (req, res) => {
    try {
        const id = req.params.id; // Получаем id из параметров маршрута
        const response = await fetch(`http://localhost:1337/api/cards/${id}?fields=views`);
        const data = await response.json();
        const views = data.data.attributes.views;
        const updatedViews = parseInt(views) + 1;
        const putResponse = await fetch(`http://localhost:1337/api/cards/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 2f0c7d3a3e884aef88d53c347d979fcb1b20c9ef9c7ee64c7c2251a226d9e9014f16ae87fe89c754b63c33c024ea14599b89c57304345c4a19f3ef34d53b3a45b9abfba9d8a20a65243babb76cc819ff058718a2ac47b5cdbfb83c0da68d0ca9eedf609a150f3e19a905424f1c1abdbf5c365f5ec277f1d4d0351c361d84dea2'
            },
            body: JSON.stringify({
                data: {
                    views: updatedViews
                }
            })
        });

        const putData = await putResponse.json();

        res.status(200).json(putData);
    } catch (error) {
        console.error(error);
        res.send(error);
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
