const express = require('express');

const userRoutes = require('./src/routes/users');

const authRoutes = require('./src/routes/auth');

const app = express();

app.use(express.json());

app.get('/Helo', (req, res) => {
    res.send("Hello");
});

app.use('/api', userRoutes);

app.use('/api', authRoutes);

try {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log('Server active on port: '+PORT));
} catch (e) {
    Console.log(e)
}
