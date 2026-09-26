module.exports = app => {
    const products = require("../controller/product.controller");
    const verifyToken = require("../utility/commonFunctions");
    const { uploadFiles } = require("../midddleware/multer");


    var router = require("express").Router();

    router.get("/", products.fetchAll);
    router.post("/create",verifyToken,uploadFiles,products.create);
    router.post("/checkoutProducts", products.checkoutProducts);
    router.post("/verifyCheckout", products.verifyCheckout);


    app.use("/api/product", router);
};