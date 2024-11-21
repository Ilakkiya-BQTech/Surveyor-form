import React from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';

const Layout = ({ children }) => {
  return (
    <div>
      {/* <Header /> */}
      <Navbar />
      <div>{children}</div> {/* This renders the content of the page */}
    </div>
  );
};

export default Layout;

