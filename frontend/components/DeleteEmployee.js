import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ALL_EMPLOYEES_QUERY } from './Employees';

export const DELETE_EMPLOYEE_MUTATION = gql`
  mutation DELETE_EMPLOYEE_MUTATION($id: ID!) {
    deleteUser(where: { id: $id }) {
      id
    }
  }
`;

const DeleteButton = styled.a`
  border: 0;
  background-color: transparent;
  cursor: pointer;
`;

class DeleteEmployee extends Component {
  updateCache = (client, payload) => {
    const data = client.readQuery({
      query: ALL_EMPLOYEES_QUERY,
      variables: { search: '' },
    });
    data.users = data.users.filter(user => (
      user.id !== payload.data.deleteUser.id
    ));
    client.writeQuery({
      query: ALL_EMPLOYEES_QUERY,
      variables: { search: '' },
      data,
    });
  }

  render() {
    return (
      <Mutation
        mutation={DELETE_EMPLOYEE_MUTATION}
        variables={{ id: this.props.id }}
        update={this.updateCache}
      >
        {deleteUser => (
          <DeleteButton onClick={() => {
            deleteUser();
          }}
          >
            <FontAwesomeIcon icon={faTrash} size="lg" />
          </DeleteButton>
        )}
      </Mutation>
    );
  }
}

export default DeleteEmployee;
