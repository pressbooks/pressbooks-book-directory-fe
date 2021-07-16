import fs from 'fs';
export default {
  name: 'cleanup',
  generateBundle() {
    if( process.env.NODE_ENV === 'production' )
      fs.unlinkSync('./dist/robots.txt');
  }
};
