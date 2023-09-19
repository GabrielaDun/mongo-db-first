const Employees = require('../employees.modele.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');


describe('Employees', () => {

    it('should throw an error if ther is no "firstName", "lastName" or "department" arg', async () => {
        const dep = new Employees({})

        dep.validateSync(err => {
            expect(err.errors.firstName).to.exist
            expect(err.errors.lastName).to.exist
            expect(err.errors.department).to.exist
        })
  
    });
    it('should throw an error if "firstName" is not a string', () => {
        const cases = [{}, []];
        for(let firstName of cases) {
            const dep = new Employees({ firstName })
            dep.validateSync(err => {
                expect(err.errors.firstName).to.exist;
            })
        }
    });
    it('should throw an error if "department" is not a monggose scheme', () => {
        const cases = [{}, [], 'Technical Support'];
        for(let department of cases) {
            const dep = new Employees({ department })
            dep.validateSync(err => {
                expect(err.errors.department).to.exist;
            })
        }
    });


    it('should not throw an error if "firstName" is okay', () => {

        const cases = ['Pawel', 'Piotr'];
        for(let firstName of cases) {
          const dep = new Employees({ firstName });
      
          dep.validateSync(err => {
            expect(err).to.not.exist;
          });
      
        }
      
      });
      it('should not throw an error if "lastName" is okay', () => {

        const cases = ['Kowalski', 'Urban'];
        for(let lastName of cases) {
          const dep = new Employees({ lastName });
      
          dep.validateSync(err => {
            expect(err).to.not.exist;
          });
      
        }
      
      });
  
  });
  
  after(() => {
    mongoose.models = {};
  });