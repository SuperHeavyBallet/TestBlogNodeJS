const fs = require('fs');

// Require File System Library
// File System > CreateReadStream is a function, Async? Which takes 2 arguments,
// First arg: Location to read the stream from
// 2nd arg: Optional Encoding format to change how the stream data is read

const readStream = fs.createReadStream('./docs/blog3.txt', { encoding: 'utf8' });

// File System > CreateWriteStream is a function which takes argument
// First Arg is the location to write the stream to

const writeStream = fs.createWriteStream('./docs/blog4.txt');

// .on is an event which listens for incoming streams of data
// Accepts 2 arguments,
// First the emitter 'string'
// Second the asyn function, which takes an arg of the incoming chunks of data being streamed

// readStream.on('data', (chunk) => {
//     console.log('-------New Chunk------')
//     console.log(chunk);
//     writeStream.write('\nNEW CHUNK\n');
//     writeStream.write(chunk);
// });

// piping

readStream.pipe(writeStream);