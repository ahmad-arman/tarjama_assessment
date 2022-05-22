module.exports = {
  content: [
    "./src/App.js",
    "./src/component/main/main.js",
    "./src/component/users/users.js",
    "./src/component/posts/posts.js",
    "./src/component/profile/profile.js",
    "./src/component/header/header.js",
    "./src/component/login/login.js",
    "./src/component/error/error.js",


    "./node_modules/flowbite/**/*.js"

  ],
  theme: {
    extend: {},
  },
  plugins:
   [ require('flowbite/plugin')],
}


