const express = require("express");
const app = express();
const authRoutes = require('./routes/auth'); // The path should be correct relative to this file
app.use(authRoutes); // or app.use('/auth', authRoutes); if you want all routes to be prefixed with /auth

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.json());
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/overview', (req, res) => {
    res.render('overview');
})

app.get('/orders', (req, res) => {
    res.render('orders');
})

app.get('/dannye', (req, res) => {
    res.render('dannye');
})

app.get('/otchet', (req, res) => {
    res.render('otchet');
})

app.get('/analiz', (req, res) => {
    res.render('analiz');
})

app.get('/pribyl', (req, res) => {
    res.render('pribyl');
})

app.get('/account', (req, res) => {
    res.render('account');
})

app.get('/settings', (req, res) => {
    res.render('settings');
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/signup', (req, res) => {
    res.render('signup');
})

// Server listening on port 3000
app.listen(3000, () => {
    console.log('Server running on port 3000');
});