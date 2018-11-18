import React, { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import gql from 'graphql-tag';
import Employee from './Employee';
import { UserEntry } from './Employee';

export const ALL_EMPLOYEES_QUERY = gql`
  query ALL_EMPLOYEES_QUERY {
    users(orderBy: name_ASC) {
      id
      name
      department {
        name
      }
      location {
        city
      }
      image
      title
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const UsersList = styled.div`
  max-width: ${props => props.theme.maxWidth};
`;


class Employees extends Component {
  render() {
    return (
      <Center>
        <Query query={ALL_EMPLOYEES_QUERY} fetchPolicy="network-only">
          {({ data, loading, error }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;
            return (
              <UsersList>
                <UserEntry>
                  <span></span>
                  <h4>Name</h4>
                  <h4>Title</h4>
                  <h4>Department</h4>
                  <h4>Location</h4>
                </ UserEntry>
                {data.users.map(user => (
                  <Employee key={user.id} employee={user} />
                ))}
              </UsersList>
            );
          }}
        </Query>
      </Center>
    );
  }
}

export default Employees;
