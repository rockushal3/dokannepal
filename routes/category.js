const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');
const uploadImage = require("../middleware/imageHandler");

const category= new categoryController();

const tokenHandler = require("../middleware/tokenHandler");


router.get('/category', category.getCategory);
router.get('/category/:limit', category.getCategoryWithLimit)

router.post('/category', [uploadImage], category.addCategory);

router.get('/categorys/:id', category.getcategorybyid);
router.put('/category/:id',[uploadImage], category.updateCategory);
router.delete('/category/:id',category.deleteCategory);

module.exports = router;