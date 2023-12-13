# Churn It - Telecom Churn Data Visualization

## Application URL

Churn, It is hosted on [render.com](https://customer-churn-dl7t.onrender.com/), a fully managed cloud platform for hosting databases and web applications. Both the front-end and back-end applications are deployed here.

## Project Summary

Churn It is a web application that serves as a tool for exploring and visualizing telecom churn data. It allows users to perform CRUD operations and gain valuable insights. The application uses the 'Telecom Churn dataset' from Kaggle as its data source. Features include record search, addition, updating, deletion, and various data visualizations to provide a graphical understanding of the data.

## Project Objectives and Usefulness

### Primary Objectives

- Interact with telecom customer data through various functionalities like Search, CRUD operations.
- Provide features to visualize data and understand the existing dataset.

### Additional Features

- Explore churn data with different visualizations (heatmap, line chart, bar charts, etc.) to understand patterns and trends.
- Modify and filter the dataset for informed decision-making.
- Collaborate and share insights among stakeholders.
- Develop focused retention programs using customer demographics and subscription data.
- Identify enhancements in additional services to increase customer retention.
- Improve payment methods for easier service continuation.
- Predict customer churn based on internet service subscriptions.

## Technical Description

### Data

The Telco Customer Churn dataset from IBM, available on Kaggle, includes 21 columns and 7,042 records. It features customer demographics, account information, and churn status. Data is normalized into five tables: customer, plan details, payment info, subscription details, churn info.

### Preprocessing

Data preprocessing was performed using Pandas, with label encoding of categorical variables using sklearn's Label Encoder. The processed data is stored in a new CSV file.

### Tools

- **Model**: Developed using Node JS RESTful APIs and ‘pg’ module for Postgres database interaction.
- **View**: Created using HTML, CSS, JavaScript, React JS.
- **Controller**: Developed using Node JS's express module for routing requests.
- **Deployment Platform**: Render.com.
- **Tools Used**: Visual Studio Code, DBeaver, Postman.

## User Functionalities

- **Search**: With multiple filters.
- **Create New Record**: With unique ID for each record.
- **Search/Update/Delete a Record**: With user confirmation for deletions.
- **Data Visualization**: Using various interactive graphs, plots, and charts.

---

> **Note**: Improvement areas include adding user sign-up features for increased data security and enhancing data exploration for more interactive visualizations.
