module.exports = function(app, db) {
    app.post('/notes/create', (req, res) => {
        //collect the request body
        const body = req.body

        //save inside the database
        db.collection('notes').insertOne(body, (err, result) => {
            if (err) {
                res.status(500).json({
                    message: 'An error has occured: ' + err,
                    body: body
                })
            } else {
                res.status(200).json({
                    message: 'Note successfully created',
                    body: result.ops[0]
                })
            }
        })
    });

    app.get('/notes', (req, res) => {
        db.collection('notes').find({}).toArray(function (err, items) {
            if (err) {
                res.status(500).json({
                    message: 'An error has occured: ' + err,
                    body: {}
                })
            } else {
                res.status(200).json({
                    message: 'Notes successfully retrieved',
                    body: items
                })
            }
        })
    })

    app.get('/notes/:id', (req, res) => {
        const id = new ObjectID(req.params.id)
        
        db.collection('notes').findOne(id, (err, item) => {
            if(err) {
                res.status(500).json({
                    message: 'An error has occured: ' + err,
                    body: id
                })
            } else {
                res.status(200).json({
                    message: 'Note successfully retrieved',
                    body: item
                })
            }
        })
    })

    app.delete('/notes/:id', (req, res) => {
        const params = { '_id': new ObjectID(req.params.id) }

        db.collection('notes').deleteOne(params, (err, item) => {
            if (err) {
                res.status(500).json({
                    message: 'An error has occured: ' + err,
                    body: id
                })
            } else {
                res.status(200).json({
                    message: 'Note successfully deleted',
                    body: {}
                })
            }
        })
    })

    app.put('/notes/:id', (req, res) => {
        const params = { '_id': new ObjectID(req.params.id) }
        const body = req.body

        db.collection('notes').update(params, body, (err, result) => {
            if (err) {
                res.status(500).json({
                    message: 'An error has occured: ' + err,
                    body: body
                })
            } else {
                console.log(result)
                res.status(200).json({
                    message: 'Note successfully updated',
                    body: body
                })
            }
        })
    })
}
