# WebTour - Links do Formulário

Links para usar como hotspots no tour virtual. Cada link abre uma etapa do formulário.

## Fluxo do Formulário (5 etapas)

| # | Etapa | URL | Descrição |
|---|-------|-----|-----------|
| 1 | Pergunta 1 | `/form/quest1` | "Qual dessas áreas mais desperta seu interesse?" — 4 opções |
| 2 | Texto 1 | `/form/text1` | "Sobre nossos treinamentos" — texto informativo |
| 3 | Pergunta 2 | `/form/quest2` | "Como você prefere atuar no dia a dia?" — 4 opções |
| 4 | Texto 2 | `/form/text2` | "Próximo passo" — texto informativo |
| 5 | Formulário | `/form/final` | Coleta nome + e-mail → ao enviar, redireciona para o resultado |

## Página de Resultado

| URL | Descrição |
|-----|-----------|
| `/form/result` | Mostra qual dos 4 cursos a pessoa se identifica (acessado automaticamente após envio do formulário) |

## 4 Cursos Possíveis

- **ITIL 4 Foundation** — Gestão de serviços de TI
- **Segurança da Informação** — Proteja dados e sistemas
- **Microsoft Azure Fundamentals** — Cloud e infraestrutura
- **PRINCE2 / Metodologias Ágeis** — Gestão de projetos

## Outras Páginas

| URL | Descrição |
|-----|-----------|
| `/form/admin` | Painel admin para editar perguntas, textos e cursos |

## Como funciona

1. Usuário explora o tour 360 e encontra um hotspot
2. Hotspot abre a URL do formulário (ex: `/form/quest1`)
3. Usuário responde a pergunta e clica "Confirmar resposta"
4. Aparece **"Resposta salva! Continue o tour"** com botão "Voltar ao Tour"
5. Usuário volta ao tour e encontra o próximo hotspot
6. Repete até chegar no formulário (etapa 5)
7. Ao clicar **"Enviar"**, redireciona direto para a página de resultado com o curso recomendado
