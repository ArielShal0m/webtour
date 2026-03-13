(function () {
  var STORAGE_KEY = 'form_config';

  function getConfig() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return {
      steps: [
        { id: 'quest1', type: 'question', questionId: 'q1' },
        { id: 'text1', type: 'text', textId: 't1' },
        { id: 'quest2', type: 'question', questionId: 'q2' },
        { id: 'text2', type: 'text', textId: 't2' },
        { id: 'final', type: 'final' }
      ],
      questions: {
        q1: {
          id: 'q1',
          title: 'Qual área mais combina com você?',
          kind: 'multiple',
          options: [
            { id: 'gov', label: 'Gestão e Governança', tags: ['gestao', 'governanca'] },
            { id: 'infra', label: 'Infraestrutura e Cloud', tags: ['infra', 'microsoft'] },
            { id: 'seg', label: 'Segurança da Informação', tags: ['seguranca'] },
            { id: 'proj', label: 'Projetos e Metodologias', tags: ['itil', 'projetos'] }
          ]
        },
        q2: {
          id: 'q2',
          title: 'Conte em uma frase o que você busca no momento:',
          kind: 'text'
        }
      },
      texts: {
        t1: { id: 't1', title: 'Sobre nossos treinamentos', body: 'Oferecemos formações alinhadas às principais certificações e frameworks do mercado.' },
        t2: { id: 't2', title: 'Próximo passo', body: 'Com base nas suas respostas, na próxima tela vamos sugerir cursos que combinam com seu perfil.' }
      },
      courses: [
        { id: 'c1', name: 'ITIL 4 Foundation', description: 'Gestão de serviços de TI', tags: ['gestao', 'itil'] },
        { id: 'c2', name: 'Segurança da Informação', description: 'Fundamentos e práticas', tags: ['seguranca'] },
        { id: 'c3', name: 'Microsoft Azure Fundamentals', description: 'Cloud e infraestrutura', tags: ['infra', 'microsoft'] },
        { id: 'c4', name: 'PRINCE2 / Metodologias Ágeis', description: 'Gestão de projetos', tags: ['projetos', 'governanca'] }
      ]
    };
  }

  function saveConfig(config) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }

  function escapeHtml(s) {
    if (!s) return '';
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function renderQuestions(config) {
    var container = document.getElementById('admin_questions');
    if (!container) return;
    container.innerHTML = '';
    var qs = config.questions || {};
    Object.keys(qs).forEach(function (id) {
      var q = qs[id];
      var card = document.createElement('div');
      card.className = 'admin-card';
      var kindLabel = q.kind === 'multiple' ? 'Múltipla escolha' : 'Texto aberto';
      var opts = '';
      if (q.options && q.options.length) {
        opts = '<ul style="margin:0.5rem 0; padding-left:1.25rem;">';
        q.options.forEach(function (o) {
          opts += '<li>' + escapeHtml(o.label) + ' <small>(tags: ' + (o.tags || []).join(', ') + ')</small></li>';
        });
        opts += '</ul>';
      }
      card.innerHTML = '<h3>' + escapeHtml(q.title) + '</h3>' +
        '<div class="meta">ID: ' + escapeHtml(q.id) + ' · ' + kindLabel + '</div>' +
        opts +
        '<textarea class="input-text" rows="2" data-q-title="' + escapeHtml(q.id) + '" placeholder="Título da pergunta">' + escapeHtml(q.title) + '</textarea>' +
        '<div class="admin-actions">' +
        '<button type="button" class="btn btn-primary btn-save-q" data-id="' + escapeHtml(q.id) + '">Salvar</button>' +
        '</div>';
      container.appendChild(card);
    });
    container.querySelectorAll('.btn-save-q').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = this.getAttribute('data-id');
        var ta = container.querySelector('[data-q-title="' + id + '"]');
        if (ta && config.questions[id]) {
          config.questions[id].title = ta.value.trim() || config.questions[id].title;
          saveConfig(config);
          alert('Pergunta atualizada.');
        }
      });
    });
  }

  function renderTexts(config) {
    var container = document.getElementById('admin_texts');
    if (!container) return;
    container.innerHTML = '';
    var ts = config.texts || {};
    Object.keys(ts).forEach(function (id) {
      var t = ts[id];
      var card = document.createElement('div');
      card.className = 'admin-card';
      card.innerHTML = '<h3>' + escapeHtml(t.title) + '</h3>' +
        '<div class="meta">ID: ' + escapeHtml(t.id) + '</div>' +
        '<input type="text" class="input-text" data-t-title="' + escapeHtml(t.id) + '" value="' + escapeHtml(t.title) + '" placeholder="Título">' +
        '<textarea class="input-text" rows="4" data-t-body="' + escapeHtml(t.id) + '" placeholder="Conteúdo">' + escapeHtml(t.body || '') + '</textarea>' +
        '<div class="admin-actions">' +
        '<button type="button" class="btn btn-primary btn-save-t" data-id="' + escapeHtml(t.id) + '">Salvar</button>' +
        '</div>';
      container.appendChild(card);
    });
    container.querySelectorAll('.btn-save-t').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = this.getAttribute('data-id');
        var titleEl = container.querySelector('[data-t-title="' + id + '"]');
        var bodyEl = container.querySelector('[data-t-body="' + id + '"]');
        if (config.texts[id]) {
          if (titleEl) config.texts[id].title = titleEl.value.trim() || config.texts[id].title;
          if (bodyEl) config.texts[id].body = bodyEl.value;
          saveConfig(config);
          alert('Texto atualizado.');
        }
      });
    });
  }

  function renderCourses(config) {
    var container = document.getElementById('admin_courses');
    if (!container) return;
    container.innerHTML = '';
    (config.courses || []).forEach(function (c) {
      var card = document.createElement('div');
      card.className = 'admin-card';
      card.innerHTML = '<h3>' + escapeHtml(c.name) + '</h3>' +
        '<div class="meta">' + escapeHtml(c.description) + ' · tags: ' + (c.tags || []).join(', ') + '</div>';
      container.appendChild(card);
    });
  }

  function init() {
    var config = getConfig();
    renderQuestions(config);
    renderTexts(config);
    renderCourses(config);

    var btnAddQ = document.getElementById('admin_add_question');
    if (btnAddQ) {
      btnAddQ.addEventListener('click', function () {
        var id = 'q' + (Object.keys(config.questions).length + 1);
        config.questions[id] = { id: id, title: 'Nova pergunta', kind: 'multiple', options: [] };
        config.steps.splice(config.steps.length - 1, 0, { id: 'quest' + id, type: 'question', questionId: id });
        saveConfig(config);
        renderQuestions(config);
      });
    }
    var btnAddT = document.getElementById('admin_add_text');
    if (btnAddT) {
      btnAddT.addEventListener('click', function () {
        var id = 't' + (Object.keys(config.texts).length + 1);
        config.texts[id] = { id: id, title: 'Novo texto', body: '' };
        config.steps.splice(config.steps.length - 1, 0, { id: 'text' + id, type: 'text', textId: id });
        saveConfig(config);
        renderTexts(config);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
