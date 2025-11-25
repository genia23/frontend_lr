document.addEventListener('DOMContentLoaded', () => {
  const imgsCount = 6;
  const cols = 3;
  const rows = 3;
  let attempts = 3;
  let won = false;

  const name = prompt("Введіть ваше ім'я:") || "Гравець";
  document.getElementById('hello').textContent = `Привіт, ${name}!`;

  const attemptsSpan = document.getElementById('attemptsLeft');
  attemptsSpan.textContent = attempts;

  const generateBtn = document.getElementById('generate');
  const message = document.getElementById('message');

  const slotWrapper = document.querySelector('.slot-wrapper');
  const slots = [...document.querySelectorAll('.slot')];
  const cells = [...document.querySelectorAll('.cell')];

  function setCellImage(r, c, imgIndex) {
    const cell = cells.find(x => +x.dataset.row === r && +x.dataset.col === c);
    if (!cell) return;
    cell.classList.remove('win');
    cell.style.setProperty('--img', `url(img/${imgIndex}.png)`);
    cell.querySelector('::after'); 
    cell.style.background = 'transparent';
    cell.style.backgroundImage = `url('img/${imgIndex}.png')`;
    cell.style.backgroundSize = 'cover';
    cell.style.backgroundPosition = 'center';
  }

  function initialFill() {
    for (let c = 0; c < cols; c++) {
      const picks = pickDistinct(imgsCount, rows);
      for (let r = 0; r < rows; r++) setCellImage(r, c, picks[r]);
    }
  }

  function pickDistinct(max, n) {
    const pool = Array.from({length: max}, (_,i)=>i+1);
    for (let i = pool.length-1; i>0; i--){
      const j = Math.floor(Math.random()*(i+1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0,n);
  }

  initialFill();

  async function spinOnce() {
  if (attempts <= 0 || won) return;

  generateBtn.disabled = true;
  message.textContent = 'Крутиться...';
  attempts--;
  attemptsSpan.textContent = attempts;

  const finalCols = [];
  for (let c = 0; c < cols; c++) {
    finalCols[c] = pickDistinct(imgsCount, rows);
  }
  const stopTimes = [500, 700, 900];
  const intervals = [];

  for (let c = 0; c < cols; c++) {
    intervals[c] = setInterval(() => {
      for (let r = 0; r < rows; r++) {
        const img = 1 + Math.floor(Math.random() * imgsCount);
        setCellImage(r, c, img);
      }
    }, 80);
  }

  await Promise.all(stopTimes.map((t, c) =>
    new Promise(res => {
      setTimeout(() => {
        clearInterval(intervals[c]);  
        for (let r = 0; r < rows; r++) {
          setCellImage(r, c, finalCols[c][r]);
        }
        res();
      }, t);
    })
  ));

  const wins = checkWins(finalCols);

  if (wins.length) {
    highlightWins(wins);
    message.textContent = `Вітаю, ${name}! Ви виграли!`;
    won = true;
    generateBtn.disabled = true;
  } else {
    if (attempts <= 0) {
      message.textContent = `Гру завершено. Ви програли.`;
      generateBtn.disabled = true;
    } else {
      message.textContent = 'Спробуйте ще.';
      generateBtn.disabled = false;
    }
  }
}

  generateBtn.addEventListener('click', spinOnce);

  function checkWins(finalCols) {
    const results = [];
    const at = (r,c) => finalCols[c][r];

    for (let r=0;r<rows;r++){
      const a = at(r,0), b=at(r,1), c=at(r,2);
      if (a===b && b===c) results.push({type:'row', idx:r});
    }
    if (at(0,0)===at(1,1) && at(1,1)===at(2,2)) results.push({type:'diag', idx:1});
    if (at(0,2)===at(1,1) && at(1,1)===at(2,0)) results.push({type:'diag', idx:2});

    return results;
  }

  function highlightWins(wins) {
    document.querySelectorAll('.lines line').forEach(l => {
      l.classList.remove('line-active');
      l.style.strokeDashoffset = getComputedStyle(l).strokeDasharray || 800;
    });
    document.querySelectorAll('.cell').forEach(c => c.classList.remove('win'));

    wins.forEach(w => {
      if (w.type === 'row') {
        const r = w.idx;
        for (let c = 0; c < cols; c++) {
          const cell = cells.find(x => +x.dataset.row===r && +x.dataset.col===c);
          cell && cell.classList.add('win');
        }
        const line = document.getElementById(`line-row-${r}`);
        if (line) {
          line.classList.add('line-active');
          void line.getBoundingClientRect();
        }
      } else if (w.type==='diag') {
        const id = w.idx === 1 ? 'line-diag-1' : 'line-diag-2';
        if (w.idx===1) {
          [[0,0],[1,1],[2,2]].forEach(([r,c])=>{
            const cell = cells.find(x => +x.dataset.row===r && +x.dataset.col===c);
            cell && cell.classList.add('win');
          });
        } else {
          [[0,2],[1,1],[2,0]].forEach(([r,c])=>{
            const cell = cells.find(x => +x.dataset.row===r && +x.dataset.col===c);
            cell && cell.classList.add('win');
          });
        }
        const line = document.getElementById(id);
        if (line) {
          line.classList.add('line-active');
          void line.getBoundingClientRect();
        }
      }
    });
  }

});
