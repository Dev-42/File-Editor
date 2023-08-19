const fs = require('fs')
const readline = require('readline');

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Function to read a file
const readFile = (filename) => {
    fs.readFile(filename,'utf-8',(err,data) =>{
        if(err){
            console.error('Error reading this file : ', err.message)
        }
        else{
            console.log('\nFile Contents : \n' , data)
        }
        r1.prompt()
    })
}

// Function to delete a file
const deleteFile = (filename) => {
    fs.unlink(filename,(err) => {
        if(err){
            console.error("Error deleting the file : ",err.message)
        }
        else{
            console.log('File deleted successfully')
        }
        r1.prompt()
    })
}
const createFile = (filename,content) => {
    fs.writeFile(filename,content,'utf-8',(err) => {
        if(err){
            console.error('Error creating the file : ', err.message)
        }
        else{
            console.log('File created successfully')
        }
        r1.prompt()
    })
}
const renameFile = (oldFileName,newFileName) => {
    fs.rename(oldFileName,newFileName, (err) => {
        if(err){
            console.error('Error renaming the file : ', err.message)
        }
        else{
            console.log('File renamed successfully')
        }
        r1.prompt()
    })
}

// Prompt for user Input 
const promptCommand = () => {
   r1.question('Enter a command (read, delete, create,rename, exit):',(command)=>{
        if(command === 'exit'){
            console.log('Exiting...')
            r1.close()
        }
        else if(command === 'read'){
            r1.question('Enter the filename to read : ',(filename)=>{
                readFile(filename)
            })
        }
        else if(command === 'delete'){
            r1.question('Enter the filename to delete :',(filename) => {
                deleteFile(filename)
            })
        }
        else if(command === 'create'){
            r1.question('Enter the filename to create :', (filename) => {
                r1.question('Enter the content of the file :' , (content) => {
                    createFile(filename,content)
                })
            })
        }
        else if(command === 'rename'){
            r1.question('Enter the current filename : ', (oldFileName) => {
                r1.question('Enter the new filename : ',(newFileName) => {
                    renameFile(oldFileName,newFileName)
                })
            })
        }
        else{
            console.log('Invalid Command.Try again.')
            r1.prompt()
        }
   })
}
promptCommand()