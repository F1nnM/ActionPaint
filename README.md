# ActionPaint

Repository for an highschool project

# Deployment

There's a docker image available which serves both front and backend.

Pull from docker hub

```
docker pull f1nnm/actionpaint
```

Pull from github repository

```
docker pull ghcr.io/f1nnm/actionpaint
```

Server is exposed at port 4000.

A simple command to run it for tests:

```
docker run -p80:4000 -it f1nnm/actionpaint:latest
```

or

```
docker run -p80:4000 -it ghcr.io/f1nnm/actionpaint:latest
```

## Configuration
The docker container needs to be configured with environment variables for the contact form to work.

Following variables need to be set:
```bash
MAIL_HOST='smtp.example.com'
MAIL_PORT=465
# usually true for 465, false for other ports
MAIL_SECURE=true
MAIL_USER='user'
MAIL_PASS='pass'
# can also be a comma seperated list of email adresses
MAIL_RECEIVER='<the email to send the messages to>'
```

# Useful dev links

## Icons

[How to use](https://material-ui.com/api/svg-icon/)  
[List of all icons](https://material-ui.com/components/material-icons/)

## Bootstrap

[React components](https://react-bootstrap.github.io/components/alerts/)  
[React components for layout](https://react-bootstrap.github.io/layout/grid/)

[Special classes](https://getbootstrap.com/docs/4.1/utilities/spacing/)

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
