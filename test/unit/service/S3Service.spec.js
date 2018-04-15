'use strict'
import {expect} from 'chai'
import {s3Service} from '../../../src/service/S3Service'
import {s3Dao} from '../../../src/dao/S3Dao'
import logger from '../../../src/core/logger'
import sinon from 'sinon'
import Q from 'q'

let sandbox

describe('S3Serice.js', () => {

    beforeEach(()=> {
        global.LOG_LEVEL = 'warn'
        sandbox = sinon.sandbox.create()
    })

    afterEach(() => {
        sandbox.restore()
    })

    it('getFromS3', (done) => {
        const testData = {Body: new Buffer("Test S3 Object", "utf-8")}
        sandbox.stub(s3Dao, 'get').callsFake(() => {
            const defferred = Q.defer()
            defferred.resolve(testData)
            return defferred.promise
        })
        s3Service.getFromS3('test').then((response) => {
            expect(response).to.eql(testData.Body.toString())
            done()
        })        
    })
    it('getFromS3 with error', (done) => {
        sandbox.stub(s3Dao, 'get').callsFake(() => {
            const defferred = Q.defer()
            defferred.reject('ERROR')
            return defferred.promise
        })
        s3Service.getFromS3('test').catch((error)=> {
            expect(error).to.eql('ERROR')
            done()
        })        
    })
    it('getFromS3 without Body', (done) => {
        const testData = {}
        sandbox.stub(s3Dao, 'get').callsFake(() => {
            const defferred = Q.defer()
            defferred.resolve(testData)
            return defferred.promise
        })
        s3Service.getFromS3('test').catch((error)=> {
            expect(error.toString()).to.eql('Error: S3Service: Unable to retreive test from S3.');
            done()
        })        
    })
    it('getFromS3 without response', (done) => {
        sandbox.stub(s3Dao, 'get').callsFake(() => {
            const defferred = Q.defer()
            defferred.resolve(null)
            return defferred.promise
        })
        s3Service.getFromS3('test').catch((error)=> {
            expect(error.toString()).to.eql('Error: S3Service: Unable to retreive test from S3.');
            done()
        })        
    })

    it('addToS3', (done) => {
        const testData = {ETag: 'b26b82ea422beee06db4b3f911090194'}
        sandbox.stub(s3Dao, 'put').callsFake(() => {
            const defferred = Q.defer()
            defferred.resolve(testData)
            return defferred.promise
        })
        s3Service.addToS3('test', {name: 'Test S3 Object'}).then((response) => {
            expect(response).to.eql(testData)
            done()
        })        
    })
    it('addToS3 with error', (done) => {
        sandbox.stub(s3Dao, 'put').callsFake(() => {
            const defferred = Q.defer()
            defferred.reject('ERROR')
            return defferred.promise
        })
        s3Service.addToS3('test', {name: 'Test S3 Object'}).catch((error)=> {
            expect(error).to.eql('ERROR')
            done()
        })        
    })
    it('addToS3 without Etag', (done) => {
        const testData = {}
        sandbox.stub(s3Dao, 'put').callsFake(() => {
            const defferred = Q.defer()
            defferred.resolve(testData)
            return defferred.promise
        })
        s3Service.addToS3('test', {name: 'Test S3 Object'}).catch((error)=> {
            expect(error.toString()).to.eql('Error: S3Service: Unable to add test to S3.');
            done()
        })        
    })
    it('addToS3 without response', (done) => {
        sandbox.stub(s3Dao, 'put').callsFake(() => {
            const defferred = Q.defer()
            defferred.resolve(null)
            return defferred.promise
        })
        s3Service.addToS3('test', {name: 'Test S3 Object'}).catch((error)=> {
            expect(error.toString()).to.eql('Error: S3Service: Unable to add test to S3.');
            done()
        })        
    })
})