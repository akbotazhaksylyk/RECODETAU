// mongodb+srv://<username>:<password>@cluster0.ltep08e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// mongodb+srv://akbotazhaksy:kgSiwvYTiTxJonpS@cluster0.ltep08e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const mongoose = require("mongoose");
const session = require('express-session');

async function connectToDatabase() {
    try {
        await mongoose.connect("mongodb+srv://akbotazhaksy:kgSiwvYTiTxJonpS@cluster0.ltep08e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Successfully connected to database!");
    } catch (err) {
        console.error(err);
    }
}

connectToDatabase();

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require('./routes/auth');
app.use(authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});