/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║   MAIN.JS — JULIO CESAR DEMARCHI JUNIOR                     ║
 * ║   Portfólio — Engenheiro de Software Júnior                 ║
 * ║   Arquivo: js/main.js                                       ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * ORGANIZAÇÃO DO ARQUIVO:
 * 1. DOMContentLoaded — ponto de entrada
 * 2. Navegação — header sticky + menu mobile
 * 3. Filtros de projetos
 * 4. Validação do formulário
 * 5. Contador de caracteres
 * 6. Scroll Reveal — animações na rolagem
 * 7. Funções utilitárias
 */

'use strict';
/**
 * 'use strict'
 * O QUE É: Diretiva que ativa o modo estrito do JavaScript.
 * BENEFÍCIOS:
 *   - Erros silenciosos viram exceções (ex: variável sem declaração)
 *   - Proíbe sintaxes problemáticas
 *   - Melhorias de performance em alguns engines
 * ATIVAÇÃO: String literal no início do arquivo ou função.
 * MÓDULOS ES6: Já são strict por padrão (import/export).
 */


/* ════════════════════════════════════════════════
   1. PONTO DE ENTRADA — DOMContentLoaded
   ════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function() {
  /**
   * DOMContentLoaded
   * O QUE É: Evento disparado quando o HTML foi completamente parseado
   *   e o DOM está pronto — SEM esperar CSS, imagens e outros recursos.
   * DIFERENÇA de window.onload: load espera TUDO (CSS, imagens, fontes).
   * POR QUE USAR: Scripts podem manipular o DOM imediatamente.
   * ALTERNATIVA: <script defer> no HTML tem o mesmo efeito e é
   *   considerado mais moderno.
   *
   * addEventListener vs onclick:
   *   document.onclick = fn → SUBSTITUI handlers existentes.
   *   addEventListener → ACUMULA handlers — múltiplos podem coexistir.
   *   Sempre preferir addEventListener.
   */

  // Inicializa todos os módulos
  initNavegacao();
  initFiltrosProjetos();
  initFormulario();
  initScrollReveal();
  initContadorCaracteres();

  /**
   * Padrão de organização: cada funcionalidade em uma função.
   * BENEFÍCIOS:
   *   - Código modular e fácil de testar
   *   - Cada função tem responsabilidade única (SRP)
   *   - Fácil de encontrar e modificar cada feature
   */
});


/* ════════════════════════════════════════════════
   2. NAVEGAÇÃO
   ════════════════════════════════════════════════ */

