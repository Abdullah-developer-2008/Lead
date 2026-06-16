// utils/emailTemplates.js or utility function section
function compileOrderEmailTemplate({ customerInfo, items, totalPrice, paymentMethod, transactionId, authenticatedUid, username }) {
    const formattedDate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' });
    const totalItemsCount = items.reduce((acc, curr) => acc + curr.quantity, 0);

    const productTableRows = items.map(item => `
        <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #001B5E;">${item.title.toUpperCase()}</td>
            <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; text-align: center; color: #5b6b94;">${item.quantity}</td>
            <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; text-align: right; color: #5b6b94;">$${item.price.toFixed(2)}</td>
            <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; text-align: right; font-weight: bold; color: #001B5E;">$${(item.price * item.quantity).toFixed(2)}</td>
        </tr>
    `).join('');

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Order Alert</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f6fa; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 650px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); overflow: hidden; border: 1px solid #e8ebf3;">
            <tr>
                <td bgcolor="#001B5E" style="padding: 30px 20px; text-align: center;">
                    <h1 style="color: #B6FF00; margin: 0; font-size: 24px; letter-spacing: 1px; font-family: monospace;">> NEW ORDER RECEIVED // FUTDRIP</h1>
                    <p style="color: #ffffff; margin: 5px 0 0 0; font-size: 14px; opacity: 0.8;">System Dispatch Timestamp: ${formattedDate}</p>
                </td>
            </tr>
            <tr>
                <td style="padding: 30px 20px;">
                    <h3 style="color: #001B5E; margin-top: 0; border-bottom: 2px solid #f4f6fa; padding-bottom: 8px;">📋 CUSTOMER MANIFEST</h3>
                    <table width="100%" style="margin-bottom: 25px; font-size: 14px; color: #333333; line-height: 1.6;">
                        <tr><td width="35%" style="color: #5b6b94; font-weight: 600;">Full Name:</td><td style="font-weight: bold;">${customerInfo.fullName}</td></tr>
                        <tr><td style="color: #5b6b94; font-weight: 600;">Phone Number:</td><td>${customerInfo.phoneNumber}</td></tr>
                        <tr><td style="color: #5b6b94; font-weight: 600;">Email Address:</td><td>${customerInfo.email}</td></tr>
                        <tr><td style="color: #5b6b94; font-weight: 600;">City Target:</td><td>${customerInfo.city}</td></tr>
                        <tr><td style="color: #5b6b94; font-weight: 600;">Delivery Address:</td><td>${customerInfo.deliveryAddress}</td></tr>
                    </table>

                    <h3 style="color: #001B5E; border-bottom: 2px solid #f4f6fa; padding-bottom: 8px;">💳 FINANCIAL MATRIX</h3>
                    <table width="100%" style="margin-bottom: 25px; font-size: 14px; color: #333333; line-height: 1.6;">
                        <tr><td width="35%" style="color: #5b6b94; font-weight: 600;">Method Selected:</td><td><span style="background-color: #001B5E; color: #B6FF00; padding: 3px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">${paymentMethod === 'COD' ? 'Cash on Delivery (COD)' : 'EasyPaisa Online Payment'}</span></td></tr>
                        ${paymentMethod === 'EasyPaisa' ? `<tr><td style="color: #5b6b94; font-weight: 600;">Transaction ID:</td><td style="font-family: monospace; font-weight: bold; color: #d32f2f;">${transactionId}</td></tr>` : ''}
                    </table>

                    <h3 style="color: #001B5E; border-bottom: 2px solid #f4f6fa; padding-bottom: 8px;">📦 MANIFEST ITEMS</h3>
                    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; font-size: 14px; margin-bottom: 25px;">
                        <thead>
                            <tr bgcolor="#f8f9fd">
                                <th style="padding: 12px; text-align: left; color: #5b6b94; border-bottom: 2px solid #e0e0e0;">PRODUCT</th>
                                <th style="padding: 12px; text-align: center; color: #5b6b94; border-bottom: 2px solid #e0e0e0;">QTY</th>
                                <th style="padding: 12px; text-align: right; color: #5b6b94; border-bottom: 2px solid #e0e0e0;">PRICE</th>
                                <th style="padding: 12px; text-align: right; color: #5b6b94; border-bottom: 2px solid #e0e0e0;">TOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${productTableRows}
                        </tbody>
                    </table>

                    <table width="100%" style="background-color: #f8f9fd; border-radius: 8px; padding: 15px; font-size: 14px;">
                        <tr><td style="color: #5b6b94;">Total Units Ordered:</td><td style="text-align: right; font-weight: 600;">${totalItemsCount} Items</td></tr>
                        <tr><td style="font-size: 16px; color: #001B5E; font-weight: bold;">GRAND TOTAL OUTFLOW:</td><td style="text-align: right; font-size: 18px; color: #001B5E; font-weight: 900;">$${totalPrice.toFixed(2)}</td></tr>
                    </table>

                    <h3 style="color: #5b6b94; font-size: 11px; margin-top: 30px; border-top: 1px solid #f4f6fa; padding-top: 15px; font-family: monospace;">> DIAGNOSTIC AUTHENTICATION LAYER</h3>
                    <p style="font-family: monospace; font-size: 11px; color: #9aa5c4; margin: 0;">USER_ID: ${authenticatedUid} | OPERATOR_NODE: ${username}</p>
                </td>
            </tr>
            <tr>
                <td bgcolor="#f4f6fa" style="padding: 20px; text-align: center; font-size: 12px; color: #888888; border-top: 1px solid #e8ebf3;">
                    This notification was dynamically auto-compiled and pushed by FutDrip Automated Gateway Hooks.
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
}

module.exports = { 
    compileOrderEmailTemplate 
};