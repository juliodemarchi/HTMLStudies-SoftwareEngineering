# Portfólio — Julio Cesar Demarchi Junior

> Engenheiro de Software Júnior | Projeto de Estrutura Semântica HTML Completa

## 📁 Estrutura do Projeto

```
portfolio-julio/
├── index.html          ← Estrutura semântica HTML completa
├── css/
│   └── style.css       ← Estilos com CSS moderno comentado
├── js/
│   └── main.js         ← JavaScript com padrões profissionais
├── assets/
│   └── cv-julio-demarchi.pdf   ← (adicionar seu currículo aqui)
└── README.md           ← Este arquivo
```

## 🚀 Como Abrir

### No Navegador
1. Baixe ou clone o repositório
2. Abra o arquivo `index.html` diretamente no navegador

### No VS Code
1. Abra a pasta no VS Code: `File → Open Folder`
2. Instale a extensão **Live Server** (recomendado)
3. Clique com botão direito em `index.html` → `Open with Live Server`

### No GitHub Pages
1. Faça push do projeto para um repositório GitHub
2. Vá em `Settings → Pages`
3. Em `Source`, selecione `main branch`
4. Acesse `https://seu-usuario.github.io/nome-do-repo`

---

## 📚 O que está demonstrado

### HTML Semântico
- `<!DOCTYPE html>` e estrutura base completa
- Tags semânticas: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Metadados: `<meta charset>`, `<meta viewport>`, `<meta description>`, Open Graph
- Tags de conteúdo: `<time>`, `<address>`, `<abbr>`, `<strong>`, `<em>`
- Listas: `<ul>`, `<ol>`, `<dl>/<dt>/<dd>`
- Tabela semântica: `<table>`, `<caption>`, `<thead>`, `<tbody>`, `<tfoot>`, `<th scope>`
- Links com `target="_blank" rel="noopener noreferrer"` (segurança)
- Imagens com `alt`, `width/height`, `loading="lazy/eager"`
- Formulário completo com validação

### CSS Moderno
- Variáveis CSS (Custom Properties) com `:root`
- Flexbox e CSS Grid (layouts responsivos)
- `clamp()` para tipografia fluida
- `calc()` para cálculos matemáticos
- Pseudo-elementos `::before`, `::after`
- Pseudo-classes `:hover`, `:focus-visible`, `:nth-child`, `:last-child`
- `@keyframes` e animações CSS
- `@media` queries (responsividade)
- `prefers-reduced-motion` (acessibilidade)

### JavaScript
- DOM manipulation (`querySelector`, `classList`, `setAttribute`)
- Eventos (`addEventListener`, `event.preventDefault`, `event.key`)
- `IntersectionObserver` (scroll animations, nav ativa)
- Validação de formulário com feedback de acessibilidade
- ARIA attributes dinâmicos (`aria-expanded`, `aria-pressed`, `aria-invalid`)
- Gestão de foco para acessibilidade por teclado
- Pattern de Debounce (closure)
- `'use strict'` e boas práticas

### Acessibilidade (a11y)
- Landmarks ARIA (`role="banner"`, `role="main"`, `role="contentinfo"`)
- `aria-label` e `aria-labelledby` em todas as seções e elementos interativos
- `aria-hidden="true"` em elementos decorativos
- `aria-required`, `aria-invalid`, `aria-describedby` em formulários
- Live regions (`aria-live`) para anúncios dinâmicos
- Foco visível (`:focus-visible`) sem remover outline
- Navegação completa por teclado
- Atalho Escape para fechar menu mobile

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Uso |
|---|---|---|
| HTML | 5 | Estrutura semântica |
| CSS | 3 | Estilos e responsividade |
| JavaScript | ES6+ | Interatividade |
| Font Awesome | 6.5 | Ícones via CDN |
| Google Fonts | — | Syne, Crimson Pro, JetBrains Mono |

---

## ✅ Checklist de Qualidade

- [x] HTML validado (sem erros no W3C Validator)
- [x] Apenas um `<h1>` por página
- [x] Hierarquia de headings sem saltos
- [x] Todas as imagens com `alt` descritivo
- [x] Todos os links descritivos (sem "clique aqui")
- [x] Formulário 100% acessível por teclado
- [x] `rel="noopener noreferrer"` em links externos
- [x] Meta tags de SEO e Open Graph
- [x] Responsivo em mobile, tablet e desktop
- [x] Sem JavaScript indescritable (graceful degradation)

---

## 👤 Autor

**Julio Cesar Demarchi Junior**  
Engenheiro de Software Júnior  
📧 julio.demarchi@email.com  
🔗 [github.com/julio-demarchi](https://github.com/julio-demarchi)  
🔗 [linkedin.com/in/julio-demarchi](https://linkedin.com/in/julio-demarchi)

---

*Projeto criado com foco em HTML semântico, acessibilidade e boas práticas de engenharia de software.*
