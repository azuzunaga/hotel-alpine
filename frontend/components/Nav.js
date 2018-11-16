import Link from 'next/link';
import { withRouter } from 'next/router';
import Add from './Add';
import NavStyles from './styles/NavStyles';
import { urlFormatter } from '../lib/utils';

const Nav = ({ router }) => {
  const addPath = urlFormatter(router.asPath);
  return (
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
      <Link href={`/new${addPath}`}>
        <a>New {addPath}</a>
      </Link>
      {router.asPath.includes('new') ? null : <Add addPath={addPath}/>}
    </NavStyles>
  );
};

export default withRouter(Nav);
