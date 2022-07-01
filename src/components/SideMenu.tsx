import React from 'react';
import AuthorsList from './Authors/AuthorsList';
import YearsList from './PublishYears/YearsList';

const SideMenu: React.FC = () => {
  return (
    <div className="side-menu">
      <div>
        <h5>Authors</h5>
        <AuthorsList />
      </div>
      <div>
        <h5>Published Years</h5>
        <YearsList />
      </div>
    </div>
  );
};

export default SideMenu;
