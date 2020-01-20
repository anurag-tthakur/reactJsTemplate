

import Cookies from "universal-cookie";
import React from "react";
import aws from "aws-sdk";


const cookies = new Cookies();
const utility = {
    getSignedUrl,
    uploadFileToS3,
};
export default utility;


function uploadFileToS3(fileObject, fileName, mimeType, isPublic = false) {
    if (!fileObject || !fileName || !mimeType)
        return false;
    let config = {
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY
    }
    aws.config.update(config);
    const S3 = new aws.S3();
    const params = {
        Body: fileObject,
        Bucket: process.env.REACT_APP_AWS_S3_BUCKET_NAME,
        ContentType: mimeType,
        Key: fileName
    };
    if (isPublic)
        params.ACL = 'public-read';

    return new Promise(function (resolve, reject) {
        S3.upload(params, function (err, uploadData) {
            if (err)
                reject(err);
            resolve(uploadData);
        });
    });
}

function getSignedUrl(fileName) {
    if (!fileName)
        return "";
    aws.config.update({
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY
    });
    aws.config.region = process.env.REACT_APP_AWS_S3_BUCKET_REGION;
    const s3 = new aws.S3();
    const params = {
        Bucket: process.env.REACT_APP_AWS_S3_BUCKET_NAME,
        Key: fileName ? fileName : '',
        Expires: 600000,
        // Expires: 31556952000, //expire time in milliseconds(1 year)
    };

    let signedUrl = s3.getSignedUrl('getObject', params);
    return signedUrl;
}

