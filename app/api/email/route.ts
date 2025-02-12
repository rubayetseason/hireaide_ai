import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export async function POST(request: NextRequest) {
  const {
    fullname,
    companyname,
    email,
    jobtitle,
    companysize,
    interviewSchedulingMethod,
    interviewChallenges,
    otherChallenge,
    interviewCount,
    betaAccess,
    openToCall,
    calendly,
  } = await request.json();

  const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "",
      pass: "",
    },
  });

  const emailContent = `
   <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; max-width: 600px; margin: auto;">
      <h2 style="color: #444;">New Form Submission</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td><strong>Full Name:</strong></td><td>${fullname}</td></tr>
        <tr><td><strong>Company Name:</strong></td><td>${companyname}</td></tr>
        <tr><td><strong>Work Email:</strong></td><td>${email}</td></tr>
        <tr><td><strong>Job Title:</strong></td><td>${jobtitle}</td></tr>
        <tr><td><strong>Company Size:</strong></td><td>${companysize}</td></tr>
        <tr><td><strong>Interview Scheduling Method:</strong></td><td>${interviewSchedulingMethod}</td></tr>
        <tr><td><strong>Interview Challenges:</strong></td><td>${interviewChallenges?.join(", ") || "None"}</td></tr>
        <tr><td><strong>Other Challenge:</strong></td><td>${otherChallenge || "None"}</td></tr>
        <tr><td><strong>Monthly Interviews:</strong></td><td>${interviewCount}</td></tr>
        <tr><td><strong>Beta Access:</strong></td><td>${betaAccess}</td></tr>
        <tr><td><strong>Open to Call:</strong></td><td>${openToCall}</td></tr>
        ${calendly ? `<tr><td><strong>Calendly Link:</strong></td><td><a href="${calendly}" target="_blank">${calendly}</a></td></tr>` : ""}
      </table>
      <br>
      <p style="font-size: 14px; color: #666;">This message was sent via the join waitlist form.</p>
    </div>
  `;

  const mailOptions: Mail.Options = {
    from: email,
    to: "info@m37labs.com",
    subject: `Waitlist mail from ${fullname}`,
    html: emailContent,
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve("Email sent");
        } else {
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();
    return NextResponse.json({ message: "Email sent", success: true });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
