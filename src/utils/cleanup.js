import fs from 'fs';

const cleanup = ()=>({
  name: 'cleanup',
  buildStart() {
    if( process.env.NODE_ENV === 'production' )
      fs.unlinkSync('public/robots.txt');
  }
});

export default cleanup;
