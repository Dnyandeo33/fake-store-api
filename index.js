import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import logger from './middleware/logger.js';
import userRoutes from './routes/user.js';

//configuration dotenv

dotenv.config();
const PORT = process.env.PORT || 3005;

// absolute path

const __filename = fileURLToPath(import.meta.url);
const PATH = dirname(__filename);

// initialize express
const app = express();

// // logger
app.use(logger);

// set engin
app.set('view engine', 'ejs');
app.set('views', path.join(PATH, 'views'));

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true
    })
);

//static folder
app.use(express.static(path.join(PATH, 'public')));

// route
app.use(userRoutes);

// 404
app.use((req, res) => {
    res.status(404).render('404', {
        title: `Page not found`,
        message: `Page doesn't exits`,
        redirect: `/`,
        linkText: `register`
    });
});

app.listen(PORT, () => {
    console.log(`server is up running on port ${PORT}...`);
});
