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
    });

    it('should throw an error if "name" is shorten than 5 characters or longer than 20', () => {
        const cases = ['abs', 'Ab', 'Lorem Ipsum bu Lorem Lorem'];
        for(let name of cases) {
            const dep = new Department({ name })
            dep.validateSync(err => {
                expect(err.errors.name).to.exist;
            })
        }
    });
    it('should not throw an error if "name" is okay', () => {

        const cases = ['Management', 'Human Resources'];
        for(let name of cases) {
          const dep = new Department({ name });
      
          dep.validateSync(err => {
            expect(err).to.not.exist;
          });
      
        }
      
      });
  
  });
  
  after(() => {
    mongoose.models = {};
  });