function initNavegacao() {
  /**
   * function declaration vs function expression
   * declaration: function nome() {} → hoisted (pode usar antes de declarar)
   * expression:  const nome = function() {} → não hoisted
   * arrow:       const nome = () => {} → não hoisted, sem próprio 'this'
   */

  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const navLista = document.querySelector('.nav-lista');
  const navLinks = document.querySelectorAll('.nav-lista a');

  /**
   * querySelector vs getElementById vs getElementsByClassName
   *   querySelector('.classe')   → primeiro elemento que casa com CSS selector
   *   querySelectorAll('.classe')→ NodeList com todos que casam
   *   getElementById('id')       → mais rápido para IDs específicos
   *   getElementsByClassName()   → HTMLCollection (live — atualiza automático)
   *
   * NodeList vs HTMLCollection:
   *   NodeList → querySelectorAll retorna snapshot (estático)
   *   HTMLCollection → getElementsBy retorna live collection
   *   Ambos precisam ser convertidos com Array.from() para usar métodos de array
   */

  if (!header || !navToggle || !navLista) return;
  /**
   * Guard clauses (verificação defensiva)
   * O QUE É: Verificar se elementos existem antes de usar.
   * POR QUE: querySelector retorna null se o elemento não existe.
   *   Chamar .addEventListener em null gera TypeError.
   * PADRÃO: Retornar cedo se pré-condições não são atendidas.
   */

  // ── HEADER SCROLL ──
  // Adiciona classe quando rola a página
  function verificarScroll() {
    const scrolled = window.scrollY > 20;
    /**
     * window.scrollY
     * O QUE É: Pixels rolados verticalmente.
     * EQUIVALENTE: document.documentElement.scrollTop
     * scrollX: pixels rolados horizontalmente
     */
    header.classList.toggle('scrolled', scrolled);
    /**
     * classList.toggle(classe, condicao)
     * Adiciona a classe se condição é truthy, remove se falsy.
     * EQUIVALENTE: if(scrolled) add; else remove;
     * classList.add('classe')     → adiciona
     * classList.remove('classe')  → remove
     * classList.toggle('classe')  → alterna
     * classList.contains('classe')→ verifica existência
     */
  }

  window.addEventListener('scroll', verificarScroll, { passive: true });
  /**
   * { passive: true }
   * PERFORMANCE: Diz ao browser que o handler não chamará preventDefault().
   * O browser pode otimizar o scroll sem esperar o JS terminar.
   * IMPORTANTE para eventos de scroll/touch que precisam ser suaves.
   * Sem isso: scroll pode ficar travado esperando o JS.
   */
  verificarScroll(); // Executa no carregamento inicial


  // ── MENU MOBILE ──
  navToggle.addEventListener('click', function() {
    const estaAberto = navLista.classList.contains('aberta');

    navLista.classList.toggle('aberta');

    // Atualiza estado ARIA para acessibilidade
    navToggle.setAttribute('aria-expanded', !estaAberto);
    navToggle.setAttribute(
      'aria-label',
      estaAberto ? 'Abrir menu de navegação' : 'Fechar menu de navegação'
    );
    /**
     * setAttribute(nome, valor)
     * Atualiza atributos HTML dinamicamente.
     * EQUIVALENTE para aria-expanded: element.ariaExpanded = '...'
     * (propriedade ARIA refletida no DOM — mais moderno mas menor suporte)
     *
     * aria-expanded: Informa screen readers sobre o estado do menu.
     * Quando 'true': "Menu de navegação, botão, expandido"
     * Quando 'false': "Menu de navegação, botão, recolhido"
     */

    // Impede scroll do body quando menu está aberto
    document.body.style.overflow = estaAberto ? '' : 'hidden';
    /**
     * Bloqueio de scroll:
     * overflow: 'hidden' → impede rolagem (mobile menu open)
     * overflow: ''       → volta ao padrão (remove a propriedade inline)
     * ALTERNATIVA: Adicionar classe ao body que aplica overflow:hidden via CSS
     */
  });

  // Fecha menu ao clicar em um link
  navLinks.forEach(function(link) {
    /**
     * forEach em NodeList
     * NodeList suporta forEach nativo (browsers modernos).
     * Em browsers antigos: Array.from(navLinks).forEach(...)
     */
    link.addEventListener('click', function() {
      navLista.classList.remove('aberta');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Abrir menu de navegação');
      document.body.style.overflow = '';
    });
  });

  // Fecha menu ao clicar fora
  document.addEventListener('click', function(event) {
    /**
     * event (Event object)
     * Passado automaticamente para handlers de evento.
     * Contém informações sobre o evento:
     *   event.target      → elemento que disparou o evento
     *   event.currentTarget → elemento onde o listener está
     *   event.preventDefault() → cancela comportamento padrão
     *   event.stopPropagation() → para a propagação (bubbling)
     */
    const dentroDoMenu = navLista.contains(event.target);
    const noToggle = navToggle.contains(event.target);
    /**
     * contains(elemento)
     * Verifica se o elemento é descendente do nó.
     * Retorna true se event.target está dentro de navLista/navToggle.
     */

    if (!dentroDoMenu && !noToggle && navLista.classList.contains('aberta')) {
      navLista.classList.remove('aberta');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Abrir menu de navegação');
      document.body.style.overflow = '';
    }
  });

  // Fecha menu com tecla Escape (acessibilidade por teclado)
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && navLista.classList.contains('aberta')) {
      /**
       * event.key (KeyboardEvent)
       * String que identifica a tecla pressionada.
       * PREFERÍVEL a event.keyCode (obsoleto).
       * EXEMPLOS: 'Escape', 'Enter', 'Tab', 'ArrowUp', ' ' (espaço)
       * WCAG 2.1.1: Toda funcionalidade deve ser acessível por teclado.
       * Fechar modal/menu com Escape é padrão esperado (WCAG pattern).
       */
      navLista.classList.remove('aberta');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Abrir menu de navegação');
      document.body.style.overflow = '';
      navToggle.focus();
      /**
       * .focus()
       * Retorna o foco ao botão que abriu o menu.
       * ACESSIBILIDADE CRÍTICA: Ao fechar o menu, o foco deve retornar
       * ao elemento que o abriu — não ficar "perdido" no DOM.
       * WCAG 2.4.3: Ordem de foco deve ser lógica e preservada.
       */
    }
  });


  // ── SCROLL SUAVE PARA LINKS ÂNCORA ──
  // Atualiza o link ativo baseado na seção visível
  const sections = document.querySelectorAll('section[id]');

  const observerNav = new IntersectionObserver(
    /**
     * IntersectionObserver API
     * O QUE É: Observa quando elementos entram/saem da viewport.
     * PERFORMANCE: Mais eficiente que calcular posições no evento scroll.
     *   Usa o compositor do browser (não bloqueia o main thread).
     * USOS: Lazy loading, animações de entrada, navegação ativa, ads.
     */
    function(entries) {
      /**
       * entries: Array de IntersectionObserverEntry
       * Cada entry representa um elemento observado e seu estado.
       */
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          /**
           * isIntersecting: boolean
           * true quando o elemento está visível na viewport
           * (ou dentro do rootMargin definido).
           */
          const id = entry.target.id;
          const linkAtivo = document.querySelector(`.nav-lista a[href="#${id}"]`);

          // Remove ativo de todos os links
          navLinks.forEach(function(link) {
            link.classList.remove('nav-ativo');
            link.removeAttribute('aria-current');
          });

          // Adiciona ativo no link correspondente
          if (linkAtivo) {
            linkAtivo.classList.add('nav-ativo');
            linkAtivo.setAttribute('aria-current', 'page');
            /**
             * aria-current="page"
             * Indica que este link representa a página/seção atual.
             * VALORES: 'page', 'step', 'location', 'date', 'time', true/false
             * Screen reader anuncia: "Sobre, link, atual"
             * WCAG 2.4.4: Links devem indicar seu propósito e estado.
             */
          }
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: '-70px 0px 0px 0px'
      /**
       * threshold: 0.3
       * Quando 30% do elemento está visível → dispara o callback.
       * VALORES: 0 (qualquer pixel), 0.5 (50%), 1 (completamente visível)
       * Array de valores para múltiplos disparos: [0, 0.25, 0.5, 0.75, 1]
       *
       * rootMargin: '-70px 0px 0px 0px'
       * Margem para cálculo de intersecção (como CSS margin).
       * -70px no topo → compensa a altura do header sticky.
       * A seção é considerada "visível" quando está 70px abaixo do header.
       */
    }
  );

  sections.forEach(function(section) {
    observerNav.observe(section);
    /**
     * .observe(elemento)
     * Começa a observar o elemento.
     * .unobserve(elemento) → para de observar (importante para performance)
     * .disconnect() → para de observar todos os elementos
     */
  });
}


