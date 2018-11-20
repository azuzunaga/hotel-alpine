import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export const ALL_DEPARTMENTS_QUERY = gql`
  query ALL_DEPARTMENTS_QUERY {
    departments {
      id
      name
    }
  }
`;

class Departments extends Component {
  render() {
    return (
      <Query query={ALL_DEPARTMENTS_QUERY}>
        {({ data, loading, error }) => {
          if (error) return <p>Error</p>;
          if (loading) return <p>Loading...</p>;
          return (
            <ul>
              {data.departments.map(department => (
                <li key={department.id}>{department.name}</li>
              ))}
            </ul>
          );
        }}
      </Query>
    );
  }
}

export default Departments;
