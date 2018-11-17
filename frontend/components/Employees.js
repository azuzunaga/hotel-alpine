import React, { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import gql from 'graphql-tag';
import Employee from './Employee';

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


class Employees extends Component {
  render() {
    return (
      <Center>
        <Query query={ALL_EMPLOYEES_QUERY}>
          {({ data, loading, error }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;
            return (
              <div>
                {data.users.map(user => (
                  <Employee key={user.id} employee={user} />
                ))}
              </div>
            );
          }}
        </Query>
      </Center>
    );
  }
}

export default Employees;
