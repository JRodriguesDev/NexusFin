import { prisma } from '@/lib/prisma/prisma';
import 'server-only';
import { Message } from '@/types/chat';

export const createMessage = async (
  sessionId: string | null,
  userMessage: Message,
  IaMessage: string,
  updateSummary?: string
) => {
  let activateSessionId = sessionId;
  if (!activateSessionId) {
    const newSesion = await prisma.chatSession.create({
      data: {
        title: userMessage.content.slice(0, 30) || 'Nova conversa',
      },
      select: { id: true },
    });
    activateSessionId = newSesion.id;
  } else {
    await prisma.chatSession.update({
      where: { id: activateSessionId },
      data: { summary: updateSummary ?? undefined },
    });
  }

  await prisma.chatMessage.createMany({
    data: [
      {
        id: userMessage.id,
        sessionId: activateSessionId,
        role: 'human',
        content: userMessage.content,
      },
      {
        sessionId: activateSessionId,
        role: 'assistant',
        content: IaMessage,
      },
    ],
  });

  return activateSessionId;
};

export const getSessions = async () => {
  return await prisma.chatSession.findMany({
    select: {
      id: true,
      title: true,
    },
  });
};

export const getSessionMessages = async (sessionId: string) => {
  const [session, messages] = await prisma.$transaction([
    prisma.chatSession.findUnique({
      where: { id: sessionId },
      select: {
        id: true,
        summary: true,
      },
    }),
    prisma.chatMessage.findMany({
      where: { sessionId: sessionId },
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        role: true,
        content: true,
      },
    }),
  ]);

  return { session, messages };
};
