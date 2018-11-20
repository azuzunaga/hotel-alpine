import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Link from 'next/link';
import gql from 'graphql-tag';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';

export const CREATE_DEPARTMENT_MUTATION = gql`
  mutation CREATE_DEPARTMENT_MUTATION($name: String!) {
    createDepartment(
      data: {
        name: $name
      }
    ) {
      id
      name
    }
  }
`;

class CreateDepartment extends Component {
  state = {
    name: '',
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <Mutation
        mutation={CREATE_DEPARTMENT_MUTATION}
        variables={this.state}
      >
        {(createDepartment, { loading, error }) => (
          <Form
            onSubmit={async e => {
              e.preventDefault();
              await createDepartment();
            }}
          >
            {error && <ErrorMessage error={error} />}
            <fieldset aria-busy={loading}>
              <label htmlFor="name">
                  Department Name
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Department Name"
                  required
                  value={this.state.name}
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

export default CreateDepartment;
