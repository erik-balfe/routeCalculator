# appName

[//]: # (makeareadme.com)

## Description
todo

## Installation


### Development

The project uses yarn 3.2.4 as package manager, so [install](https://yarnpkg.com/getting-started/install) it first.

Install dependencies

``` shell
yarn install
```

copy .env.dist to .env

start dev server on default port 4000 

``` shell 
yarn start
```


## Project structure

    ├── ...
    ├── public                  # Static files that are copied to "build" dir
    │   ├── manifest.json       # Webmanifest file with images and app description
    ├── src                     # Source files that are compiled to "build" dir
    │   ├── Components          # Components that can be reused in different pages
    │   │   ├── PrivateRoute    # Component to wrap routes, that require authentication
    │   ├── Hooks               # Custom hooks
    │   ├── Pages               # Pages that are used in router (/src/Components/Router.tsx)
    │   ├── services            # api, etc
    │   ├── types               # Typescript types
    │   ├── Images              # Image files (png, jpg, etc) and components (svg)
    │   ├── fonts               # Fonts files
    │   ├── utils               # Some common functions 
    │   ├── App.tsx             # Main app component
    │   ├── constants.ts        # Constants, including ones got from .env
    │   ├── globalStyles.scss   # Main unscoped styles. Contains global styles and css variables.
    │   ├── global.d.ts         # Type definitions. Mainly for images and css files
    │   ├── index.tsx           # Main entry point
    │   ├── index.html          # html template that is used by webpack to build the app
    ├── .env.dist               # Environment variables template
    ├── .env                    # Local environment vars. Should be created manually from .env.dist
    ├── .gitignore
    │── .eslintrc               # Eslint config
    ├── webpack.config.ts       # Custom webpack config
    ├── .nvmrc                  # required node version
    ├── package.json
    └── yarn.lock
