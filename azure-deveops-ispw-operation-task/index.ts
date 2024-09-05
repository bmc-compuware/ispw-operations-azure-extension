import tl = require("azure-pipelines-task-lib/task");
import path = require("path");

import { Client } from 'basic-ftp';
import * as fs from 'fs';

//const FtpClient = require('ftp-client');
//const fs = require('fs');

const config = {

  //hardcoding values temp
  host: '#####',
  port: '21',
  user: 'administrator',
  password: '######'

}

//

const uploadFile = async () => {
  // FTP server details
  const server = '#####'; // Replace with your FTP server
  const user = 'administrator'; // Replace with your FTP username
  const password = '#####'; // Replace with your FTP password
  const remoteDir = 'C:/inetpub/ftproot/ftp_data/from_win10/server-file.txt'; // Replace with your remote directory path
  const localFilePath = 'C:/ftp-data/server-file.txt'; // Local path to the file to upload
  // Create a local file to upload
  //fs.writeFileSync(localFilePath, 'Hello, FTP! This is a test file.');


  const operationType: string | undefined = tl.getInput("operationType", true);

  if (operationType) {
    if (operationType == "CES") {


    }
    else {

      const client = new Client();

      try {
            // Connect to the FTP server
            await client.access({
                host: server,
                user: user,
                password: password,
                secure: false // Set to true if you are using FTPS
            });

              console.log('Files in the current directory:');
              const currentDirFiles = await client.list();
              currentDirFiles.forEach(file => console.log(file.name));
              await client.cd('from_win10')
              //await client.cd('..');

              // List files in the parent directory
              console.log('\nFiles in the current directory:');
              const parentDirFiles = await client.list();
              parentDirFiles.forEach(file => console.log(file.name));

              const remoteDirPath =  await client.pwd() 
              const path1 = path.join(remoteDirPath, '/server-file.txt');
              //'/server-file.txt';
              console.log(remoteDirPath);
              console.log(path1);

              console.log("downloading file here now");
              await client.downloadTo(localFilePath, path1);
              //await client.list()
              // Change to the remote directory
              //await client.cd(remoteDir);

              // Upload the file
              //await client.uploadFrom(localFilePath, 'remote-file.txt'); // Remote file name

              //console.log('File uploaded successfully.');
      } catch (error) {
      console.error('Error:', error);
      } finally {
      client.close();
      // Clean up local file
      //fs.unlinkSync(localFilePath);
      }
    }
  }
    
}

  
// Execute the upload function
uploadFile();