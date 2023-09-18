const Department = require('../department.modele.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');


describe('Department', () => {

    it('should throw an error if no "name" arg', async () => {
        const dep = new Department({})

        dep.validateSync(err => {
            expect(err.errors.name).to.exist
        })
  
    });
    it('should throw an error if "name" is not a string', () => {
        const cases = [{}, []];
        for(let name of cases) {
            const dep = new Department({ name })
            dep.validateSync(err => {
                expect(err.errors.name).to.exist;
            })
        }
    })
  
  });
  after(() => {
    mongoose.models = {};
  });