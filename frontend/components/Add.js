import Link from 'next/link';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const AddButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;
  position: fixed;
  bottom: 5vmin;
  right: 5vmin;
  font-size: 7rem;
  &:hover {
    color: ${props => props.theme.blue};
  }
`;

const Add = ({ addPath }) => (
  <Link href={`/new${addPath}`}>
    <a>
      <AddButton >
        <FontAwesomeIcon icon={faPlusCircle} />
      </ AddButton>
    </a>
  </Link>
);

export default Add;
