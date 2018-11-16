import Link from 'next/link';
import NavStyles from './styles/NavStyles';

const Nav = () => (
  <NavStyles>
    <Link href="/index">
      <a>Home</a>
    </Link>
    <Link href="/index">
      <a>Departments</a>
    </Link>
    <Link href="/index">
      <a>Locations</a>
    </Link>
  </NavStyles>
);

export default Nav;
