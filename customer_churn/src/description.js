import React from 'react';

function Description() {
  return (
    <div className="description">
      <p>
        Our website is designed to provide an interactive experience with the Telco Churn Data. The goal of the project is to allow users to easily search and filter through the data, visualize it in various forms, and perform CRUD (Create, Read, Update, Delete) operations. The website has four main pages: Home, Search and Filter, Visualizations, and CRUD page.
      </p>
      <p>
        The Search and Filter page allows users to search the records available in the database with the unique ‘Customer id’, as well as filter the search results based on various features such as gender, partner, dependent, and phone service. The Visualizations page offers users the ability to visualize the data in different forms, such as bar graphs, pie charts, heat maps, and scatter plots. Finally, the CRUD page allows users to add new data, update existing data, or delete current data from the database.
      </p>
      <p>
        Our ultimate goal is to provide a user-friendly experience that allows individuals to easily interact with the Telco Churn Data and gain valuable insights from it.
      </p>
    </div>
  );
}

export default Description;
