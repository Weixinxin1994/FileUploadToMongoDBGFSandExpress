# FileUploadToMongoDBGFSandExpress
A MongoDB GridFS file server example written with Express and Multer


# Dependencies 

This example uploads files and stores them in MongoDB's GridFS. 

For this example to run, you need to install MongoDB on your System.

On OSX (with Homebrew)

    brew install mongodb 

On Ubuntu 

    apt-get install mongodb-org

For any other systems see:

https://www.mongodb.org/downloads

or 

http://docs.mongodb.org/manual/installation/


## Start MongoDb 

Create a dbpath first:

    mkdir ~/dbpath 

Start MongoDb
    
    mongodb --path ~/dbpath



# Initializiation 

Install all required NodeJS - dependencies 


    npm install 


# Start Server 

    node server.js 



# Test Upload

###Example Page to upload Files: 

    http://localhost:<port>/

### Get MetaData of uploaded Files 

    http://localhost:<port>/files/<filename> 

### Download File

    http://localhost:<port>/file/get/<filename>
