const nodemailer = require("nodemailer");

// 1. Configure Transport (using Gmail or a professional service like SendGrid/Mailgun)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Sends a notification email when a lead status changes.
 * @param {string} recipientEmail - Email address of the lead owner.
 * @param {object} lead - The lead object.
 */
exports.sendLeadStatusUpdateEmail = async (recipientEmail, lead) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    subject: `🎉 Lead Won: Congratulations! Lead ${lead.name} is now ${lead.status}`,
    html: `
      <p>Dear ${lead.owner.name},</p>
      <p>The lead **${lead.name}** for **${
      lead.company || "N/A"
    }** has been successfully updated to **${lead.status}**.</p>
      <p>This is a great achievement!</p>
      <p>Details:</p>
      <ul>
        <li>**Email**: ${lead.email}</li>
        <li>**Current Status**: ${lead.status}</li>
      </ul>
      <p>Best regards,</p>
      <p>Your NextGen CRM Team</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent: " + info.response);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};
