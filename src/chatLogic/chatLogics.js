export const getSender = (loggedUser, users) => {
  return users[0]?.id === loggedUser?.id ? users[0].fullName : users[1].fullName;
};

export const getSenderFull = (loggedUser, users) => {
  return users[0]?.id === loggedUser?.id ? users[0] : users[1];
};

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender.id !== m.sender.id ||
      messages[i + 1].sender.id === undefined) &&
    messages[i].sender.id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender.id !== userId &&
    messages[messages.length - 1].sender.id
  );
};
