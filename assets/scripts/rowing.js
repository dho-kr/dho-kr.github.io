;(function() {
  const $form = $('#rowing-form');
  const $nextRank = $('#next-rank');
  const $currentRank = $('#current-rank');
  const $proficiency = $('#proficiency');
  const $bonus = $('#bonus');
  // const $time = $('#time');
  const $currentRangValue = $('#current-rank-value');
  const $result = $('#result');
  const $removeStorage = $('#remove-storage');
  let resultTable = '';

  const rankTable = [
    [100, 400, 900, 1600, 2500, 3600, 4900, 6400, 8100, 10000, 12100, 14400, 16900, 19600],
    [80, 320, 720, 1280, 2000, 2880, 3920, 5120, 6480, 8000, 9680, 11520, 13520, 15680],
    [6, 5, 5, 4, 4, 3, 3, 3, 2, 2, 2, 2, 2, 2]
  ];

  const rowingDefaultData = {
    nextRank: '0',
    currentRank: '1',
    proficiency: '0',
    bonus: '0'
  };

  function init() {
    const rowingData = JSON.parse(localStorage.getItem('rowing')) || rowingDefaultData;

    $nextRank.value = rowingData.nextRank;
    $currentRank.value = rowingData.currentRank;
    $proficiency.value = rowingData.proficiency;
    $bonus.value = rowingData.bonus;
    // $time.value = rowingData.time || 0;
    $currentRangValue.innerHTML = $currentRank.value;

    setTable(rowingData);

    $currentRank.addEventListener('input', changeRange);
    $form.addEventListener('input', submitEvent);
    $removeStorage.addEventListener('click', removeStorage);
  }

  function submitEvent(e) {
    e.preventDefault();

    const _rowingData = {
      nextRank: $nextRank.value,
      currentRank: $currentRank.value,
      proficiency: $proficiency.value,
      bonus: $bonus.value
      // time: $time.value
    };

    localStorage.setItem('rowing', JSON.stringify(_rowingData));

    setTable(_rowingData);
  }

  function changeRange(e) {
    $currentRangValue.innerHTML = e.target.value;
  }

  function setTable($rowingData) {
    const proficiency = rankTable[$rowingData.nextRank].filter((item, index) => {
      return $rowingData.currentRank - 1 <= index;
    });

    proficiency[0] = proficiency[0] - Number($rowingData.proficiency);

    resultTable = `<table>
      <thead>
        <tr>
          <th>랭크</th>
          <th>남은 경험치</th>
          <th>다음 랭크까지 남은 시간</th>
          <th>전체 남은 경험치/시간</th>
        </tr>
      </thead>`;

    proficiency.forEach((item, index) => {
      const rank = $rowingData.currentRank++;
      const amount = proficiency.reduce((a, b) => a + b);

      resultTable += `<tr>
          <th>${ rank }</th>
          <td>${ item.toLocaleString() }점</td>
          <td>${ calcTime(item, rank) }</td>`;

      if (index === 0) {
        resultTable += `<td rowspan="${ proficiency.length }">
            ${ amount.toLocaleString() }점<br>
            ${ calcTime(proficiency, rank) }
          </td>`;
      }

      resultTable += `</tr>`;
    });
    resultTable += '</table>';

    $result.innerHTML = resultTable;
  }

  function calcTime(time, rank) {
    const rowingData = JSON.parse(localStorage.getItem('rowing')) || rowingDefaultData;

    if (typeof time === 'number') {
      const getTime = time / (rankTable[2][Number(rank - 1)] * ((Number(rowingData.bonus) + 100) / 100))
      return parseDate(getTime) +
          `(${ Math.ceil(getTime).toLocaleString() }분)`;
    } else {
      let getTime = 0
      time.forEach((item, i) => {
        const thisRank = Number(rank) + i;
        getTime += item / (rankTable[2][thisRank - 1] * ((Number(rowingData.bonus) + 100) / 100))
      });

      return parseDate(getTime) + `(${ Math.ceil(getTime).toLocaleString() }분)`;
    }
  }

  function removeStorage() {
    localStorage.clear();

    window.location.reload()
  }

  init();
})();
