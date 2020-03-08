const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');
const Cart = require('../models/bag.model');
const cartService = require('../services/cart.service');

exports.generateInvoice = (req, res, next) => {
    orderID = req.params.id;
    //TODO find cartID in cart-items table, then in cart table find userID and compare it to req.user.id (currently logged in user)
    
    const invoice = 'Račun-' + orderID + '.pdf';
    const invoicePath = path.join('invoices', invoice);

    const pdfDoc = new PDFDocument();
    pdfDoc.pipe(fs.createWriteStream(invoicePath));
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline');
   
    pdfDoc.pipe(res);

    pdfDoc.fontSize(14).text('Invoice no.: ' + orderID, {
        underline: true
    });
    pdfDoc.text('\n');
    pdfDoc.text('-------------------------------------');

    pdfDoc.end();
    
}