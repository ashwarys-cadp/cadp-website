import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'your-project-id',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  studioHost: 'cadp',
  deployment: {
    appId: 'qr3ubdeqymt93g7udsfomdz6',
  },
});