/* ════════════════════════════════════════════════
   3. FILTROS DE PROJETOS
   ════════════════════════════════════════════════ */

function initFiltrosProjetos() {
  const filtros = document.querySelectorAll('.filtro-btn');
  const cards = document.querySelectorAll('.projeto-card');

  if (!filtros.length || !cards.length) return;
  /**
   * .length === 0 vs !.length
   * NodeList vazia tem length 0 → falsy.
   * !filtros.length → true quando vazia → retorna.
   */

  filtros.forEach(function(filtro) {
    filtro.addEventListener('click', function() {
      const categoria = this.dataset.filtro;
      /**
       * this dentro de function()
       * Referencia o elemento que disparou o evento (o botão clicado).
       * ATENÇÃO: Arrow functions NÃO têm próprio 'this'.
       *   const fn = () => {} → this = contexto exterior
       *   function fn() {} → this = contexto de chamada
       *
       * dataset.filtro
       * Acessa atributo data-filtro do HTML.
       * HTML: data-filtro="html-css"
       * JS:   element.dataset.filtro → "html-css"
       * Converte kebab-case para camelCase: data-minha-prop → dataset.minhaProp
       */

      // Atualiza estado visual e ARIA dos botões de filtro
      filtros.forEach(function(btn) {
        btn.classList.remove('filtro-ativo');
        btn.setAttribute('aria-pressed', 'false');
      });

      this.classList.add('filtro-ativo');
      this.setAttribute('aria-pressed', 'true');

      // Filtra os cards
      let contadorVisivel = 0;

      cards.forEach(function(card) {
        const cardCategoria = card.dataset.categoria;
        const deveExibir = categoria === 'todos' || cardCategoria === categoria;
        /**
         * Operador || (OR lógico)
         * Retorna o primeiro valor truthy, ou o último valor.
         * true || qualquer → true (short-circuit: não avalia o segundo)
         */

        if (deveExibir) {
          card.classList.remove('oculto');
          card.removeAttribute('hidden');
          contadorVisivel++;
          /**
           * removeAttribute('hidden') vs classList.remove('oculto')
           * hidden HTML attribute: acessibilidade — remove completamente do DOM.
           * Classe CSS .oculto com display:none: apenas visual.
           * Usando ambos para garantir que está visível visual E semanticamente.
           */
        } else {
          card.classList.add('oculto');
          card.setAttribute('hidden', '');
          /**
           * setAttribute('hidden', '')
           * Atributo booleano HTML — a presença define o valor, não o conteúdo.
           * <element hidden> → oculto
           * Acessível: screen readers ignoram elementos com hidden.
           */
        }
      });

      // Anuncia para screen readers quantos projetos são visíveis
      anunciarParaScreenReader(
        `Filtrando projetos: ${contadorVisivel} projeto${contadorVisivel !== 1 ? 's' : ''} encontrado${contadorVisivel !== 1 ? 's' : ''}`
      );
      /**
       * Template literals (template strings)
       * Sintaxe: `string ${expressão} string`
       * Permite interpolação de variáveis e expressões diretamente.
       * Suporta múltiplas linhas.
       *
       * Operador ternário: condição ? valorTrue : valorFalse
       * Aqui: se não é 1 projeto → 's', senão → '' (pluralização)
       */
    });
  });
}


