import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import DeleteEmployee from './DeleteEmployee';

export const UserEntry = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr 1fr 1fr 1fr 100px;
  margin: 5px 0;
  &:hover {
    background-color: ${props => props.theme.offWhite};
  }
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    &.image-container {
      justify-content: space-evenly;
    }
  }
  h4 {
    margin: 0 auto;
  }
  img {
    border-radius: 50%;
  }
  .avatar {
    border-radius: 50%;
    height: 50px;
  }
`;

class Employee extends Component {
  render() {
    const {
      id, name, department, location, image, title,
    } = this.props.employee;
    return (
      <UserEntry>
        <span className="image-container">
          <img className="avatar" src={image} alt="User avatar" />
        </span>
        <span>{name}</span>
        <span>{title}</span>
        <span>{department.name}</span>
        <span>{location.city}</span>
        <span className="image-container">
          <Link href="/updateEmployee">
            <a>
              <img src="/../static/edit.svg" alt="Edit" />
            </a>
          </Link>
          <DeleteEmployee id={id}/>
        </span>
      </UserEntry>
    );
  }
}


export default Employee;
