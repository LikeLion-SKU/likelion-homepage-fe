import HeaderBar from './HeaderBar';

export default function Header() {
  const handleNavClick = (label) => {
    window.gtag('event', 'nav_click', {
      event_category: 'navigation',
      event_label: label,
    });
  };
  return (
    <HeaderBar>
      <HeaderBar.Logo />
      <HeaderBar.Navbar>
        <HeaderBar.NavItem
          label='구성원'
          path='about'
          onClick={() => handleNavClick('구성원')}
        />
        <HeaderBar.NavItem
          label='프로젝트'
          path='project'
          onClick={() => handleNavClick('프로젝트')}
        />
        <HeaderBar.NavItem
          label='지원하기'
          path='recruit'
          onClick={() => handleNavClick('지원하기')}
        />
        <HeaderBar.Login onClick={() => handleNavClick('로그인')} />
      </HeaderBar.Navbar>
      <HeaderBar.MenuIcon onClick={() => handleNavClick('메뉴')} />
    </HeaderBar>
  );
}
