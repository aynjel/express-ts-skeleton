import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import createError from 'http-errors';
import methodOverride from 'method-override';
import session from 'express-session';
import mongoStore from 'connect-mongo';
import passport from 'passport';
// import './config/passport';
// import './database/db';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const app = express();

app.engine('ejs', require('ejs-mate'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"));
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'default_secret',
        resave: false,
        saveUninitialized: false,
        store: mongoStore.create({
            mongoUrl: process.env.MONGODB_URI,
            collectionName: 'sessions',
        }),
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

app.use((req: Request, res: Response, next: NextFunction) => {
    next(createError(404));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.render('error', { message: err.message, error: err });
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));