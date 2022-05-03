const express = require('express');
const path = require('path');
const mysql = require('mysql')
const app = express();
const bodyparser = require('body-parser');

var cors = require('cors')
app.use(cors())

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'mudfoot.doc.stu.mmu.ac.uk',
    user: "abbasiu",
    password: "Fipplend3",
    database: 'abbasiu',
    port:'6306'
});

const tablename = "buddy_activities"

app.set('port', (process.env.PORT || 2000));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/api/1.0.0/activity', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('connected as Id', +connection.threadId)
        connection.query(`select * from ${tablename};`, (err, rows) => {
            connection.release();
            if (err) {
                console.log(err)
                return
            }

            res.send(rows)
        })

    })

})

app.listen(app.get('port'), () => {
    console.log("server started on port " + app.get('port'))
})