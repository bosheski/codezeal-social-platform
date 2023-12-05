/** @type {import('next').NextConfig} */
// Paths
const path = require('path');

const nextConfig = {
 sassOptions: {
  additionalData: `@import "${path.join(__dirname, 'src/styles/utils/mixins.scss')}";
  @import "${path.join(__dirname, 'src/styles/utils/variables.scss')}";
  `
 },
};

module.exports = nextConfig;