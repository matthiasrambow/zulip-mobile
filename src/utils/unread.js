/* @flow */
import type { Message } from '../types';

export const filterUnreadMessageIds = (messageIds: number[], flags: Object): number[] =>
  messageIds.filter((msgId: number) => !flags || !flags.read || !flags.read[msgId]);

export const filterUnreadMessagesInRange = (
  messages: Message[],
  flags: Object,
  fromId: number,
  toId: number,
): Message[] => {
  const messagesInRange = messages.filter(msg => msg.id >= fromId && msg.id <= toId);
  return filterUnreadMessageIds(messagesInRange.map(x => x.id), flags);
};

export const countUnread = (
  messageIds: number[],
  readFlags: Object,
  fromId: number = -1,
  toId: number = -1,
): number => {
  let count = 0;
  // count starts from the beginning if fromId === -1
  // and continues to the end if toId === -1
  let started = fromId === -1;

  for (let i = 0; i < messageIds.length; i++) {
    if (messageIds[i] === fromId) {
      started = true;
    }
    if (started && !readFlags[messageIds[i]]) {
      count++;
    }
    if (messageIds[i] === toId) {
      break;
    }
  }

  return count;
};

export const unreadToLimitedCount = (count: number): string =>
  count < 100 ? count.toString() : '99+';
