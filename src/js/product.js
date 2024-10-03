import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import productData from "./productData.mjs";
import productDetails from './productDetails.mjs';
import {getParams} from './utils.mjs'

const productId = getParam('prodcut');
productDetails(productId);

