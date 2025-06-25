export function getDiscordAvatarURL(id: string, avatar: string | null) {
  if (!avatar) {
    const index = parseInt(id) % 5;
    return `https://cdn.discordapp.com/embed/avatars/${index}.png`;
  }

  const format = avatar.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${id}/${avatar}.${format}?size=512`;
}
