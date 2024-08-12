// reading files

const fs = require('fs');
// fs = built in 'File System' object within Node
// Read file takes two Arguments, first a relative path to the file to read
// Second a callback async function (Fires after the initial requirement is met, file obtained)
// Async is non blocking, allows to continue until the initial condition is met
// Takes two Arguments, Error and Data, Error = Failed to retrieve file, Data = Contents of file if retreived
// fs.readFile('./docs/blog1.txt' , (err, data) => {
//     if (err)
//     {
//         console.log(err);
//     }
//     console.log(data.toString());
// });

// console.log("Last line");

//writing files

// Access the Write file function of File System
// Function takes 3 arguments
// First arg is the relative path to write to 
// If it exists, existing file will be updated
// If it does not exist, a new file will be created and updated
// Takes async callback function as before

// fs.writeFile('./docs/blog1.txt', 'Hello, World!', () =>
// {
//     console.log("File was written!");
// });

// fs.writeFile('./docs/blog2.txt', 'Hello, again', () =>
// {
//     console.log("File was written!");
// });

// directories

// Use File System object to access, create and delete directories
// mkdir = make directory, rmdir = remove directory
// mkdir takes 2 arguments, relative path to create the directory, and async function which takes an error argument
// If that directory already exists, the error will be thrown
// It is good to run an initial check if that directory already exists (synchronous, to prevent further actiion before check result)
// if (!fs.existsSync('./assets'))
// {
//     fs.mkdir('./assets', (err) => {
//         if (err)
//         {
//             console.log(err);
//         }
//         console.log("FOlder created!");
//     })

// }
// // rmdir also takes 2 arguments, relative path to remove the directory, and async function which takes an error argument
// // Here, if the directory already exists, the existing directory will be removed
// else
// {
//     fs.rmdir('./assets', (err) => {
//         if(err)
//         {
//             console.log(err);
//         }
//         console.log('Folder deleted');
//     })
// }


// deleting files

if (fs.existsSync('./docs/deleteme.txt'))
{
    fs.unlink('./docs/deleteme.txt', (err) => {
        if (err)
        {
            console.log(err);
        }
        console.log("File deleted!");
    })
}