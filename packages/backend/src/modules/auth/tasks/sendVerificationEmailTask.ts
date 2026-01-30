import type { IUserRepository } from '../../user/repository/types';
import type { IEmailService } from '../../../infra/email/emailService';
import type { TaskHandler } from '../../../infra/queue/queue';

export const createSendVerificationEmailHandler = (
  userRepository: IUserRepository,
  emailService: IEmailService,
  frontendUrl: string,
): TaskHandler => {
  return async (payload: Record<string, unknown>) => {
    if (typeof payload.userId !== 'string') {
      throw new Error('Missing userId in task payload');
    }
    const userId = payload.userId;
    const user = await userRepository.findOneById(userId);

    if (user.emailVerified || !user.verifyToken) {
      return;
    }

    const verifyUrl = `${frontendUrl}/verify?token=${user.verifyToken}`;

    await emailService.send({
      to: user.email,
      subject: 'Verify your email - The Knowledge Kingdom',
      html: `<p>Welcome to The Knowledge Kingdom, ${user.name}!</p><p><a href="${verifyUrl}">Click here to verify your email</a></p>`,
    });
  };
};