/* ════════════════════════════════════════════════
   4. VALIDAÇÃO DO FORMULÁRIO
   ════════════════════════════════════════════════ */

function initFormulario() {
  const form = document.getElementById('form-contato');

  if (!form) return;

  const campos = {
    nome:     { elemento: document.getElementById('campo-nome'),     erroId: 'nome-erro' },
    email:    { elemento: document.getElementById('campo-email'),    erroId: 'email-erro' },
    mensagem: { elemento: document.getElementById('campo-mensagem'), erroId: 'mensagem-erro' },
    termos:   { elemento: document.getElementById('aceitar-termos'), erroId: 'termos-erro' }
  };
  /**
   * Object literal
   * Estrutura de dados chave:valor.
   * Organiza os campos e seus erros associados.
   * Facilita iterar e evita repetição de código.
   */


  // ── VALIDAÇÃO EM TEMPO REAL (blur) ──
  Object.values(campos).forEach(function(campo) {
    /**
     * Object.values(obj)
     * Retorna array com os VALORES das propriedades do objeto.
     * Object.keys(obj)   → array das CHAVES
     * Object.entries(obj) → array de [chave, valor]
     */
    if (!campo.elemento) return;

    campo.elemento.addEventListener('blur', function() {
      /**
       * Evento 'blur'
       * Disparado quando o elemento PERDE o foco.
       * PREFERÍVEL a 'input' para validação: usuário termina de digitar.
       * DIFERENÇA: 'input' dispara a cada caractere digitado.
       *   'blur' → ao sair do campo (melhor UX)
       *   'change' → ao sair COM mudança de valor
       */
      validarCampo(campo.elemento, campo.erroId);
    });

    // Limpa erro ao começar a digitar novamente
    campo.elemento.addEventListener('input', function() {
      if (this.value.trim()) {
        ocultarErro(campo.erroId);
        this.removeAttribute('aria-invalid');
      }
    });
  });


  // ── SUBMISSÃO DO FORMULÁRIO ──
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    /**
     * event.preventDefault()
     * Cancela o comportamento padrão do evento.
     * Para formulários: impede o reload/navegação da página.
     * Para links: impede a navegação.
     * Para keydown: impede a ação da tecla.
     */

    let formularioValido = true;

    // Valida todos os campos
    Object.values(campos).forEach(function(campo) {
      if (!campo.elemento) return;
      const campoValido = validarCampo(campo.elemento, campo.erroId);
      if (!campoValido) formularioValido = false;
    });

    if (!formularioValido) {
      // Foca no primeiro campo inválido
      const primeiroInvalido = form.querySelector('[aria-invalid="true"]');
      if (primeiroInvalido) primeiroInvalido.focus();
      /**
       * Gestão de foco em erros
       * WCAG 3.3.1: Erros identificados e descritos ao usuário.
       * WCAG 3.3.3: Sugestão de correção de erro.
       * Mover o foco para o primeiro campo inválido garante que
       * o usuário de teclado/screen reader saiba onde está o problema.
       */
      return;
    }

    // Simula envio (em produção: fetch() para API)
    enviarFormulario(form);
  });
}


