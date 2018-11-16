import Link from 'next/link';
import NavStyles from './styles/NavStyles';

const Nav = () => (
  <NavStyles>
    <Link href="/index">
      <a>Home</a>
    </Link>
    <Link href="/departments">
      <a>Departments</a>
    </Link>
    <Link href="/locations">
      <a>Locations</a>
    </Link>
    <Link href="/add">
      <a>New Employee</a>
    </Link>
  </NavStyles>
);

export default Nav;
