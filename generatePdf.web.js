//Place this code in your backend code files. Backend code is accessed via the side menu by clicking on the curly braces then packages and apps > Backend

import { Permissions, webMethod } from "wix-web-module";
import { mediaManager } from 'wix-media-backend';

const PDFDocument = require('pdfkit')

export const generateDownloadLink = webMethod(
  Permissions.Anyone, 
  async (fileName) => { 
    try {
      const buffer = await generatePdf()

      const file = await uploadFile(fileName,buffer)

      const link = await getDownload(file)

      return link
    } catch (error) {
      console.error("generate download error: ", error)
    }
  }
);

async function generatePdf(){
  try {
    const doc = new PDFDocument()
       const chunks = []

       // Collect data chunks
       doc.on('data', chunk => {
           chunks.push(chunk)
       });

       doc.text("Hello, world!", 100, 100);
       doc.end();

       // Convert chunks to a Buffer
       await new Promise(resolve => {
           doc.on('end', () => {
               resolve()
           });
       });

       const pdfBuffer = Buffer.concat(chunks)
      
       return pdfBuffer

  } catch (error) {
    console.error("An error has occured: ", error)
  }
}

async function uploadFile(fileName, buffer){
  try {
    let pdf = fileName + ".pdf"
    const importedFile = mediaManager.upload(
      "/UserUploads",
      buffer,
      pdf, {
        "mediaOptions": {
          "mimeType": "application/pdf",
          "mediaType": "document"
        }
      }
    )

    return importedFile
  } catch (error) {
    console.error("Upload file error: ", error)
  }
}

async function getDownload(file){
  try {
    const downloadLink = await mediaManager.getDownloadUrl(file.fileUrl)
    return downloadLink
  } catch (error) {
    console.error("Error in getDownload", error)
  }
}
