const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const schoolsDb = require('./schools.json');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(upload.none());

app.get('/', (req, res) => res.send("Hello World!"));
app.get('/schools', (req, res) => {
    let schools = schoolsDb;
    // search by name
    // filter by rating
    // order by ranking
    // location?
    const sortBy = req.query['sort-by'];

    if(req.query.search) {
        const regExp = new RegExp(req.query.search, 'ig');
        schools = schools.filter((school) => school.name.match(regExp));
    }

    if(req.query.rating){
        // gte:3 lte:2
        const [,operator, quantity] = /([gtel]{3}):(\d+)/ig.exec(req.query.rating);
        switch(operator) {
            case 'gte': schools = schools.filter((school) => school.rating >= quantity);
                break;
            case 'lte': schools = schools.filter((schools) => school.rating <= quantity);
                break;
        }
    }
    
    switch(sortBy) {
        case 'rating':
            switch(req.query.order) {
                case 'asc': schools.sort((a, b) => a.rating - b.rating);
                    break;
                default: schools.sort((a, b) => b.rating - a.rating);
            }
            break;
        case 'ranking':
            switch(req.query.order) {
                case 'desc':  schools.sort((a, b) => b.ranking - a.ranking);
                    break;
                default: schools.sort((a, b) => a.ranking - b.ranking);
            }
            break;
    }

    res.send(schools);
});
app.get('/schools/:id', (req, res) => {
    const id = Number(req.params.id);
    const school = schoolsDb.find((school) => school.id === id);

    if(school) {
        return res.send(school);
    }
    res.status(404);
    res.send('Error 404: School not found');
});

app.listen(port, () => console.log(`Express app running on port: ${port}`));