/**
 * Valida um campo específico
 * @param {HTMLElement} elemento - O campo a ser validado
 * @param {string} erroId - ID do elemento de mensagem de erro
 * @returns {boolean} - true se válido, false se inválido
 */
function validarCampo(elemento, erroId) {
  /**
   * JSDoc
   * Documentação de função em formato padrão.
   * @param: parâmetros e seus tipos
   * @returns: valor de retorno
   * Ferramentas como VS Code usam JSDoc para IntelliSense.
   */

  const valor = elemento.value.trim();
  let valido = true;
  let mensagemErro = '';

  // Validação por tipo de campo
  if (elemento.type === 'checkbox') {
    valido = elemento.checked;
    /**
     * elemento.checked (boolean)
     * Para checkboxes e radio buttons — indica se está marcado.
     * Diferente de .value (valor do atributo value, sempre string).
     */
    mensagemErro = 'Você precisa aceitar os termos para enviar a mensagem.';
  } else if (elemento.required && !valor) {
    valido = false;
    mensagemErro = 'Este campo é obrigatório.';
  } else if (elemento.type === 'email' && valor) {
    // Validação de email com Regex
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    /**
     * Expressão Regular (Regex)
     * /padrão/flags
     * ^ → início da string
     * [^\s@]+ → um ou mais caracteres que NÃO sejam espaço ou @
     * @ → literalmente o @
     * [^\s@]+ → domínio
     * \. → ponto literal (\ escapa o . que significa "qualquer char")
     * [^\s@]+ → extensão (.com, .br)
     * $ → fim da string
     * NOTA: Esta regex valida formato básico. Validação real de email
     * deve ser feita no backend (email pode existir mas ser inválido).
     */
    valido = regexEmail.test(valor);
    /**
     * regex.test(string)
     * Retorna true/false se a string casa com o padrão.
     */
    if (!valido) mensagemErro = 'Por favor, informe um endereço de email válido.';
  } else if (elemento.minLength > 0 && valor.length < elemento.minLength) {
    valido = false;
    mensagemErro = `Este campo deve ter pelo menos ${elemento.minLength} caracteres.`;
    /**
     * elemento.minLength
     * Acessa o valor do atributo minlength do HTML.
     * valor.length → número de caracteres da string.
     */
  }

  // Aplica ou remove o estado de erro
  if (valido) {
    ocultarErro(erroId);
    elemento.removeAttribute('aria-invalid');
    elemento.classList.remove('campo-invalido');
  } else {
    mostrarErro(erroId, mensagemErro);
    elemento.setAttribute('aria-invalid', 'true');
    /**
     * aria-invalid="true"
     * Informa screen readers que o campo tem valor inválido.
     * Screen reader anuncia: "Nome completo, campo de texto, inválido"
     * Combinado com aria-describedby → o erro também é lido.
     * WCAG 3.3.1: Identificação de erros de entrada.
     */
    elemento.classList.add('campo-invalido');
  }

  return valido;
}


/**
 * Mostra mensagem de erro no campo
 */
function mostrarErro(erroId, mensagem) {
  const elementoErro = document.getElementById(erroId);
  if (!elementoErro) return;

  elementoErro.textContent = mensagem;
  /**
   * textContent vs innerHTML
   * textContent: Define texto puro — SEM interpreta HTML.
   * innerHTML: Interpreta tags HTML na string.
   * SEGURANÇA: Use SEMPRE textContent para conteúdo dinâmico/user input.
   *   innerHTML com dados do usuário = vulnerabilidade XSS.
   *   XSS (Cross-Site Scripting): Injeção de scripts maliciosos.
   */
  elementoErro.removeAttribute('hidden');
}


