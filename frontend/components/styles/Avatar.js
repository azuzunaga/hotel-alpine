import styled from 'styled-components';

const Avatar = styled.img`
  border-radius: 50%;
  width: 20rem;
  height: 20rem;
  margin: 0.5rem;
  @media (max-width: 700px) {
    width: 10rem;
    height: 10rem;
  }
`;

export default Avatar;
