module.exports = class EventDto {
  country;
  eventTypes;
  creator;
  title;
  description;

  constructor(model) {
    this.title = model.title;
    this.description = model.description;
    this.country = model.country;
    this.eventTypes = model.eventTypes;
    this.creator = model.creator;
  }
};
