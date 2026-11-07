// 情侣空间交互脚本

// 在一起天数计算
function updateCounter() {
  const startInput = document.getElementById('startDate');
  const startDate = new Date(startInput.value + 'T00:00:00');
  const now = new Date();

  const diff = now - startDate;

  if (diff < 0) {
    document.getElementById('days').textContent = 0;
    document.getElementById('hours').textContent = 0;
    document.getElementById('minutes').textContent = 0;
    document.getElementById('seconds').textContent = 0;
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = hours;
  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = seconds;
}

// 每秒更新
setInterval(updateCounter, 1000);
updateCounter();

// 修改开始日期时立即更新
document.getElementById('startDate').addEventListener('change', updateCounter);

// 点击爱你按钮 - 飘心效果
document.getElementById('loveBtn').addEventListener('click', function() {
  const container = document.getElementById('floatingHearts');
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      const heart = document.createElement('span');
      heart.textContent = ['💕', '💗', '💖', '❤️', '💘'][Math.floor(Math.random() * 5)];
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
      container.appendChild(heart);
      setTimeout(() => heart.remove(), 4000);
    }, i * 100);
  }
});

// 导航栏移动端切换
document.getElementById('navToggle').addEventListener('click', function() {
  document.querySelector('.nav-links').classList.toggle('show');
});

// 点击导航后关闭菜单
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('show');
  });
});

// 添加恋爱日记
function addNote() {
  const input = document.getElementById('noteInput');
  const text = input.value.trim();
  if (!text) return;

  const board = document.getElementById('notesBoard');
  const card = document.createElement('div');
  card.className = 'note-card';
  card.innerHTML = `
    <button class="delete-note" onclick="this.parentElement.remove()">×</button>
    <p>${text}</p>
    <small style="color:#999;font-size:0.8rem;">${new Date().toLocaleString('zh-CN')}</small>
  `;
  board.prepend(card);
  input.value = '';

  // 简单保存到 localStorage
  saveNotes();
}

function saveNotes() {
  const notes = [];
  document.querySelectorAll('.note-card p').forEach(p => {
    notes.push(p.textContent);
  });
  localStorage.setItem('coupleNotes', JSON.stringify(notes));
}

function loadNotes() {
  const saved = localStorage.getItem('coupleNotes');
  if (saved) {
    const notes = JSON.parse(saved);
    const board = document.getElementById('notesBoard');
    notes.forEach(text => {
      const card = document.createElement('div');
      card.className = 'note-card';
      card.innerHTML = `
        <button class="delete-note" onclick="this.parentElement.remove();saveNotes()">×</button>
        <p>${text}</p>
      `;
      board.appendChild(card);
    });
  }
}

// 添加心愿
function addWish() {
  const input = document.getElementById('wishInput');
  const text = input.value.trim();
  if (!text) return;

  const list = document.getElementById('wishList');
  const li = document.createElement('li');
  li.className = 'wish-item';
  li.innerHTML = `
    <input type="checkbox">
    <span contenteditable="true">${text}</span>
    <button class="delete-btn" onclick="this.parentElement.remove()">×</button>
  `;
  list.appendChild(li);
  input.value = '';
}

// 心情打卡
function selectMood(btn) {
  document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const mood = btn.dataset.mood;
  const history = document.getElementById('moodHistory');
  const time = new Date().toLocaleString('zh-CN');
  history.innerHTML = `<p>今天你的心情是：<strong>${mood}</strong></p><p style="font-size:0.9rem;color:#a05a6e;">${time}</p>`;

  localStorage.setItem('todayMood', JSON.stringify({ mood, time }));
}

// 加载今日心情
function loadMood() {
  const saved = localStorage.getItem('todayMood');
  if (saved) {
    const data = JSON.parse(saved);
    const history = document.getElementById('moodHistory');
    history.innerHTML = `<p>今天你的心情是：<strong>${data.mood}</strong></p><p style="font-size:0.9rem;color:#a05a6e;">${data.time}</p>`;
  }
}

// 情话切换
const quotes = [
  '“有你在的地方，就是家。”',
  '“我路过的所有时光，都是为了奔向你。”',
  '“愿我们的故事，永远没有完结篇。”',
  '“你是我最想留下的惊喜。”',
  '“和你在一起的每一天，都是情人节。”',
  '“世界很大，幸好有你。”',
  '“我想把所有的温柔都给你。”',
  '“你一笑，我的世界就亮了。”',
  '“余生很长，我想慢慢与你走过。”',
  '“遇见你，是我最美的意外。”'
];

function changeQuote() {
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById('quoteText').textContent = random;
}

// 相册模态框
function openModal(item) {
  const modal = document.getElementById('modal');
  const img = document.getElementById('modalImg');
  const caption = document.getElementById('modalCaption');
  img.textContent = item.querySelector('.placeholder-img').textContent;
  caption.textContent = item.querySelector('p').textContent;
  modal.classList.add('show');
}

function closeModal() {
  document.getElementById('modal').classList.remove('show');
}

// 初始化
window.addEventListener('DOMContentLoaded', () => {
  loadNotes();
  loadMood();
  changeQuote();
});
