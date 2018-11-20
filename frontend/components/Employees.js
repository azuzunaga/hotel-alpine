import React, { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import gql from 'graphql-tag';
import Employee, { UserEntry } from './Employee';

export const ALL_EMPLOYEES_QUERY = gql`
  query ALL_EMPLOYEES_QUERY($search: String) {
    users (orderBy: name_ASC, where: {
      OR: [
        {name_contains: $search},
        {department: {
          name_contains: $search
        }},
        {location: {
          city_contains: $search
        }}
      ]
    }) {
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

const Search = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  label {
    width: 100%;
  }
  input {
    width: 100%;
    font-size: 1.6rem;
    padding: 5px;
    border-radius: 5px;
  }
`;

const Spinner = styled.div`
  &.true {
    width: 18px;
    height: 18px;
    box-sizing: border-box;
    border: solid 2px transparent;
    border-top-color: ${props => props.theme.blue};
    border-left-color: ${props => props.theme.blue};
    border-radius: 50%;
    position: relative;
    left: -25px;
  
    -webkit-animation: nprogress-spinner 400ms linear infinite;
            animation: nprogress-spinner 400ms linear infinite;
  }
  width: 18px;
`;


class Employees extends Component {
  state = {
    search: '',
  }

  handleChange = (e, loading) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <Center>
        <Query query={ALL_EMPLOYEES_QUERY} variables={this.state}>
          {({ data, loading, error }) => {
            if (error) return <p>Error</p>;
            return (
              <UsersList>
                <Search>
                  <label htmlFor="search">
                    <input
                      type="text"
                      name="search"
                      id="search"
                      placeholder="Search all the things!"
                      value={this.state.search}
                      onChange={e => {
                        this.handleChange(e, loading);
                      }}
                    />
                  </label>
                  <Spinner id="spinner" className={loading} />
                </Search>
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