/**
 * Oculta mensagem de erro
 */
function ocultarErro(erroId) {
  const elementoErro = document.getElementById(erroId);
  if (!elementoErro) return;
  elementoErro.setAttribute('hidden', '');
}


/**
 * Simula o envio do formulário
 */
function enviarFormulario(form) {
  const btnEnviar = form.querySelector('#btn-enviar');
  const btnTexto = btnEnviar.querySelector('.btn-texto');
  const btnLoading = btnEnviar.querySelector('.btn-loading');
  const statusEl = document.getElementById('form-status');

  // Estado: carregando
  btnEnviar.disabled = true;
  /**
   * element.disabled
   * Propriedade que reflete o atributo disabled do HTML.
   * Quando true: impede interação do usuário (teclado e mouse).
   * Visualmente: aparência cinza (via CSS :disabled).
   * Screen reader anuncia: "Enviar mensagem, botão, desabilitado".
   * IMPORTANTE: Elementos disabled são pulados na navegação por Tab.
   */
  btnTexto.setAttribute('hidden', '');
  btnLoading.removeAttribute('hidden');
  btnEnviar.setAttribute('aria-label', 'Enviando mensagem, aguarde...');

  // Simula delay de rede (em produção: fetch() real)
  setTimeout(function() {
    /**
     * setTimeout(callback, delay)
     * Executa a função após delay milissegundos.
     * ASSÍNCRONO: Não bloqueia a thread principal.
     * SIMULAÇÃO: Em produção, substituir por:
     *
     * fetch('/api/contato', {
     *   method: 'POST',
     *   headers: { 'Content-Type': 'application/json' },
     *   body: JSON.stringify({ nome, email, mensagem })
     * })
     * .then(response => response.json())
     * .then(data => { ... })
     * .catch(error => { ... })
     *
     * OU com async/await (mais legível):
     * try {
     *   const response = await fetch('/api/contato', { ... });
     *   const data = await response.json();
     * } catch (error) {
     *   console.error(error);
     * }
     */

    const sucesso = Math.random() > 0.1; // 90% de sucesso (simulação)
    /**
     * Math.random()
     * Retorna número float aleatório entre 0 (inclusive) e 1 (exclusivo).
     * Math.random() > 0.1 → true 90% das vezes
     */

    if (sucesso) {
      // Estado: sucesso
      statusEl.textContent = '✓ Mensagem enviada com sucesso! Responderei em breve.';
      statusEl.className = 'form-feedback sucesso';
      statusEl.removeAttribute('hidden');

      form.reset();
      /**
       * form.reset()
       * Limpa todos os campos para seus valores padrão.
       * Equivalente ao <button type="reset">.
       * Após envio bem-sucedido, sempre limpar o formulário.
       */

      // Move foco para a mensagem de sucesso
      statusEl.focus();
      statusEl.setAttribute('tabindex', '-1');
      /**
       * tabindex="-1"
       * Permite que qualquer elemento receba foco via JavaScript (.focus())
       * mas NÃO o inclui na ordem de Tab natural.
       * tabindex="0"  → inclui na ordem de Tab (após elementos nativos)
       * tabindex="1+" → define ordem específica (evitar — confuso para usuários)
       * tabindex="-1" → focável só por JS, não por Tab
       * WCAG 2.4.3: Gerenciar foco é essencial para acessibilidade.
       */
    } else {
      // Estado: erro
      statusEl.textContent = '✗ Erro ao enviar. Por favor, tente novamente.';
      statusEl.className = 'form-feedback erro';
      statusEl.removeAttribute('hidden');
      statusEl.focus();
      statusEl.setAttribute('tabindex', '-1');
    }

    // Restaura o botão
    btnEnviar.disabled = false;
    btnTexto.removeAttribute('hidden');
    btnLoading.setAttribute('hidden', '');
    btnEnviar.removeAttribute('aria-label');

  }, 2000); // 2 segundos de delay simulado
}


/* ════════════════════════════════════════════════
   5. CONTADOR DE CARACTERES
   ════════════════════════════════════════════════ */

