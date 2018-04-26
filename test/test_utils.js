import { cartesian2polar, polar2cartesian, position2cartesian, cartesian2position, position2theta, theta2position } from './../src/components/Utils';
var chai = require('chai');
var assert = chai.assert;

describe('utils', function() {
    describe('#cartesian2polar', function() {
        it('should equal [0, -100] when theta=0', function() {
            let xy = polar2cartesian(100, 0);
            let x = Math.round(xy[0] * 10000) / 10000;
            let y = Math.round(xy[1] * 10000) / 10000;
            assert.equal(x, 0);
            assert.equal(y, -100);
        });

        it('should equal [0, 100] when theta=PI', function() {
            let xy = polar2cartesian(100, Math.PI);
            let x = Math.round(xy[0] * 10000) / 10000;
            let y = Math.round(xy[1] * 10000) / 10000;
            assert.equal(x, 0);
            assert.equal(y, 100);
        });

        it('should equal [100, 0] when theta=PI/2', function() {
            let xy = polar2cartesian(100, Math.PI/2.0);
            let x = Math.round(xy[0] * 10000) / 10000;
            let y = Math.round(xy[1] * 10000) / 10000;
            assert.equal(x, 100);
            assert.equal(y, 0);
        });

        it('should equal [-100, 0] when theta=PI', function() {
            let xy = polar2cartesian(100, -Math.PI/2.0);
            let x = Math.round(xy[0] * 10000) / 10000;
            let y = Math.round(xy[1] * 10000) / 10000;
            assert.equal(x, -100);
            assert.equal(y, 0);
        });

        it('should equal [100, 0] when theta=2.5PI', function() {
            let xy = polar2cartesian(100, Math.PI*2.5);
            let x = Math.round(xy[0] * 10000) / 10000;
            let y = Math.round(xy[1] * 10000) / 10000;
            assert.equal(x, 100);
            assert.equal(y, 0);
        });
    });

    describe('#position2cartesian', function() {
        it('should equal [0, -100] when pos=0', function() {
            let xy = position2cartesian(0, 1000, 100);
            let x = Math.round(xy[0] * 10000) / 10000;
            let y = Math.round(xy[1] * 10000) / 10000;
            assert.equal(x, 0);
            assert.equal(y, -100);
        });

        it('should equal [0, 100] when pos=500', function() {
            let xy = position2cartesian(500, 1000, 100);
            let x = Math.round(xy[0] * 10000) / 10000;
            let y = Math.round(xy[1] * 10000) / 10000;
            assert.equal(x, 0);
            assert.equal(y, 100);
        });

        it('should equal [100, 0] when pos=250', function() {
            let xy = position2cartesian(250, 1000, 100);
            let x = Math.round(xy[0] * 10000) / 10000;
            let y = Math.round(xy[1] * 10000) / 10000;
            assert.equal(x, 100);
            assert.equal(y, 0);
        });

        it('should equal [-100, 0] when pos=750', function() {
            let xy = position2cartesian(750, 1000, 100);
            let x = Math.round(xy[0] * 10000) / 10000;
            let y = Math.round(xy[1] * 10000) / 10000;
            assert.equal(x, -100);
            assert.equal(y, 0);
        });

        it('should equal [-100, 0] when pos=1250', function() {
            let xy = position2cartesian(1250, 1000, 100);
            let x = Math.round(xy[0] * 10000) / 10000;
            let y = Math.round(xy[1] * 10000) / 10000;
            assert.equal(x, 100);
            assert.equal(y, 0);
        });
    });
});