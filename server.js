const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// MongoDB URI
const mongoURI = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(() => console.log('MongoDB successfully connected at ' + mongoURI))
    .catch(err => console.log(err));

// Add the validation error plugin to make the model validation
// errors look nice.
mongoose.plugin(require('./models/plugins/validationError'));

// Add models to mongoose
mongoose.model('Board', require('./models/Board'));
mongoose.model('Collaborator', require('./models/Collaborator'));
mongoose.model('Column', require('./models/Column'));
mongoose.model('Task', require('./models/Task'));

const app = express();

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

// Routes
app.use('/api/boards', require('./routes/api/boards'));
app.use('/api/collaborators', require('./routes/api/collaborators'));
app.use('/api/columns', require('./routes/api/columns'));
app.use('/api/tasks', require('./routes/api/tasks'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (_, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));

module.exports = app;
