import React from 'react';

export const Profiles = () => {
  return (
    <section className="container">
      <h1 className="txt-primary">Developer Profiles</h1>
      <p className="info">Browse developer profiles and make friends</p>
      <div className="profiles">
        <div className="profile">
          <img
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
            alt=""
          />
          <div>
            <h2 className="txt-primary">John Doe</h2>
            <p>Developer</p>
            <p>Google</p>
            <p>Melbourne</p>
          </div>
        </div>
        <div className="profile">
          <img
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
            alt=""
          />
          <div>
            <h2 className="txt-primary">John Doe</h2>
            <p>Developer</p>
            <p>Google</p>
            <p>Melbourne</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profiles;
