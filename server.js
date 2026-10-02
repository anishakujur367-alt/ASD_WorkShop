const express = require("express");
const app = express();
const productRoutes = require("./src/routes/productRoutes");

const port = 3002;


app.use(express.json());

app.use("/", productRoutes);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});