import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import Link from 'next/link';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';
import Avatar from './styles/Avatar';
import { ALL_LOCATIONS_QUERY, ALL_DEPARTMENTS_QUERY } from './CreateEmployee';
import { ALL_EMPLOYEES_QUERY } from './Employees';

const GET_SINGLE_EMPLOYEE = gql`
  query GET_SINGLE_EMPLOYEE($id: ID!) {
    user(where: { id: $id }) {
      id
      name
      title
      image
      department {
        name
      }
      location {
        city
      }
    }
  }
`;

const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION(
    $id: ID!
    $name: String
    $department: ID
    $location: ID
    $image: String
    $title: String
  ) {
    updateUser(
      where: { id: $id }
      data: {
        name: $name
        department: { connect: { id: $department } }
        location: { connect: { id: $location } }
        image: $image
        title: $title
      }
    ) {
      id
      name
      title
      image
      location {
        city
      }
      department {
        name
      }
    }
  }
`;

class UpdateEmployee extends Component {
  state = {}

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <Query
        query={GET_SINGLE_EMPLOYEE}
        variables={{ id: this.props.id }}
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          const {
            id, name, title, image, department, location,
          } = data.user;
          return (
            <Mutation
              mutation={UPDATE_USER_MUTATION}
              variables={{ ...this.state, id }}
              // update={(cache, { data: { updateUser } }) => {
              //   const { users } = cache.readQuery({ query: ALL_EMPLOYEES_QUERY });
              //   cache.writeQuery({
              //     query: ALL_EMPLOYEES_QUERY,
              //     data: { users: users.concat([updateUser]) },
              //   });
              // }}
            >
              {(updateUser, { loading, error, client }) => (
                <div>
                  <Form onSubmit={async e => {
                    e.preventDefault();
                    await updateUser();
                    Router.push({
                      pathname: '/employees',
                    });
                  }}>
                    {error && <ErrorMessage error={error} />}
                    <fieldset aria-busy={loading}>
                      <label htmlFor="file">
                        Image
                        <input
                          type="file"
                          id="file"
                          name="file"
                          placeholder="Upload an image"
                          onChange={this.uploadFile}
                        />
                        <Avatar src={image} alt="Upload Preview" />
                      </label>
                      <label htmlFor="name">
                        Full Name
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Name"
                          required
                          defaultValue={name}
                          onChange={this.handleChange}
                        />
                      </label>
                      <label htmlFor="title">
                        Title
                        <input
                          type="text"
                          id="title"
                          name="title"
                          placeholder="Title"
                          required
                          defaultValue={title}
                          onChange={this.handleChange}
                        />
                      </label>
                      <Query query={ALL_DEPARTMENTS_QUERY}>
                        {({ loading, error, data }) => {
                          if (loading) return <p>Loading...</p>;
                          if (error) return <p>Error</p>;
                          return (
                            <label htmlFor="department">
                              Department
                              <select
                                type="select"
                                id="department"
                                name="department"
                                required
                                defaultValue={department.id}
                                onChange={this.handleChange}
                              >
                                {data.departments.map(cDepartment => (
                                  <option key={cDepartment.id} value={cDepartment.id}>
                                    {cDepartment.name}
                                  </option>
                                ))}
                              </ select>
                            </label>
                          );
                        }}
                      </Query>
                      <Query query={ALL_LOCATIONS_QUERY}>
                        {({ loading, error, data }) => {
                          if (loading) return <p>Loading...</p>;
                          if (error) return <p>Error</p>;
                          return (
                            <label htmlFor="location">
                              Location
                              <select
                                type="select"
                                id="location"
                                name="location"
                                required
                                defaultValue={location.id}
                                onChange={this.handleChange}
                              >
                                {data.locations.map(cLocation => (
                                  <option key={cLocation.id} value={cLocation.id}>
                                    {cLocation.city}
                                  </option>
                                ))}
                              </ select>
                            </label>
                          );
                        }}
                      </Query>
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
                </div>
              )}
            </ Mutation>
          );
        }}
      </Query>
    );
  }
}

export default UpdateEmployee;
