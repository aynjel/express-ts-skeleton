import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', (req: express.Request, res: express.Response) => {
    res.send('Hello World');
});

app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));