(function () {
  var STORAGE_KEY = 'form_config';
  var ANSWERS_KEY = 'form_answers';
  var SUBMITTED_KEY = 'form_submitted';

  var DEFAULT_STEPS = [
    { id: 'quest1', type: 'question', questionId: 'q1' },
    { id: 'text1', type: 'text', textId: 't1' },
    { id: 'quest2', type: 'question', questionId: 'q2' },
    { id: 'text2', type: 'text', textId: 't2' },
    { id: 'final', type: 'final' },
    { id: 'result', type: 'result' }
  ];

  var DEFAULT_QUESTIONS = {
    q1: {
      id: 'q1',
      title: 'Qual dessas áreas mais desperta seu interesse?',
      kind: 'multiple',
      options: [
        { id: 'gestao', label: 'Gerenciar serviços e processos de TI', tags: ['gestao'] },
        { id: 'infra', label: 'Trabalhar com infraestrutura e nuvem', tags: ['infra'] },
        { id: 'seguranca', label: 'Proteger sistemas e dados', tags: ['seguranca'] },
        { id: 'projetos', label: 'Liderar projetos e equipes', tags: ['projetos'] }
      ]
    },
    q2: {
      id: 'q2',
      title: 'Como você prefere atuar no dia a dia?',
      kind: 'multiple',
      options: [
        { id: 'processos', label: 'Planejando e otimizando processos', tags: ['gestao', 'projetos'] },
        { id: 'sistemas', label: 'Configurando e mantendo sistemas', tags: ['infra', 'seguranca'] },
        { id: 'riscos', label: 'Analisando riscos e criando políticas', tags: ['seguranca', 'gestao'] },
        { id: 'entregas', label: 'Coordenando entregas e prazos', tags: ['projetos', 'infra'] }
      ]
    }
  };

  var DEFAULT_TEXTS = {
    t1: {
      id: 't1',
      title: 'Sobre nossos treinamentos',
      body: 'Oferecemos formações alinhadas às principais certificações e frameworks do mercado, com foco em prática e aplicação no dia a dia.\n\nNossos cursos são reconhecidos internacionalmente e preparam você para os desafios reais do mercado de TI.'
    },
    t2: {
      id: 't2',
      title: 'Próximo passo',
      body: 'Com base nas suas respostas, vamos sugerir o curso que mais combina com o seu perfil.\n\nNo próximo ponto do tour, preencha seus dados e descubra sua recomendação personalizada!'
    }
  };

  var DEFAULT_COURSES = [
    { id: 'c1', name: 'ITIL 4 Foundation', description: 'Gestão de serviços de TI — melhore processos, entregue valor.', tags: ['gestao'] },
    { id: 'c2', name: 'Segurança da Informação', description: 'Proteja dados e sistemas com fundamentos sólidos.', tags: ['seguranca'] },
    { id: 'c3', name: 'Microsoft Azure Fundamentals', description: 'Cloud e infraestrutura — domine a nuvem.', tags: ['infra'] },
    { id: 'c4', name: 'PRINCE2 / Metodologias Ágeis', description: 'Gerencie projetos com eficiência e agilidade.', tags: ['projetos'] }
  ];

  function getConfig() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        return {
          steps: parsed.steps || DEFAULT_STEPS,
          questions: parsed.questions || DEFAULT_QUESTIONS,
          texts: parsed.texts || DEFAULT_TEXTS,
          courses: parsed.courses || DEFAULT_COURSES
        };
      }
    } catch (e) {}
    return {
      steps: DEFAULT_STEPS,
      questions: DEFAULT_QUESTIONS,
      texts: DEFAULT_TEXTS,
      courses: DEFAULT_COURSES
    };
  }

  function getStepId() {
    var params = new URLSearchParams(window.location.search);
    return params.get('step') || 'quest1';
  }

  function getAnswers() {
    try {
      var raw = localStorage.getItem(ANSWERS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function setAnswer(questionId, value) {
    var answers = getAnswers();
    answers[questionId] = value;
    localStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
  }

  function getStepNumber(stepIndex) {
    return stepIndex + 1;
  }

  function escapeHtml(s) {
    if (!s) return '';
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function escapeAttr(s) {
    if (!s) return '';
    return String(s).replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function renderProgress(container, currentIndex, total) {
    if (!container) return;
    container.innerHTML = '';
    for (var i = 0; i < total; i++) {
      var span = document.createElement('span');
      if (i <= currentIndex) span.classList.add('active');
      container.appendChild(span);
    }
  }

  function showContinueTour(container, header, message) {
    if (header) {
      header.innerHTML = '<h1>✓ Feito!</h1>';
    }
    container.innerHTML =
      '<div class="continue-tour-card">' +
        '<div class="continue-icon">✓</div>' +
        '<h2>' + escapeHtml(message || 'Continue o tour!') + '</h2>' +
        '<p>Explore o tour virtual e encontre o próximo ponto de interação.</p>' +
        '<button type="button" class="btn btn-primary btn-close-form" onclick="window.close(); if(!window.closed) history.back();">Voltar ao Tour</button>' +
      '</div>';
  }

  function computeRecommendation() {
    var config = getConfig();
    var answers = getAnswers();
    var tagCount = {};

    Object.keys(answers).forEach(function (qId) {
      var v = answers[qId];
      if (typeof v === 'string' && v) {
        var q = config.questions[qId];
        if (q && q.options) {
          var opt = q.options.find(function (o) { return o.id === v; });
          if (opt && opt.tags) {
            opt.tags.forEach(function (t) {
              tagCount[t] = (tagCount[t] || 0) + 1;
            });
          }
        }
      }
    });

    var scored = config.courses.map(function (c) {
      var score = 0;
      (c.tags || []).forEach(function (t) {
        score += tagCount[t] || 0;
      });
      return { course: c, score: score };
    });
    scored.sort(function (a, b) { return b.score - a.score; });

    var top = scored[0];
    return { top: top, all: scored };
  }

  function renderQuestion(step, question, stepIndex, totalSteps) {
    var q = question;
    if (!q) return '';

    if (window.FORM_PROGRESS_CONTAINER) {
      renderProgress(window.FORM_PROGRESS_CONTAINER, stepIndex, totalSteps);
    }

    var prev = getAnswers()[q.id];

    var html = '<div class="card"><h2>' + escapeHtml(q.title) + '</h2>';

    if (q.kind === 'multiple' && q.options && q.options.length) {
      html += '<ul class="options-list">';
      q.options.forEach(function (opt) {
        var checked = prev === opt.id ? ' checked' : '';
        html += '<li class="option-item">';
        html += '<input type="radio" name="' + escapeAttr(q.id) + '" id="opt_' + escapeAttr(opt.id) + '" value="' + escapeAttr(opt.id) + '"' + checked + '>';
        html += '<label for="opt_' + escapeAttr(opt.id) + '">' + escapeHtml(opt.label) + '</label>';
        html += '</li>';
      });
      html += '</ul>';
    } else if (q.kind === 'text') {
      html += '<div class="form-row">';
      html += '<label for="text_' + escapeAttr(q.id) + '">Sua resposta</label>';
      html += '<textarea id="text_' + escapeAttr(q.id) + '" class="input-text" name="' + escapeAttr(q.id) + '" rows="4" placeholder="Digite aqui...">' + escapeHtml(prev || '') + '</textarea>';
      html += '</div>';
    }

    html += '<div class="form-nav">';
    html += '<button type="button" class="btn btn-primary btn-full" data-next>Confirmar resposta</button>';
    html += '</div></div>';
    return html;
  }

  function renderText(step, text, stepIndex, totalSteps) {
    var t = text;
    if (!t) return '';

    if (window.FORM_PROGRESS_CONTAINER) {
      renderProgress(window.FORM_PROGRESS_CONTAINER, stepIndex, totalSteps);
    }

    var body = t.body || '';
    var html = '<div class="card"><h2>' + escapeHtml(t.title) + '</h2>';
    html += '<div class="text-content">' + (body.indexOf('<') !== -1 ? body : '<p>' + escapeHtml(body).replace(/\n/g, '</p><p>') + '</p>') + '</div>';
    html += '<div class="form-nav">';
    html += '<button type="button" class="btn btn-primary btn-full" data-next>Entendido</button>';
    html += '</div></div>';
    return html;
  }

  function renderFinal(stepIndex, totalSteps) {
    if (window.FORM_PROGRESS_CONTAINER) {
      renderProgress(window.FORM_PROGRESS_CONTAINER, stepIndex, totalSteps);
    }

    var html = '<div class="card"><h2>Seus dados</h2>';
    html += '<p style="color:#555;margin-bottom:1.25rem;">Preencha para receber sua recomendação de curso.</p>';
    html += '<div class="form-row"><label>Nome</label><input type="text" id="final_name" class="input-text" placeholder="Seu nome completo"></div>';
    html += '<div class="form-row"><label>E-mail</label><input type="email" id="final_email" class="input-text" placeholder="seu@email.com"></div>';
    html += '<div class="form-nav">';
    html += '<button type="button" class="btn btn-primary btn-full" id="form_submit">Enviar</button>';
    html += '</div></div>';
    return html;
  }

  function renderResult() {
    var submitted = localStorage.getItem(SUBMITTED_KEY);
    if (!submitted) {
      return '<div class="card"><h2>Nenhum resultado ainda</h2>' +
        '<p style="color:#555;">Responda as perguntas e preencha o formulário nos pontos anteriores do tour para ver sua recomendação.</p>' +
        '<div class="form-nav"><button class="btn btn-primary btn-full" onclick="window.close(); if(!window.closed) history.back();">Voltar ao Tour</button></div></div>';
    }

    var result = computeRecommendation();
    var top = result.top;

    var html = '<div class="result-hero">';
    html += '<div class="result-icon">🎯</div>';
    html += '<h2>O curso ideal para você é:</h2>';
    html += '</div>';

    html += '<div class="result-main-card">';
    html += '<h3>' + escapeHtml(top.course.name) + '</h3>';
    html += '<p>' + escapeHtml(top.course.description) + '</p>';
    html += '</div>';

    var others = result.all.filter(function (x) { return x.course.id !== top.course.id && x.score > 0; });
    if (others.length > 0) {
      html += '<p class="also-consider">Você também pode gostar de:</p>';
      others.forEach(function (x) {
        html += '<div class="recommendation-card">';
        html += '<h3>' + escapeHtml(x.course.name) + '</h3>';
        html += '<p>' + escapeHtml(x.course.description) + '</p>';
        html += '</div>';
      });
    }

    html += '<div class="form-nav" style="margin-top:1.5rem">';
    html += '<button class="btn btn-primary btn-full" onclick="window.close(); if(!window.closed) history.back();">Voltar ao Tour</button>';
    html += '</div>';
    return html;
  }

  function saveToSupabase(name, email, answers, recommendation) {
    var client = window.FORM_SUPABASE && window.FORM_SUPABASE.client;
    if (!client) return Promise.resolve();
    return client.from('form_submissions').insert({
      name: name,
      email: email,
      answers: answers,
      recommendations: recommendation,
      created_at: new Date().toISOString()
    }).then(function () {}, function (err) { console.warn('Supabase insert error:', err); });
  }

  function init() {
    var config = getConfig();
    window.FORM_STEPS = config.steps;
    window.FORM_CONFIG = config;

    var stepId = getStepId();
    var stepIndex = window.FORM_STEPS.findIndex(function (s) { return s.id === stepId; });
    if (stepIndex === -1) stepIndex = 0;
    var step = window.FORM_STEPS[stepIndex];
    var totalSteps = window.FORM_STEPS.length;

    var container = document.getElementById('form_content');
    var header = document.getElementById('form_header');
    if (!container) return;

    if (step.type === 'question') {
      var q = config.questions[step.questionId];
      if (header) header.innerHTML = '<h1>Pergunta ' + getStepNumber(stepIndex) + '</h1><p>Selecione a opção que mais combina com você.</p>';
      container.innerHTML = renderQuestion(step, q, stepIndex, totalSteps);

      container.querySelector('[data-next]').addEventListener('click', function () {
        var q = config.questions[step.questionId];
        var value;
        if (q.kind === 'multiple') {
          var r = container.querySelector('input[name="' + step.questionId + '"]:checked');
          value = r ? r.value : null;
        } else {
          value = container.querySelector('#text_' + step.questionId).value.trim();
        }
        if (q.kind === 'multiple' && !value) return;
        setAnswer(step.questionId, value);
        showContinueTour(container, header, 'Resposta salva!');
      });

      var radios = container.querySelectorAll('input[type="radio"]');
      radios.forEach(function (r) {
        r.addEventListener('change', function () {
          setAnswer(step.questionId, this.value);
        });
      });
      var textArea = container.querySelector('textarea');
      if (textArea) {
        textArea.addEventListener('input', function () { setAnswer(step.questionId, this.value); });
      }

    } else if (step.type === 'text') {
      var t = config.texts[step.textId];
      if (header) header.innerHTML = '<h1>Informação</h1>';
      container.innerHTML = renderText(step, t, stepIndex, totalSteps);

      container.querySelector('[data-next]').addEventListener('click', function () {
        showContinueTour(container, header, 'Informação lida!');
      });

    } else if (step.type === 'final') {
      if (header) header.innerHTML = '<h1>Quase lá!</h1><p>Preencha seus dados para ver o resultado.</p>';
      container.innerHTML = renderFinal(stepIndex, totalSteps);

      document.getElementById('form_submit').addEventListener('click', function () {
        var name = (document.getElementById('final_name') && document.getElementById('final_name').value) || '';
        var email = (document.getElementById('final_email') && document.getElementById('final_email').value) || '';
        if (!name.trim() || !email.trim()) { alert('Preencha nome e e-mail.'); return; }

        var answers = getAnswers();
        var result = computeRecommendation();
        var topName = result.top ? result.top.course.name : '';

        localStorage.setItem(SUBMITTED_KEY, 'true');

        saveToSupabase(name, email, answers, topName).then(function () {
          window.location.href = (window.FORM_BASE_URL || 'index.html') + '?step=result';
        });
      });

    } else if (step.type === 'result') {
      if (header) header.innerHTML = '<h1>Seu Resultado</h1><p>Baseado nas suas respostas, este é o curso ideal para você.</p>';
      container.innerHTML = renderResult();

      if (window.FORM_PROGRESS_CONTAINER) {
        renderProgress(window.FORM_PROGRESS_CONTAINER, totalSteps - 1, totalSteps);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
