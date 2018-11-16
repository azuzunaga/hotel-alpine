import Link from 'next/link';
import styled from 'styled-components';

const AddButton = styled.img`
  width: 7rem;
  height: 7rem;
  position: fixed;
  bottom: 5vmin;
  right: 5vmin;
`;

const Add = ({ addPath }) => (
  <Link href={`/new${addPath}`}>
    <a><AddButton src="/../static/plus.svg"/></a>
  </Link>
);

export default Add;
