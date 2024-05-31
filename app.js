const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const uploadsDir = path.join(__dirname, 'uploads');
const app = express();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const User = require('./models/User');

const authRoutes = require('./auth'); // The path should be correct relative to this file
app.use(authRoutes); // or app.use('/auth', authRoutes); if you want all routes to be prefixed with /auth
const connectToDatabase = require('./db');
connectToDatabase();
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

// Session setup
app.use(session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Should be true if you're using HTTPS
}));

app.use(flash());

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Configure passport local strategy
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return done(null, false, { message: 'No user with that email' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (match) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Password incorrect' });
        }
    } catch (e) {
        return done(e);
    }
}));

// Serialize and deserialize user instances to and from the session.
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

// app.post('/login', passport.authenticate('local', {
//     successRedirect: '/overview',
//     failureRedirect: '/login',
//     failureFlash: 'Invalid username or password.' // Example flash message for failed login
// }));

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (!user) {
            console.log('Login failed, user:', user);
            console.log('Info:', info);
            return res.redirect('/login');
        }
        req.logIn(user, (err) => {
            if (err) {
                console.error(err);
                return next(err);
            }
            return res.redirect('/overview');
        });
    })(req, res, next);
});

// app.get('/overview', (req, res) => {
//     if (!req.isAuthenticated()) {
//         return res.redirect('/login');
//     }
//     res.render('overview');
// });

app.use((req, res, next) => {
    console.log('Is authenticated:', req.isAuthenticated());
    next();
});

passport.deserializeUser((id, done) => {
    User.findById(id, function(err, user) {
        if (err) { return done(err); }
        done(null, user);
    });
});







app.get('/profile', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    res.render('profile', { user: req.user });
});


// Set up storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded successfully');
});

app.delete('/delete/:filename', (req, res) => {
    const filename = req.params.filename;
    fs.unlink(`uploads/${filename}`, (err) => {
        if (err) return res.status(500).send('File deletion failed');
        res.send('File deleted successfully');
    });
});



app.get('/profile', async (req, res) => {
    try {
        // Retrieve user from the database; here we use a static ID, replace with dynamic logic.
        const user = await User.findById('USER_ID_FROM_SESSION_OR_PARAM');
        res.render('profile', { user });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving user profile');
    }
});



// Server listening on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
