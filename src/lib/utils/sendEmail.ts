
type SendEmailProps = {
  to: string;
  subject: string;
  html: string;
};

export const sendEmail = async ({ to, subject, html }: SendEmailProps) => {
  // const form = new FormData();
  // form.append("from", "Este Center <moha@elguarir.dev>");
  // form.append("to", to);
  // form.append("subject", subject);
  // form.append("html", html);

  // return await fetch("https://api.mailgun.net/v3/elguarir.dev/messages", {
  //   method: "POST",
  //   headers: {
  //     Authorization: "Basic " + btoa(`api:${env.MAILGUN_API_KEY}`),
  //   },
  //   body: form,
  // });
};
