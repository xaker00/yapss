const B2 = require("backblaze-b2");
const { v4: uuidv4 } = require('uuid');

const b2 = new B2({
  applicationKeyId: process.env.B2_ID,
  applicationKey: process.env.B2_KEY,
});

/**
 * @param {*} data data stream
 * @returns publicly accessible URL
 */
const uploadFile = async (fileName, dataStream, mime) => {
  const auth = await b2.authorize();
  const bucket = await b2.getBucket({ bucketName: process.env.BUCKET_NAME });
  const dataBuffer = await streamToBuffer(dataStream);
  const {
    data: { uploadUrl, authorizationToken },
  } = await b2.getUploadUrl({ bucketId: bucket.data.buckets[0].bucketId });
  const result = await b2.uploadFile({
    uploadUrl,
    uploadAuthToken: authorizationToken,
    fileName: uuidv4(),
    data: dataBuffer,
    mime
  });

  console.log(result);

  // const downloadUrl = `${auth.data.downloadUrl}/file/${bucket.data.buckets[0].bucketName}/${fileName}`;
  const downloadUrl = `${auth.data.downloadUrl}//b2api/v1/b2_download_file_by_id?fileId=${result.data.fileId}`;
  return downloadUrl;
};

const streamToBuffer = (stream) => {
  return new Promise((resolve, reject) => {
    let buffers = [];
    stream.on("error", reject);
    stream.on("data", (data) => buffers.push(data));
    stream.on("end", () => resolve(Buffer.concat(buffers)));
  });
};

module.exports = { uploadFile };
