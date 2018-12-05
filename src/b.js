import dayjs from 'dayjs'

function getComponent() {
  var element = document.createElement('div');
  element.innerHTML = ['Hello', 'b', dayjs()].join(' ')
  return element;
}

document.body.appendChild(getComponent());
