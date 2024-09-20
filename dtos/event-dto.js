module.exports = class EventDto {
  country;
  eventTypes;
  creator;

  constructor(model) {
    this.country = model.country;
    this.eventTypes = model.eventTypes;
    this.creator = model.creator;
  }
};
