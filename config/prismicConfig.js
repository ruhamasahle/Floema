// node-fetch is used to make network requests to the Prismic Rest API. 
// In Node.js Prismic projects, you must provide a fetch method to the
// Prismic client.
// import fetch from 'node-fetch'
const prismic= require('@prismicio/client')
const repoName = 'https://floema-ruh.prismic.io/api/v2' // Fill in your repository name.
const accessToken = 'MC5ZcUZjN1JFQUFDTUFOdlZR' // If your repository is private, add an access token.

// The `routes` property is your Route Resolver. It defines how you will 
// structure URLs in your project. Update the types to match the Custom 
// Types in your project, and edit the paths to match the routing in your 
// project.

// const routes = [
//   {
//     type: 'page',
//     path: '/:uid',
//   },
// ]

export const client = prismic.createClient(repoName, { 
//   fetch, 
  accessToken,
//   routes,
})