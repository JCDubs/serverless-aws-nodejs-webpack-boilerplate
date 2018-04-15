'use strict'
import {expect} from 'chai'
import {get, put} from '../../../src/handler/handler'
import {s3Service} from '../../../src/service/S3Service'
import logger from '../../../src/core/logger'
import sinon from 'sinon'

let sandbox

describe('handler.js', () => {

    beforeEach(()=> {
        global.LOG_LEVEL = 'warn'
        sandbox = sinon.sandbox.create()
    })

    afterEach(() => {
        sandbox.restore()
    })

    it('Test get', (done) => {
        const testData = {name:'Test Object'}
        sandbox.stub(s3Service, 'getFromS3').returns(testData)
        const event = {pathParameters:{name:'Test'}}
        const context = {}
        const callback = (context, response) => {
            expect(response.body).to.eql(testData)
            done()
        }
        
        get(event, context, callback)
    })
    it('Test get with error', (done) => {
        const testData = {name:'Test Object'}
        sandbox.stub(s3Service, 'getFromS3').throws(new Error('Test Error'))
        const event = {pathParameters:{name:'Test'}}
        const context = {}
        const callback = (context, response) => {
            expect(response.statusCode).to.eql(500)
            done()
        }
        
        get(event, context, callback)
    })
    it('Test put', (done) => {
        const testData = {ETag:'hfgsjfjyrgdjjfjf'}
        sandbox.stub(s3Service, 'addToS3').returns(testData)
        const event = {body:'{"name":"Test", "data": {"valueOne": "test one"}}'}
        const context = {}
        const callback = (context, response) => {
            expect(response.body).to.eql(testData)
            done()
        }
        
        put(event, context, callback)
    })
    it('Test put with error', (done) => {
        const testData = {name:'Test Object'}
        sandbox.stub(s3Service, 'addToS3').throws(new Error('Test Error'))
        const event = {body:'{"name":"Test", "data": {"valueOne": "test one"}}'}
        const context = {}
        const callback = (context, response) => {
            expect(response.statusCode).to.eql(500)
            done()
        }
        
        put(event, context, callback)
    })
    it('Test put without body', (done) => {
        const testData = {name:'Test Object'}
        sandbox.stub(s3Service, 'addToS3').throws(new Error('Test Error'))
        const event = {}
        const context = {}
        const callback = (context, response) => {
            expect(response.statusCode).to.eql(500)
            done()
        }
        
        put(event, context, callback)
    })
    it('Test put without name', (done) => {
        const testData = {name:'Test Object'}
        sandbox.stub(s3Service, 'addToS3').throws(new Error('Test Error'))
        const event = {body:'{"data": {"valueOne": "test one"}}'}
        const context = {}
        const callback = (context, response) => {
            expect(response.statusCode).to.eql(500)
            done()
        }
        
        put(event, context, callback)
    })
    it('Test put without data', (done) => {
        const testData = {name:'Test Object'}
        sandbox.stub(s3Service, 'addToS3').throws(new Error('Test Error'))
        const event = {body:'{"name":"Test"}}'}
        const context = {}
        const callback = (context, response) => {
            expect(response.statusCode).to.eql(500)
            done()
        }
        
        put(event, context, callback)
    })
})