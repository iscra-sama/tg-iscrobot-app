const express = require("express")

const app = express();
app.use(express.json());
app.listen(process.env.PORT || 8080, () => {

});

app.get(/.*/, (_, res) => {
    res.json(true);
});
app.post(/.*/, (req, res) => {
    console.log(req.body);
    res.json(req.body);
});