function initContadorCaracteres() {
  const mensagem = document.getElementById('campo-mensagem');
  const contador = document.getElementById('mensagem-contador');

  if (!mensagem || !contador) return;

  mensagem.addEventListener('input', function() {
    const atual = this.value.length;
    const maximo = this.maxLength;
    /**
     * maxLength (via atributo maxlength="1000")
     * Refletido como propriedade no DOM.
     * Se não definido: -1
     */

    contador.textContent = `${atual} / ${maximo}`;

    // Muda cor quando próximo do limite
    const porcentagem = (atual / maximo) * 100;

    if (porcentagem >= 90) {
      contador.style.color = 'var(--cor-vermelho)';
    } else if (porcentagem >= 75) {
      contador.style.color = 'var(--cor-amarelo)';
    } else {
      contador.style.color = '';
      /**
       * style.color = ''
       * String vazia REMOVE a propriedade inline.
       * O estilo volta ao definido pelo CSS externo.
       */
    }
  });
}


/* ════════════════════════════════════════════════
   6. SCROLL REVEAL — Animações na rolagem
   ════════════════════════════════════════════════ */

function initScrollReveal() {
  /**
   * Intersection Observer para animações de entrada.
   * ALTERNATIVA: ScrollTrigger (GSAP), AOS.js, Animate.css.
   * VANTAGEM do observer nativo: Sem dependências externas.
   * PERFORMANCE: Executa fora do main thread — não trava o scroll.
   */

  const elementosAnimados = document.querySelectorAll(
    '.projeto-card, .destaque-card, .timeline-item, .secao-header'
  );
  /**
   * Multiple selectors
   * querySelectorAll aceita lista separada por vírgulas.
   * Seleciona TODOS os elementos que casam com QUALQUER seletor.
   */

  // Adiciona estado inicial (invisível)
  elementosAnimados.forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    /**
     * Estilo inline via JavaScript
     * element.style.propriedade = valor (camelCase!)
     * CSS: opacity → JS: element.style.opacity
     * CSS: background-color → JS: element.style.backgroundColor
     * DESVANTAGEM: Difícil de manter. Preferir classes CSS.
     * AQUI: Necessário para que o JS controle o estado inicial.
     */
  });

  const observer = new IntersectionObserver(
    function(entries, obs) {
      /**
       * obs: A própria instância do IntersectionObserver.
       * Passada como segundo parâmetro para poder fazer unobserve.
       */
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          obs.unobserve(entry.target);
          /**
           * unobserve(elemento)
           * Para de observar o elemento APÓS a animação.
           * PERFORMANCE: Reduz o trabalho do observer.
           * Animação de entrada só precisa acontecer UMA vez.
           */
        }
      });
    },
    {
      threshold: 0.15,
      /**
       * threshold: 0.15
       * Animação inicia quando 15% do elemento fica visível.
       * Valor menor (0.05) → anima mais cedo, menos visível.
       * Valor maior (0.5)  → precisa estar mais visível para animar.
       */
    }
  );

  elementosAnimados.forEach(function(el) {
    observer.observe(el);
  });
}


/* ════════════════════════════════════════════════
   7. FUNÇÕES UTILITÁRIAS
   ════════════════════════════════════════════════ */

/**
 * Anuncia mensagem para leitores de tela via live region
 * @param {string} mensagem - Texto a ser anunciado
 */
function anunciarParaScreenReader(mensagem) {
  /**
   * TÉCNICA: Inserir texto em live region para screen readers.
   * Sem alterar o foco — anúncio discreto.
   * Útil para mudanças dinâmicas de conteúdo (filtros, atualizações).
   */

  // Reutiliza ou cria uma live region
  let liveRegion = document.getElementById('sr-live-region');

  if (!liveRegion) {
    liveRegion = document.createElement('div');
    /**
     * document.createElement('tag')
     * Cria um novo elemento HTML no DOM (não inserido ainda).
     * O elemento existe em memória até ser inserido com appendChild/insertBefore.
     */
    liveRegion.id = 'sr-live-region';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');

    // Visualmente oculto mas acessível para screen readers
    liveRegion.style.cssText = `
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    `;
    /**
     * cssText
     * Define múltiplas propriedades CSS de uma vez como string.
     * PADRÃO "Visually Hidden":
     * Oculta visualmente mas mantém acessível para screen readers.
     * DIFERENÇA de display:none ou visibility:hidden:
     *   Estes escondem TAMBÉM de screen readers.
     *   O padrão acima mantém no fluxo de acessibilidade.
     * CLASSE EQUIVALENTE: .sr-only (Bootstrap, Tailwind)
     */

    document.body.appendChild(liveRegion);
    /**
     * appendChild(elemento)
     * Insere o elemento como ÚLTIMO filho do nó pai.
     * O elemento existe no DOM após esta chamada.
     */
  }

  // Limpa e atualiza (setTimeout garante que o browser perceba a mudança)
  liveRegion.textContent = '';
  setTimeout(function() {
    liveRegion.textContent = mensagem;
    /**
     * Por que setTimeout com 0?
     * Limpar e reescrever imediatamente pode ser ignorado pelo browser
     * (sem mudança detectável). Um tick de setTimeout garante que
     * o DOM foi atualizado entre as duas operações.
     * setTimeout(fn, 0) → próximo "tick" do event loop.
     */
  }, 100);
}


