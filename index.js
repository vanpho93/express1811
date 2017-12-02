const express = require('express');
const reload = require('reload');

const app = express();
reload(app);
app.set('view engine', 'ejs');

app.use(express.static('./public'))

app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/index.html');
    res.render('a');
});

app.get('/chao/:name', (req, res) => {
    const name = req.params.name;
    res.send('Chao ' + name);
});

app.get('/tinh/:tenPhepTinh/:soA/:soB', (req, res) => {
    const { tenPhepTinh, soA, soB } = req.params;
    const pt = new PhepTinh(tenPhepTinh, soA, soB);
    res.send(pt.getResultString());
});

// localhost:3000/CONG/4/5 -> '4 + 5 = 9'

app.get('/x', (req, res) => res.send('HIHIHIHI'));
app.get('*', (req, res) => res.send('404 Not found'));
app.listen(3000, () => console.log('Server started'));

class PhepTinh {
    constructor(tenPhepTinh, soA, soB) {
        this.tenPhepTinh = tenPhepTinh;
        this.soA = soA;
        this.soB = soB;
    }
    getResultString() {
        const calString = this.getCalString();
        return `${calString} = ${eval(calString)}`
    }
    getCalString() {
        const { tenPhepTinh, soA, soB } = this;
        if (tenPhepTinh === 'CONG') return `${soA} + ${soB}`;
        if (tenPhepTinh === 'TRU') return `${soA} - ${soB}`;
        if (tenPhepTinh === 'NHAN') return `${soA} * ${soB}`;
        return `${soA} / ${soB}`;
    }
}
