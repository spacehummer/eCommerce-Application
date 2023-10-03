import logoImg from '#assets/icons/logo.svg';
import modalStateIconOk from '#assets/icons/state-icon-ok.svg';
import modalStateIconErr from '#assets/icons/state-icon-error.svg';
import humanAvatarPlaceholder from '#assets/images/photo-template.png';
import githubLogoLight from '#assets/icons/github-logo-light.svg';
import githubLogoBlueDark75 from '#assets/icons/github-logo-blue-dark-75.svg';
import avatarYuriy from '#assets/images/avatar-yuriy.jpg';
import avatarDavid from '#assets/images/avatar-david.png';

// interface PathsObj {
//   [pathName: string]: string;
// }

// interface PathsObj {
//   LOGO_IMG: string;
//   EMPTY_IMG: string;
//   EMPTY_PLACEHOLDER_IMG: string;
// }

// Record<'LOGO_IMG' | 'EMPTY_IMG' | 'EMPTY_PLACEHOLDER_IMG', string>

const PathsObj: Record<
  | 'LOGO_IMG'
  | 'EMPTY_IMG'
  | 'EMPTY_PLACEHOLDER_IMG'
  | 'MODAL_STATE_ICON_OK'
  | 'MODAL_STATE_ICON_ERR'
  | 'HUMAN_AVATAR_PLACEHOLDER'
  | 'CONTRIBUTOR_PHOTO_YURIY'
  | 'CONTRIBUTOR_PHOTO_DAVID'
  | 'GIT_HUB_LOGO_LIGHT'
  | 'GIT_HUB_LOGO_BLUE_DARK_75',
  string
> = {
  EMPTY_IMG: '',
  EMPTY_PLACEHOLDER_IMG:
    'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
  LOGO_IMG: logoImg,
  MODAL_STATE_ICON_OK: modalStateIconOk,
  MODAL_STATE_ICON_ERR: modalStateIconErr,
  HUMAN_AVATAR_PLACEHOLDER: humanAvatarPlaceholder,
  CONTRIBUTOR_PHOTO_YURIY: avatarYuriy,
  CONTRIBUTOR_PHOTO_DAVID: avatarDavid,
  GIT_HUB_LOGO_LIGHT: githubLogoLight,
  GIT_HUB_LOGO_BLUE_DARK_75: githubLogoBlueDark75,
} as const;

export default PathsObj;
