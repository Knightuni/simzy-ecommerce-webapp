const router = require("express").Router();

const {
  getAllProducts,
  getAllProductInfo,
  getAllFilteredProducts,
  getOneProduct,
  getProductImg,
  getProductColor,
  getProductStock,
} = require("../controller/product");

router.route("/").get(getAllProducts);
router.route("/info").get(getAllProductInfo);
router.route("/filtered").get(getAllFilteredProducts);
router.route("/:id").get(getOneProduct);
router.route("/img/:id").get(getProductImg);
router.route("/color/:id").get(getProductColor);
router.route("/stock/:id").get(getProductStock);

module.exports = router;
