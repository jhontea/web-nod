pool = require('./db')

module.exports = function (app) {

    app.get('/_main', (req, res) => res.render('pages/home'))
    app.get('/cl', (req, res) => res.render('pages/wed'))
    app.get('/', (req, res) => res.render('main/main'))

    app.get('/send', async (req, res) => {
        try {
            var word = "We invite you to share with us a celebration of love ..."

            const client = await pool.connect()
            const result = await client.query('SELECT * FROM rsvp where phone is not null and id = 4');
            const results = { 'results': (result) ? result.rows : null};

            var urlRsvp  = "https://web-nod.herokuapp.com/rsvp/" + results.results[0].key

            console.log(word)
            console.log(results)

            var request = require('request'); //bash: npm install request
            // URL for request POST /message
            var url = 'https://eu76.chat-api.com/instance78571/sendMessage?token=yvbxc7x5q2lctalc';
            var data = {
                phone: results.results[0].phone, // Receivers phone
                body: urlRsvp + " " + word, // Content
            };
            // Send a request
            request({
                url: url,
                method: "POST",
                json: data
            });

            res.send(results.results[0])
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    })

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

            if (rows.length == 0) {
                res.redirect("/")
            } else {
                res.render('rsvp/rsvp', {rows} );
            }

            client.release();
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    })

    app.get('/invitation/:key', async (req, res) => {
        try {
            const { key } = req.params
            const client = await pool.connect()
            
            const { rows } = await client.query('SELECT * FROM rsvp WHERE key = $1', [key])

            if (rows.length == 0) {
                res.redirect("/")
            } else {
                res.render('rsvp/rsvp', {rows} );
            }

            client.release();
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    })
}