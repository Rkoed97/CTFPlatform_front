import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-4 mt-5 bg-dark text-white">
      <div className="container text-center">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} CTF Platform. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;