import fs from 'fs';

const cleanup = ()=>({
  name: 'cleanup',
  generateBundle() {
    if( process.env.NODE_ENV === 'production' )
      fs.unlinkSync('dist/robots.txt');
  }
});

export default cleanup;
