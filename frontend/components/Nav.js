import Link from 'next/link';
import { withRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import NavStyles from './styles/NavStyles';
import { urlFormatter } from '../lib/utils';


const Nav = ({ router }) => {
  const addPath = urlFormatter(router.asPath);
  return (
    <NavStyles>
      <Link href={`/new${addPath}`}>
        <a>
          <FontAwesomeIcon icon={faPlus} size="lg" />
          New {addPath}
        </a>
      </Link>
      <Link href="/index">
        <a>Home</a>
      </Link>
      <Link href="/departments">
        <a>Departments</a>
      </Link>
      <Link href="/locations">
        <a>Locations</a>
      </Link>
    </NavStyles>
  );
};

export default withRouter(Nav);
