import PropTypes from 'prop-types';

import {
  LinkedinLogo,
  XLogo,
  GithubLogo
} from './icons';

const socialMediaList = [
  {
    name: 'X',
    icon: XLogo,
    href: 'https://x.com/heyiamvishal',
  },
  {
    name: 'Gihub',
    icon: GithubLogo,
    href: 'https://github.com/vishal-y/Codebattle',
  },
  {
    name: 'Linkedin',
    icon: LinkedinLogo,
    href: 'https://www.linkedin.com/in/vishal-yadav-321101255/',
  },
];

function SocialMediaIcon({ icon: Icon, name }) {
  return (
    <>
      <Icon weight="fill" className="h-6 w-6" />
      <span className="sr-only">{name}</span>
    </>
  );
}

SocialMediaIcon.propTypes = {
  icon: PropTypes.elementType.isRequired,
  name: PropTypes.string.isRequired,
};

export function SocialMediaList() {
  return (
    <div className="flex gap-3">
      {socialMediaList.map(({ href, icon, name }) => (
        <a
          className="text-white/50 hover:text-white/90"
          target='_blank'
          href={href}
          key={name}
          aria-label={name}
          rel="noreferrer"
        >
          <SocialMediaIcon name={name} icon={icon} />
        </a>
      ))}
    </div>
  );
}
