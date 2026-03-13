# Formulário do WebTour

Fluxo: **quest1 → text1 → quest2 → text2 → final** (nome, e-mail e recomendação de cursos).

## URLs

- `form/index.html?step=quest1` — início (ou use `form/quest1.html`)
- `form/quest1.html`, `form/text1.html`, `form/quest2.html`, `form/text2.html`, `form/final.html` — redirecionam para o passo correto
- `form/admin.html` — editar perguntas e textos

## Supabase

1. Crie um projeto em [supabase.com](https://supabase.com).
2. Em **form/supabase-config.js**, preencha:
   - `url`: URL do projeto (Settings → API → Project URL)
   - `anonKey`: chave anônima (Settings → API → anon public)
3. No SQL Editor do Supabase, execute:

```sql
create table if not exists form_submissions (
  id uuid default gen_random_uuid() primary key,
  name text,
  email text,
  answers jsonb,
  recommendations jsonb,
  created_at timestamptz default now()
);

alter table form_submissions enable row level security;

create policy "Allow anonymous insert"
  on form_submissions for insert
  to anon with check (true);
```

As respostas e os cursos recomendados passam a ser salvos na tabela `form_submissions`.
