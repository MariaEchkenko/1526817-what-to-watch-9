const AUTH_AVATAR_URL_NAME = 'what-to-watch-avatar';

export type Avatar = string;

export const getAvatarUrl = (): Avatar => {
  const avatarUrl = localStorage.getItem(AUTH_AVATAR_URL_NAME);
  return avatarUrl ?? 'img/avatar.jpg';
};

export const saveAvatarUrl = (avatar: Avatar): void => {
  localStorage.setItem(AUTH_AVATAR_URL_NAME, avatar);
};

export const dropAvatarUrl = (): void => {
  localStorage.removeItem(AUTH_AVATAR_URL_NAME);
};
