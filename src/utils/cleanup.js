import fs from 'fs';
export default {
  name: 'cleanup',
  generateBundle() {
    if( process.env.VITE_USER_NODE_ENV === 'production' )
      fs.unlinkSync('./dist/robots.txt');
  }
};
