import React, { Component } from 'react';
import styled from 'styled-components';

const UserCard = styled.div`
  display: flex;
  flex-direction: column;
  img {
    position: absolute;
  }
`;

class Employee extends Component {
  render() {
    const {
      name, department, location, image, title,
    } = this.props.employee;
    return (
      <UserCard>
        <img src={image} alt="User avatar" />
        <section>
          <h2>{name}</h2>
          <h4>{title}</h4>
          <h3>{department.name}</h3>
          <h3>{location.city}</h3>
        </section>
      </UserCard>
    );
  }
}


export default Employee;
