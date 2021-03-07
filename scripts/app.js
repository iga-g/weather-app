const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const body = document.body;
const info = document.querySelector('.info');
const button = document.querySelector('button');
const copyright = document.querySelector('.copyright-container');

const updateUI = (data) => {

  const cityDets = data.cityDets;
  const weather = data.weather;
  const cityDate = new Date(weather.LocalObservationDateTime);
  // const dayFormat = dateFns.format(new Date(cityDate), 'ddd');
  // const dateFormat = dateFns.format(new Date(cityDate), 'DD MMMM YYYY');

  // destructure properties
  // const { cityDets, weather } = data;

  details.innerHTML = `
  <div>
  <h6>${cityDate.toDateString()}</h6>
  <h5><i class="fas fa-map-marker-alt"></i> ${cityDets.EnglishName}</h5>
  </div>
  <div>
    <span>${weather.Temperature.Metric.Value}</span>
    <span>&deg;C</span>
    <p>${weather.WeatherText}</p>
  </div>
  
  `;

  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);

  let timeSrc = null;
  if (weather.IsDayTime) {
    timeSrc = 'img/day.svg';
    body.className = 'day-bg';
  } else {
    timeSrc = 'img/night.svg';
    body.className = 'night-bg';
    icon.className = 'icon-night';
  }
  time.setAttribute('src', timeSrc);

  if (weather.IsDayTime && icon.classList) {
    icon.classList.remove('icon-night');
  }

  if (card.classList.contains('d-none')) {
    card.classList.remove('d-none');
    // card.classList.add('visible');
  }
  
};

const updateCity = async (city) => {

  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  return { cityDets, weather };

};


cityForm.addEventListener('submit', e => {
  e.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();

  updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
  
  localStorage.setItem('city', city);

});

if (localStorage.getItem('city')) {
  updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err))
}

button.addEventListener('click', () => {
  copyright.classList.toggle('slide-down');

  if (copyright.classList.contains('slide-down')) {
    button.innerHTML = `Copyright info &uarr;`;
  } else {
    button.innerHTML = `Copyright info &darr;`;
  }
});

