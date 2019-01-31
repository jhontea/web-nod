pool = require('./db')

module.exports = function (app) {

    app.get('/', (req, res) => res.render('pages/home'))
    app.get('/db', async (req, res) => {
        try {
            const client = await pool.connect()
            const result = await client.query('SELECT * FROM test_table');
            const results = { 'results': (result) ? result.rows : null};
            res.render('pages/db', results );
            client.release();
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    })
    app.get('/rsvp', (req, res) => res.send(showRsvp()));

    showRsvp = () => {
        return "This is rsvp"
    }
}