import HeaderBar from './HeaderBar';

export default function Header() {
    return (
      <HeaderBar>
        <HeaderBar.Logo />
        <HeaderBar.Navbar>
          <HeaderBar.NavItem label="알아보기" path="about" />
          <HeaderBar.NavItem label="프로젝트" path="project" />
          <HeaderBar.NavItem label="지원하기" path="recruit" />
          <HeaderBar.Login />
        </HeaderBar.Navbar>
        <HeaderBar.MenuIcon />
      </HeaderBar>
    )
}