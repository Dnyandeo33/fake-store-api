import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';


import productRoutes from './routes/store.js';
import userRoutes from './routes/user.js';


//configuration dotenv

dotenv.config();
const PORT = process.env.PORT || 3005;

// absolute path

const __filename = fileURLToPath(import.meta.url);
const PATH = dirname(__filename);

// initialize express
const app = express();

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// // logger
// app.use(logger);

// set engin
app.set('view engine', 'ejs');
app.set('views', path.join(PATH, 'views'));


//static folder
app.use(express.static(path.join(PATH, 'public')));

// route
app.use(userRoutes);
app.use(productRoutes);

// 404
app.use((req, res) => {
    res.status(404).render('404', {
        title: `Page not found`,
        message: `Page doesn't exits`,
        redirect: `/`,
        linkText: `register`,
    });
});

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`);
});
