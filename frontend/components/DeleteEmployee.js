import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_EMPLOYEES_QUERY } from './Employees';

export const DELETE_EMPLOYEE_MUTATION = gql`
  mutation DELETE_EMPLOYEE_MUTATION($id: ID!) {
    deleteUser(where: { id: $id }) {
      id
    }
  }
`;

class DeleteEmployee extends Component {
  updateCache = (cache, payload) => {
    const data = cache.readQuery({ query: ALL_EMPLOYEES_QUERY });
    data.users = data.users.filter(user => (
      user.id !== payload.data.deleteUser.id
    ));
    cache.writeQuery({ query: ALL_EMPLOYEES_QUERY, data });
  }

  render() {
    return (
      <Mutation
        mutation={DELETE_EMPLOYEE_MUTATION}
        variables={{ id: this.props.id }}
        update={this.updateCache}
      >
        {deleteUser => (
          <button onClick={() => deleteUser()}>
            <img src="/../static/delete.svg" alt="Delete" />
          </button>
        )}
      </Mutation>
    );
  }
}

export default DeleteEmployee;
