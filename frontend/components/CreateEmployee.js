import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import ErrorMessage from './ErrorMessage';
import { CdnApiUrl, randUserApi } from '../config';
import Form from './styles/Form';
import Avatar from './styles/Avatar';
import { jobTitleGenerator, titleize, arrayPick } from '../lib/utils';
import { ALL_EMPLOYEES_QUERY } from './Employees';

export const ALL_LOCATIONS_QUERY = gql`
  query ALL_LOCATIONS_QUERY {
    locations {
      id
      city
    }
  }
`;

export const ALL_DEPARTMENTS_QUERY = gql`
  query ALL_DEPARTMENTS_QUERY {
    departments {
      id
      name
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation CREATE_USER_MUTATION(
    $name: String!
    $department: ID!
    $location: ID!
    $image: String!
    $title: String!
  ) {
    createUser(data: {
      name: $name
      department: { connect: { id: $department } }
      location: { connect: { id: $location } }
      image: $image
      title: $title
    }) {
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

const RandomUser = styled.button`
  width: auto;
  margin: 0 0 15px 0;
  height: 35px;
  background: ${props => props.theme.blue};
  color: white;
  font-size: 2rem;
  font-weight: 600;
  padding: 0.5rem 1.2rem;
  cursor: pointer;
`;

class CreateEmployee extends Component {
  state = {
    name: '',
    department: '',
    location: '',
    image: '/../static/avatar.png',
    title: '',
  }

  setLoading = bool => {
    const fieldset = document.querySelector('fieldset');
    fieldset.setAttribute('aria-busy', bool);
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  uploadFile = async e => {
    const { files } = e.target;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'hotelalpine');
    this.setLoading(true);
    const res = await fetch(
      CdnApiUrl,
      {
        method: 'POST',
        body: data,
      },
    );
    const file = await res.json();
    this.setState({
      image: file.secure_url,
    });
    this.setLoading(false);
  }

  randomUser = async client => {
    this.setLoading(true);
    const res = await fetch(randUserApi);
    const resJson = await res.json();
    const user = resJson.results[0];
    // Get data from the Apollo cache
    const { locations } = client.readQuery({
      query: ALL_LOCATIONS_QUERY,
    });
    const { departments } = client.readQuery({
      query: ALL_DEPARTMENTS_QUERY,
    });
    const newState = {
      name: `${titleize(user.name.first)} ${titleize(user.name.last)}`,
      image: user.picture.large,
      title: jobTitleGenerator(),
      location: arrayPick(locations).id,
      department: arrayPick(departments).id,
    };
    this.setState(newState);
    this.setLoading(false);
  }

  render() {
    return (
      <Mutation
        mutation={CREATE_USER_MUTATION}
        variables={this.state}
        update={(client, { data: { createUser } }) => {
          const { users } = client.readQuery({
            query: ALL_EMPLOYEES_QUERY,
            variables: { search: '' },
          });
          client.writeQuery({
            query: ALL_EMPLOYEES_QUERY,
            data: { users: users.concat([createUser]) },
            variables: { search: '' },
          });
        }}
      >
        {(createUser, { loading, error, client }) => (
          <div>
            <RandomUser
              onClick={() => this.randomUser(client)}
            >
              Generate Random Employee
            </RandomUser>
            <Form onSubmit={async e => {
              e.preventDefault();
              await createUser();
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
                  <Avatar src={this.state.image} alt="Upload Preview" />
                </label>
                <label htmlFor="name">
                  Full Name
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Full Name"
                    required
                    value={this.state.name}
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
                    value={this.state.title}
                    onChange={this.handleChange}
                  />
                </label>
                <Query query={ALL_DEPARTMENTS_QUERY}>
                  {({ loading: loading1, error: error1, data: data1 }) => {
                    if (loading1) return <p>Loading...</p>;
                    if (error1) return <p>Error</p>;
                    return (
                      <label htmlFor="department">
                        Department
                        <select
                          type="select"
                          id="department"
                          name="department"
                          required
                          value={this.state.department}
                          onChange={this.handleChange}
                        >
                          <option>---</option>
                          {data1.departments.map(department => (
                            <option key={department.id} value={department.id}>
                              {department.name}
                            </option>
                          ))}
                        </ select>
                      </label>
                    );
                  }}
                </Query>
                <Query query={ALL_LOCATIONS_QUERY}>
                  {({ loading: loading2, error: error2, data: data2 }) => {
                    if (loading2) return <p>Loading...</p>;
                    if (error2) return <p>Error</p>;
                    return (
                      <label htmlFor="location">
                        Location
                        <select
                          type="select"
                          id="location"
                          name="location"
                          required
                          value={this.state.location}
                          onChange={this.handleChange}
                        >
                          <option>---</option>
                          {data2.locations.map(location => (
                            <option key={location.id} value={location.id}>
                              {location.city}
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
  }
}

export default CreateEmployee;
