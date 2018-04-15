'use strict'
import {s3Service} from './../service/S3Service'
import logger from './../core/logger'

const get = async (event, context, callback) => {

    try {
        const objectName = getParams(event, 'name')
        logger.info(`Handler: Received a request to get the "${objectName}" object.`)
        logger.debug(JSON.stringify(event))
        const s3Object = await s3Service.getFromS3(objectName)
        logger.info(`Handler: Returning ${objectName}`)
        logger.debug(JSON.stringify(s3Object))
        callback(null, {
            statusCode: 200,
            body: s3Object
        })
    } catch(error) {
        logger.error(`Handler: Error occurred: ${JSON.stringify(error)}`)
        callback(null, {
            statusCode: 500,
            body: JSON.stringify(error)
        })
    }
}

const put = async (event, context, callback) => {

    try {
        logger.info(`Handler: Adding the test object.`)
        if (!event.body) {
            callback(null, {
                statusCode: 500,
                body: JSON.stringify({error: 'Could not add object. Please provide the required name and data params.'})
            })
            return;
        }
        const body = JSON.parse(event.body)
        const resp = await s3Service.addToS3(getObjectNameFromEvent(body), getObjectDataFromEvent(body))
        logger.info(`Handler: Test object added.`)
        callback(null, {
            statusCode: 200,
            body: resp
        })
    } catch(error) {
        logger.error(`Handler: Error occurred: ${JSON.stringify(error)}`)
        callback(null, {
            statusCode: 500,
            body: JSON.stringify(error)
        })
    }
}

const getParams = (event, name) => {
    return event.pathParameters[name]
}

const getObjectNameFromEvent = (body) => {
    if (body && body.name) {
        return body.name
    } else {
        throw Error('Could not add object. The required "name" field has not been provided in the request.')
    }
}

const getObjectDataFromEvent = (body) => {
    if (body && body.data) {
        return body.data
    } else {
        throw Error('Could not add object. The required "data" field has not been provided in the request.')
    }
}

export {put, get}