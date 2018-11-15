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
    this.hotels = [];
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

  preferenceExists(id) {
    return !!this.find(item => item.id === +id);
  }

  addPreference(attraction, srcElement, preference) {
    const li = document.createElement('li');
    li.className = 'preference';
    const span = document.createElement('span');
    span.innerHTML = preference.name;
    li.appendChild(span);
    this[attraction].push(preference);

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.innerHTML = 'x';
    removeBtn.onclick = () => {
      const i = this[attraction].indexOf(preference);
      this[attraction].splice(i, 1);
      li.remove();
      removeBtn.remove();
    };
    li.appendChild(removeBtn);

    srcElement.preferences.appendChild(li);
  }

  addIteneraryBtn(attraction) {
    const attrElements = this.ELEMENTS[attraction];
    attrElements.addBtn.addEventListener('click', () => {
      const preferenceId = attrElements.choices.value;
      if (!this.preferenceExists.call(this[attraction], preferenceId)) {
        let preference = this.getPreference.call(
          this.data[attraction],
          preferenceId
        );
        if (preference) {
          this.addPreference(attraction, attrElements, preference);
        } else {
          console.log('not found');
        }
      }
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
