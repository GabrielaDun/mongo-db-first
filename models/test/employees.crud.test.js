const Employee = require('../employees.modele.js')
const Department = require('../department.modele.js')
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', async () => {
    const itDepartment = new Department({ name: 'Online Marketing' });
    await itDepartment.save();

    before(async () => {
      console.log('Connecting to database...');
        try {
            await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
          } catch(err) {
            console.error(err);
          }
    })
    describe('Reading data', () => {

        before(async () => {
          const itDepartment = new Department({ name: 'Online Marketing' });
          await itDepartment.save();

          const testEmpOne = new Employee({ firstName: 'Amy', lastName: 'Cooper', department: itDepartment._id });
          await testEmpOne.save();
      
          const testEmpTwo = new Employee({ firstName: 'John', lastName: 'Smith', department: itDepartment._id });
          await testEmpTwo.save();
        });
      
        it('should return all the data with "find" method', async () => {
          const employees = await Employee.find();
          const expectedLength = 2;
          expect(employees.length).to.be.equal(expectedLength);
        });
      
        it('should return a proper document by "firstName" with "findOne" method', async () => {
          const employee = await Employee.findOne({firstName: 'Amy'});
          const expectName = 'Amy'
          expect(employee.firstName).to.be.equal(expectName)
        })
        it('should return a proper document by "lastName" with "findOne" method', async () => {
            const employee = await Employee.findOne({lastName: 'Smith'});
            const expectName = 'Smith'
            expect(employee.lastName).to.be.equal(expectName)
        })
        it('should return a proper document by "department" with "findOne" method', async () => {
            const department = await Department.findOne({ name: 'Online Marketing' });
            const employee = await Employee.findOne({department: department._id});

            expect(employee.department.toString()).to.be.equal(department._id.toString());
        })
          
      
        after(async () => {
          console.log('Disconnecting from database...');
          await Employee.deleteMany();
        })
      });
      describe('Creating data', () => {
    
        it('should insert new document with "insertOne" method', async () => {
          const employee = new Employee({ firstName: 'Amy', lastName: 'Cooper'})
          await employee.save();
          expect(employee.isNew).to.be.false;
      
        });
        after(async () => {
          await Department.deleteMany();
        });
      
      });

})