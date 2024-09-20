module.exports = class UserDto {
  email;
  id;
  country;
  firstname;
  lastname;
  dateOfBirth;
  preferences;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.country = model.country;
    this.firstname = model.firstname;
    this.lastname = model.lastname;
    this.dateOfBirth = model.dateOfBirth;
    this.preferences = model.preferences;
  }
};
