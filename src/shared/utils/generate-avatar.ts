type AdditionalParams = {
  name: string;
  bold?: boolean;
  rounded?: boolean;
  format?: 'svg' | 'png';
  background?: string;
};

const baseUrl = 'https://ui-avatars.com/api';
const additionalParams = ({
  name,
  bold = true,
  rounded = true,
  format = 'svg',
  background = 'random',
}: AdditionalParams) => {
  const removeEmailPrefix = name.split('@')[0];
  const nameParse = removeEmailPrefix.replaceAll(' ', '+');
  return `?name=${nameParse}&bold=${bold}&rounded=${rounded}&format=${format}&background=${background}`;
};

export const generateAvatar = (params: AdditionalParams) =>
  `${baseUrl}${additionalParams(params)}`;
