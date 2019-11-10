pool = require('./db')

module.exports = function (app) {

    app.get('/', (req, res) => res.render('pages/home'))
    app.get('/cl', (req, res) => res.render('pages/wed'))
    app.get('/_main', (req, res) => res.render('main/main'))
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

    app.get('/rsvp/:key', async (req, res) => {
        try {
            const { key } = req.params
            const client = await pool.connect()
            
            const { rows } = await client.query('SELECT * FROM rsvp WHERE key = $1', [key])

            res.render('rsvp/rsvp', {rows} );

            client.release();
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    })
}