const withOffline = require('next-offline');

module.exports = withOffline({
    target: 'serverless',
    typescript: {
        // https://github.com/Microsoft/TypeScript/issues/26728
        // Typescript still does not support navigator.clipboard.write
        ignoreBuildErrors: true,
    },
});
