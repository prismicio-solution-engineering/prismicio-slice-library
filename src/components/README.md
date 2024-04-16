# components

Welcome to the `components` directory! This is the next version of our component architecture, built to improve code readability, maintainability, and scalability.

This new structure features several key directories, each serving a specific purpose:

## UI

UI components are the fundamental styled elements of our application, used in a multitude of scenarios. Examples include buttons, input fields, and other base level components.

## Modules

Modules are more complex components that serve specific functions and are used across multiple sections in the application. They often consist of one or several UI components and may include more complex application logic.

## Sections

Sections are cohesive blocks of content representing distinct parts of individual pages. They often contain a combination of UI, Modules, and Layout components, and they may be reused across various pages or templates.

## Layout

Layout components define the architectural structure of our pages, including headers, footers, and navigation. They are reused across multiple pages or templates.

## Utility

Utility components encapsulate specific functions or logic. These are components that do not render any UI but provide necessary functionality across the application.

Please familiarize yourself with this new structure and refer to README.md in each directory for further explanation.

Once migration from the old structure (`./components`) to the new (`./components`) is complete, we will rename `components` to `components` for simplicity.
