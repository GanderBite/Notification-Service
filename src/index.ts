import express from 'express';

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.send({
    message: 'hello world',
  });
});

app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});
