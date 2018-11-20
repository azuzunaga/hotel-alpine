import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export const ALL_LOCATIONS_QUERY = gql`
  query ALL_LOCATIONS_QUERY {
    locations {
      id
      city
    }
  }
`;

class Locations extends Component {
  render() {
    return (
      <Query query={ALL_LOCATIONS_QUERY}>
        {({ data, loading, error }) => {
          if (error) return <p>Error</p>;
          if (loading) return <p>Loading...</p>;
          return (
            <ul>
              {data.locations.map(location => (
                <li key={location.id}>{location.city}</li>
              ))}
            </ul>
          );
        }}
      </Query>
    );
  }
}

export default Locations;
