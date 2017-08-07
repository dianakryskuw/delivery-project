module.exports = (app) => {
	app.get('/data', (req, res) => {
    //here some db call
		var data = [{
      text: 'dadasdad'
    },
    {
      text: '2323'
    },
    {
      text: 'dadfwfasdad'
    },
    {
      text: '3232'
    },
    {
      text: '23232'
    }]
    res.send(data)
	});
}
