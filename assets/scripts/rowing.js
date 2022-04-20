;(function() {
  const $form = $('#rowing-form');
  const $nextLevel = $('#next-level');
  const $currentLevel = $('#current-level');
  const $proficiency = $('#proficiency');
  const $bonus = $('#bonus');
  const $time = $('#time');

  const levelTable = [
    [100, 400, 900, 1600, 2500, 3600, 4900, 6400, 8100, 10000, 12100, 14400, 16900, 19600],
    [80, 320, 720, 1280, 2000, 2880, 3920, 5120, 6480, 8000, 9680, 11520, 13520, 15680],
    [6, 5, 5, 4, 4, 3, 3, 3, 2, 2, 2, 2, 2, 2]
  ];

  const rowingData = JSON.parse(localStorage.getItem('rowing')) || {};

  $nextLevel.value = rowingData.nextLevel || 0;
  $currentLevel.value = rowingData.currentLevel || 0;
  $proficiency.value = rowingData.proficiency || 0;
  $bonus.value = rowingData.bonus || 0;
  $time.value = rowingData.time || 0;

  const submitEvent = (e) => {
    e.preventDefault();

    const _rowingData = {
      nextLevel: $nextLevel.value,
      currentLevel: $currentLevel.value,
      proficiency: $proficiency.value,
      bonus: $bonus.value,
      time: $time.value
    };

    // console.log()

    const _remain = {
      proficiency: (function() {
        let a = 0;
        levelTable[_rowingData.nextLevel].forEach((item, index) => {
          if (_rowingData.currentLevel - 1 <= index) {
            a += item;
          }
        });

        return a - Number(_rowingData.proficiency);
      })()
    };

    const b = (_remain.proficiency / levelTable[2][_rowingData.currentLevel - 1]);

    console.log('-----', _remain.proficiency, b / 60, moment(b / 60, 'HH').format('DD일 hh:mm:ss'));

    localStorage.setItem('rowing', JSON.stringify(_rowingData));
  };

  $form.addEventListener('submit', submitEvent);
})();
