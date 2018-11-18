import React, { Component } from 'react';
import styled from 'styled-components';

export const UserEntry = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr 1fr 1fr 1fr;
  margin: 5px 0;
  &:hover {
    background-color: ${props => props.theme.offWhite};
  }
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    &.image-container {
      justify-content: flex-end;
    }
  }
  img {
    border-radius: 50%;
    height: 50px;
  }
  h4 {
    margin: 0 auto;
  }
`;

class Employee extends Component {
  render() {
    const {
      name, department, location, image, title,
    } = this.props.employee;
    return (
      <UserEntry>
        <span className="image-container">
          <img src={image} alt="User avatar" />
        </span>
        <span>{name}</span>
        <span>{title}</span>
        <span>{department.name}</span>
        <span>{location.city}</span>
      </UserEntry>
    );
  }
}


export default Employee;
