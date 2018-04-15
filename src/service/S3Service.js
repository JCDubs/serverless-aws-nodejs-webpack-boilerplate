'use strict'
import {s3Dao} from './../dao/S3Dao'
import logger from './../core/logger'

/** 
 * S3Service provides the ability to acceess and manipulate S3 Objects. 
*/
class S3Service {

    /**
     * Get the obnject associated with the provided key from S3.
     * @param {String} key The path of the object to get from the S3 bucket.
     * @return {String} s3Object The s3Object associated with the provided key. 
     * @throws Error If there is a problem retreiving the S3Object.
     */
    async getFromS3(key) {
        logger.info(`S3Service: Getting "${key}" S3 Object from s3Dao...`)
        const s3Response = await s3Dao.get(key)
        logger.info(JSON.stringify(s3Response))
        if (s3Response && s3Response.Body) {
            logger.info(`S3Service: Retruning "${key}" content.`)
            logger.debug(`S3Service: ${JSON.stringify(s3Response.Body.toString())}`)
            return s3Response.Body.toString()
        } else {
            logger.error(`S3Service: Error occurred getting ${key} from S3.`, s3Response)
            throw Error(`S3Service: Unable to retreive ${key} from S3.`, s3Response)
        }
    }

    /**
     * Add/Update an object to S3.
     * @param {String} key The key of the S3Object to create or update.
     * @param {Object} body The body to add.
     * @return {String} s3Response The s3Response. 
     * @throws Error If there is a problem adding the S3Object. 
     */
    async addToS3(key, body) {
        logger.info(`S3Service: Adding "${key}" to S3...`)
        logger.debug(`S3Service: ${JSON.stringify(body)}`)
        const s3Response = await s3Dao.put(key, body)
        logger.info(s3Response)
        if (s3Response && s3Response.ETag) {
            logger.info(`S3Service: "${key}" added`)
            logger.debug(`S3Service: ${s3Response}`)
            return s3Response
        } else {
            logger.error(`S3Service: Error occurred getting ${key} from S3.`, s3Response)
            throw Error(`S3Service: Unable to add ${key} to S3.`, s3Response)
        }
    }
}

const s3Service = new S3Service()
export {S3Service, s3Service}