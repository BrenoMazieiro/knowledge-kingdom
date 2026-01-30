export type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

export interface IEmailService {
  send: (payload: EmailPayload) => Promise<void>;
}

export class SendGridEmailService implements IEmailService {
  constructor(
    private readonly apiKey: string,
    private readonly fromEmail: string,
  ) {}

  send = async (payload: EmailPayload): Promise<void> => {
    if (!this.apiKey) {
      return;
    }

    await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: payload.to }] }],
        from: { email: this.fromEmail },
        subject: payload.subject,
        content: [{ type: 'text/html', value: payload.html }],
      }),
    });
  };
}
