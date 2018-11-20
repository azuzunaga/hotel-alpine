import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Link from 'next/link';
import gql from 'graphql-tag';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';

export const CREATE_LOCATION_MUTATION = gql`
  mutation CREATE_LOCATION_MUTATION($city: String!) {
    createLocation(
      data: {
        city: $city
      }
    ) {
      id
      city
    }
  }
`;

class CreateLocation extends Component {
  state = {
    city: '',
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <Mutation
        mutation={CREATE_LOCATION_MUTATION}
        variables={this.state}
      >
        {(createLocation, { loading, error }) => (
          <Form
            onSubmit={async e => {
              e.preventDefault();
              await createLocation();
            }}
          >
            {error && <ErrorMessage error={error} />}
            <fieldset aria-busy={loading}>
              <label htmlFor="city">
                  Location
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="Location"
                  required
                  value={this.state.city}
                  onChange={this.handleChange}
                />
              </label>
              <button type="submit">Submit</button>
              <Link
                href={{
                  pathname: '/employees',
                }}
              >
                <a>Cancel</a>
              </Link>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateLocation;
