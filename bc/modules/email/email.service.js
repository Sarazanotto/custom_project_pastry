const nodemailer = require("nodemailer");

const createTransport = async () => {

    return nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  

};

const sendQuoteEmail = async (userEmail, quoteData) => {
  const transporter = await createTransport();

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #ffffff; color: #8e694d; padding: 20px; text-align: center; }
        .logo { width: 100px; height: 100px;  object-fit: cover; margin-bottom: 10px; }
        .content { padding: 20px; background-color: #ece9e1; border-radius:25px;  }
        .quote-details { background-color: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
        .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
        .label { font-weight: bold; }
        .price { font-size: 24px; color: #8e694d; font-weight: bold; text-align: center; padding: 20px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .button { 
          display: inline-block; 
          padding: 12px 30px; 
          background-color: #a88163; 
          color: white; 
          text-decoration: none; 
          border-radius: 5px; 
          margin: 10px 5px;
        }
        .button.secondary { background-color: #ddd; color: #333; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img 
            src="https://res.cloudinary.com/djdjuv0na/image/upload/v1771497387/monogramma_e1avft.png" 
            alt="Logo Pasticceria" 
            class="logo"
          />
          <h1>Il Tuo Preventivo è Pronto!</h1>
        </div>
        
        <div class="content">
          <p>Ciao <strong>${quoteData.userName}</strong,</p>
          <p>Abbiamo preparato il preventivo per la tua torta ${quoteData.event}!</p>
          
          <div class="quote-details">
            <h3>Dettagli Ordine:</h3>
            
            <div class="detail-row">
              <span class="label">Evento:</span>
              <span>${quoteData.event}</span>
            </div>
            
            <div class="detail-row">
              <span class="label">Numero Persone:</span>
              <span>${quoteData.serving}</span>
            </div>
            
            <div class="detail-row">
              <span class="label">Data Consegna:</span>
              <span>${new Date(quoteData.deliveryData).toLocaleDateString("it-IT")}</span>
            </div>
            
            <div class="detail-row">
              <span class="label">Forma:</span>
              <span>${quoteData.form}</span>
            </div>
            
            <div class="detail-row">
              <span class="label">Base:</span>
              <span>${quoteData.cakeBase}</span>
            </div>
            
            <div class="detail-row">
              <span class="label">Crema:</span>
              <span>${quoteData.cakeCream}</span>
            </div>
            
            <div class="detail-row">
              <span class="label">Topping:</span>
              <span>${quoteData.cakeTopping}</span>
            </div>
            
            ${
              quoteData.cakeLettering
                ? `
            <div class="detail-row">
              <span class="label">Scritta:</span>
              <span>${quoteData.cakeLettering}</span>
            </div>
            `
                : ""
            }
            
            ${
              quoteData.adminNotes
                ? `
            <div class="detail-row">
              <span class="label">Note:</span>
              <span>${quoteData.adminNotes}</span>
            </div>
            `
                : ""
            }
          </div>
          
          <div class="price">
            Prezzo: €${quoteData.priceQuoted}
          </div>
          
          <p style="text-align: center; margin-top: 30px;">
            <strong>Confermi l'ordine?</strong>
          </p>
          
          <div style="text-align: center;">
            <a href="${process.env.FRONTEND_URL}/orders" class="button">
              ✓ Conferma Ordine
            </a>
            <a href="${process.env.FRONTEND_URL}/orders" class="button secondary">
              ✗ Rifiuta
            </a>
          </div>
          
          <p style="margin-top: 30px; font-size: 14px;">
            Puoi confermare o rifiutare l'ordine accedendo al tuo account.
          </p>
        </div>
        
        <div class="footer">
          <p>Grazie per averci scelto!</p>
          <p>Per qualsiasi domanda, rispondi a questa email.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"PastryLab" <${process.env.EMAIL_USER || "test@ethereal.email"}>`,
    to: userEmail,
    subject: `Il tuo preventivo è pronto - €${quoteData.priceQuoted}`,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);

    if (process.env.USE_ETHEREAL === "true") {
      const previewUrl = nodemailer.getTestMessageUrl(info);

      console.log("VEDI EMAIL PREVENTIVO:", previewUrl);
    }

    return {
      success: true,
      messageId: info.messageId,
      previewUrl:
        process.env.USE_ETHEREAL === "true"
          ? nodemailer.getTestMessageUrl(info)
          : null,
    };
  } catch (error) {
    throw error;
  }
};

const sendOrderConfirmation = async (userEmail, quoteData) => {
  const transporter = await createTransport();

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #ffffff; color: #8e694d; padding: 20px; text-align: center; }
        .logo { width: 100px; height: 100px; object-fit: cover; margin-bottom: 10px; }
        .content { padding: 20px; background-color: #ece9e1; border-radius: 25px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img 
            src="https://res.cloudinary.com/djdjuv0na/image/upload/v1771497387/monogramma_e1avft.png" 
            alt="Logo Pasticceria" 
            class="logo"
          />
          <h1><strong>✓ Ordine Confermato!</strong></h1>
        </div>
        <div class="content">
          <p>Ciao <strong>${quoteData.userName}</strong>,</p>
          <p>Il tuo ordine è stato confermato! Stiamo preparando la tua torta ${quoteData.event}.</p>
          <p><strong>Data di consegna:</strong> ${new Date(quoteData.deliveryData).toLocaleDateString("it-IT")}</p>
          <p>Ti aspettiamo!</p>
        </div>
        <div class="footer">
          <p>Grazie per averci scelto!</p>
          <p>Per qualsiasi domanda, rispondi a questa email.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"PastryLab" <${process.env.EMAIL_USER || "test@ethereal.email"}>`,
    to: userEmail,
    subject: "Ordine Confermato!",
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);

    if (process.env.USE_ETHEREAL === "true") {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log("VEDI EMAIL CONFERMA ORDINE:", previewUrl);
    }

    return {
      success: true,
      messageId: info.messageId,
      previewUrl:
        process.env.USE_ETHEREAL === "true"
          ? nodemailer.getTestMessageUrl(info)
          : null,
    };
  } catch (error) {
    throw error;
  }
};
const sendOrderReady = async (userEmail, quoteData) => {
  const transporter = await createTransport();

  const isDelivery = !!quoteData.address;

  const deliveryMessage = isDelivery
    ? `<p> <strong>Il tuo ordine verrà consegnato al tuo indirizzo entro la data indicata.</strong></p>
       <p><strong>Indirizzo di consegna:</strong> ${quoteData.address?.street}, ${quoteData.address?.city} ${quoteData.address?.zipCode}</p>`
    : `<p> <strong>La tua torta è pronta per il ritiro in negozio!</strong></p>
       <p>Passa a trovarci quando vuoi. Ti aspettiamo!</p>`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #ffffff; color: #8e694d; padding: 20px; text-align: center; }
        .logo { width: 100px; height: 100px; object-fit: cover; margin-bottom: 10px; }
        .content { padding: 20px; background-color: #ece9e1; border-radius: 25px; }
        .highlight-box { background-color: white; border-left: 4px solid #8e694d; padding: 15px 20px; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img 
            src="https://res.cloudinary.com/djdjuv0na/image/upload/v1771497387/monogramma_e1avft.png" 
            alt="Logo Pasticceria" 
            class="logo"
          />
          <h1>Il tuo ordine è pronto!</h1>
        </div>
        <div class="content">
          <p>Ciao <strong>${quoteData.userName}</strong>,</p>
          <p>La tua torta <strong>${quoteData.event}</strong> è stata completata con cura dalla nostra pasticceria!</p>
          
          <div class="highlight-box">
            ${deliveryMessage}
          </div>

          <p><strong>Data di consegna prevista:</strong> ${new Date(quoteData.deliveryData).toLocaleDateString("it-IT")}</p>

          ${quoteData.adminNotes ? `<p><strong>Note:</strong> ${quoteData.adminNotes}</p>` : ""}

          <p>Grazie per aver scelto la nostra pasticceria. Speriamo che la torta possa rendere speciale il tuo ${quoteData.event}!</p>
        </div>
        <div class="footer">
          <p>Grazie per averci scelto!</p>
          <p>Per qualsiasi domanda, rispondi a questa email.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"Pastrylab" <${process.env.EMAIL_USER || "test@ethereal.email"}>`,
    to: userEmail,
    subject: isDelivery
      ? "Il tuo ordine è in arrivo!"
      : "La tua torta è pronta per il ritiro!",
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);

    if (process.env.USE_ETHEREAL === "true") {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log("VEDI EMAIL ORDINE PRONTO:", previewUrl);
    }

    return {
      success: true,
      messageId: info.messageId,
      previewUrl:
        process.env.USE_ETHEREAL === "true"
          ? nodemailer.getTestMessageUrl(info)
          : null,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  sendQuoteEmail,
  sendOrderConfirmation,
  sendOrderReady,
};
