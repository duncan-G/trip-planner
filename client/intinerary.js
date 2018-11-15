export class Itinerary {
  constructor() {
    this.IDS = [
      ['hotels-choices', 'hotels-add', 'hotels-list'],
      ['restaurants-choices', 'restaurants-add', 'restaurants-list'],
      ['activities-choices', 'activities-add', 'activities-list']
    ];
    this.ELEMENTS = {
      hotels: this.getElements(this.IDS[0]),
      restaurants: this.getElements(this.IDS[1]),
      activities: this.getElements(this.IDS[2])
    };
    this.data = [];
    this.hotel = null;
    this.restaurants = [];
    this.activities = [];
  }

  getElements(ids) {
    const elements = {};
    [elements.choices, elements.addBtn, elements.preferences] = ids.map(id =>
      document.getElementById(id)
    );
    return elements;
  }

  addChoiceItem(select, choice) {
    const option = document.createElement('option');
    option.value = choice.id;
    option.innerHTML = choice.name;
    select.appendChild(option);
  }

  addChoiceItems(select, choices) {
    choices.forEach(choice => {
      this.addChoiceItem(select, choice);
    });
  }

  addChoices() {
    Object.keys(this.data).forEach(attraction => {
      this.addChoiceItems(
        this.ELEMENTS[attraction].choices,
        this.data[attraction]
      );
    });
  }

  getPreference(id) {
    return this.find(item => item.id === +id);
  }

  addIteneraryBtn(attraction) {
    const attrElements = this.ELEMENTS[attraction];
    attrElements.addBtn.addEventListener('click', () => {
      const li = document.createElement('li');
      const preferenceId = attrElements.choices.value;
      li.innerHTML = this.getPreference.call(
        this.data[attraction],
        preferenceId
      );
      attrElements.preferences.appendChild(li);
    });
  }

  addItinerarayBtns() {
    Object.keys(this.ELEMENTS).forEach(attraction => {
      this.addIteneraryBtn(attraction);
    });
  }

  initPage() {
    fetch('/api')
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.data = data;
        this.addChoices();
      })
      .catch(error => {
        console.log(error);
      });
    this.addItinerarayBtns();
  }
}
