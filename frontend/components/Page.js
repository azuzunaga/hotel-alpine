import React from 'react';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import Meta from './Meta';
import Header from './Header';

const theme = {
  blue: '#0A5EA0',
  darkblue: '#074170',
  black: '#393939',
  grey: '#666666',
  lightgrey: '#E1E1E1',
  offWhite: '#F5F5FA',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
};

const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
  height: 100vh;
`;

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

injectGlobal`
  @font-face {
    font-family: 'Arvo', serif;
    src: url('/static/Arvo-Regular.ttf') format('ttf');
    font-weight: normal;
    font-style: normal;
  }
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'Arvo', serif;
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }
  button {
    font-family: 'Arvo', serif;
  }
`;

class Page extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header />
          <Inner>{this.props.children}</Inner>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;