/**
 * Debounce — limita a frequência de chamadas de uma função
 * @param {Function} fn - Função a ser limitada
 * @param {number} delay - Delay em milissegundos
 * @returns {Function} - Função com debounce aplicado
 *
 * USO: window.addEventListener('resize', debounce(fn, 300))
 * Sem debounce: fn chamada centenas de vezes durante o resize.
 * Com debounce: fn chamada apenas 300ms APÓS parar o resize.
 */
function debounce(fn, delay) {
  let timeoutId;
  /**
   * Closure
   * A função retornada "lembra" da variável timeoutId do escopo pai.
   * Cada chamada ao debounced cancela o timeout anterior e cria um novo.
   * A função fn só executa se não houver nova chamada por 'delay' ms.
   */
  return function() {
    clearTimeout(timeoutId);
    /**
     * clearTimeout(id)
     * Cancela o timeout com aquele id.
     * Se timeoutId é undefined (primeira chamada): não faz nada.
     */
    timeoutId = setTimeout(function() {
      fn.apply(this, arguments);
      /**
       * fn.apply(contexto, argumentos)
       * Chama fn com um this específico e array de argumentos.
       * Equivalente a fn.call(this, arg1, arg2, ...)
       * Permite passar os argumentos originais para fn.
       */
    }, delay);
  };
}


/**
 * ════════════════════════════════════════════════
 * RESUMO FINAL — CONCEITOS JS DEMONSTRADOS
 * ════════════════════════════════════════════════
 *
 * DOM MANIPULATION:
 *   querySelector / querySelectorAll
 *   getElementById / getElementsByClassName
 *   createElement / appendChild
 *   classList (add/remove/toggle/contains)
 *   setAttribute / removeAttribute / getAttribute
 *   dataset (data attributes)
 *   style (inline CSS)
 *   textContent (SEGURO) vs innerHTML (cuidado com XSS)
 *   focus() / blur()
 *   disabled / checked / value
 *
 * EVENTOS:
 *   addEventListener (preferível a onclick)
 *   event.target / event.currentTarget
 *   event.preventDefault() — cancela comportamento padrão
 *   event.stopPropagation() — para bubbling
 *   event.key (teclado)
 *   { passive: true } para scroll events
 *
 * APIS DO BROWSER:
 *   IntersectionObserver — visibilidade de elementos
 *   window.scrollY — posição do scroll
 *   setTimeout / clearTimeout
 *
 * JAVASCRIPT MODERNO:
 *   const / let (nunca var)
 *   Template literals (`${variavel}`)
 *   Arrow functions (=>)
 *   Ternário (cond ? a : b)
 *   Optional chaining (?.)
 *   Logical OR (||) / AND (&&)
 *   Destructuring
 *   Array: forEach, map, filter, find
 *   Object: values, keys, entries
 *   Regex: test()
 *
 * PADRÕES:
 *   Guard clauses (return early)
 *   Funções pequenas com responsabilidade única
 *   Closures (debounce)
 *   'use strict'
 *   Comentários JSDoc
 *
 * ACESSIBILIDADE COM JS:
 *   aria-expanded, aria-pressed, aria-current
 *   aria-invalid, aria-label dinâmico
 *   Gestão de foco (focus() após ações)
 *   tabindex="-1" para foco programático
 *   Live regions (aria-live) para anúncios
 *   Atalhos de teclado (Escape para fechar)
 *   Foco retorna ao trigger após fechar modal/menu
 */
