'use strict'
import {expect} from 'chai'
import {s3Dao} from '../../../src/dao/S3Dao'
import logger from '../../../src/core/logger'
import sinon from 'sinon'
import Q from 'q'

let sandbox
let s3TestGet
let s3TestPut

describe('S3Dao.js', () => {

    beforeEach(()=> {
        global.LOG_LEVEL = 'info'
        sandbox = sinon.sandbox.create()
        s3TestGet = sandbox.stub()
        s3TestPut = sandbox.stub()
        let s3Test = {
            getObject: s3TestGet,
            putObject: s3TestPut 
        }
        global.s3 = s3Test
    })

    afterEach(() => {
        sandbox.restore()
    })

    it('get', (done) => {
        const testData = {Body: new Buffer("Test S3 Object", "utf-8")}
        s3TestGet.callsFake((object, callback) => callback(null, testData))

        s3Dao.get('Test').then((response) => {
            expect(response.Body.toString()).to.eql(testData.Body.toString())
            done()
        })
    })
    it('get with error', (done) => {
        const testError = {error:'Something went wrong'}
        s3TestGet.callsFake((object, callback) => callback(testError, null))
        s3Dao.get('Test').catch((error) => {
            expect(error).to.eql(testError)
            done()
        })
    })

    it('put', (done) => {
        const testData = {Body: new Buffer("Test S3 Object", "utf-8")}
        s3TestPut.callsFake((object, callback) => callback(null, testData))

        s3Dao.put('Test', {name: 'Test Object'}).then((response) => {
            expect(response.Body.toString()).to.eql(testData.Body.toString())
            done()
        })
    })
    it('put with error', (done) => {
        const testError = {error:'Something went wrong'}
        s3TestPut.callsFake((object, callback) => callback(testError, null))
        s3Dao.put('Test', {name: 'Test Object'}).catch((error) => {
            expect(error).to.eql(testError)
            done()
        })
    })
})