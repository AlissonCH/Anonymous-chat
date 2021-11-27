import { useState } from 'react';
import { Link } from 'react-router-dom';
import StyledNav, { DesktopMenu, HamburgerButton, MobileMenu } from './styled/Nav.styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Nav = () => {
  const [navOpen, setNav] = useState(true);
  return (
    <StyledNav>
      <HamburgerButton>
        <FontAwesomeIcon icon={faBars} onClick={() => setNav((c) => !c)} />
      </HamburgerButton>
      <MobileMenu open={navOpen}>
        <Link to='/' onClick={() => setNav(false)}>
          <h1>Chats grupales</h1>
        </Link>
        <Link to='/chats' onClick={() => setNav(false)}>
          <p>Mis Chats</p>
        </Link>
        <Link to='/usuarios' onClick={() => setNav(false)}>
          <p>Usuarios en línea</p>
        </Link>
      </MobileMenu>

      <DesktopMenu>
        <Link to='/'>
          <h1>Chats grupales</h1>
        </Link>
        <Link to='/chats'>
          <p>Mis Chats</p>
        </Link>
        <Link to='/usuarios'>
          <p>Usuarios en línea</p>
        </Link>
      </DesktopMenu>
    </StyledNav>
  );
};

export default Nav;
