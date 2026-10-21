-- SSLC client portal schema (idempotent: safe to run again).
-- Apply with: npm run db:migrate

create extension if not exists pgcrypto;

create table if not exists users (
  id              uuid primary key default gen_random_uuid(),
  email           text not null unique check (email = lower(email)),
  name            text not null,
  company         text,
  phone           text,
  role            text not null default 'client' check (role in ('admin', 'client')),
  password_hash   text not null,
  -- bumped on password change; invalidates existing sessions
  session_version integer not null default 1,
  created_at      timestamptz not null default now(),
  last_login_at   timestamptz
);

create table if not exists projects (
  id          uuid primary key default gen_random_uuid(),
  client_id   uuid not null references users (id) on delete cascade,
  name        text not null,
  description text,
  status      text not null default 'planning'
              check (status in ('planning', 'in_progress', 'review', 'completed', 'on_hold')),
  start_date  date,
  due_date    date,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists projects_client_idx on projects (client_id);

create table if not exists milestones (
  id           uuid primary key default gen_random_uuid(),
  project_id   uuid not null references projects (id) on delete cascade,
  title        text not null,
  due_date     date,
  status       text not null default 'pending' check (status in ('pending', 'in_progress', 'done')),
  completed_at date,
  created_at   timestamptz not null default now()
);
create index if not exists milestones_project_idx on milestones (project_id);

create table if not exists payments (
  id                 uuid primary key default gen_random_uuid(),
  project_id         uuid not null references projects (id) on delete cascade,
  label              text not null,
  amount_paise       bigint not null check (amount_paise > 0),
  currency           text not null default 'INR',
  due_date           date,
  status             text not null default 'pending' check (status in ('pending', 'paid', 'cancelled')),
  paid_at            date,
  method             text,          -- e.g. UPI, bank transfer, Razorpay
  reference          text,          -- UTR / transaction reference
  -- reserved for the online payment integration (Razorpay/Stripe)
  gateway            text,
  gateway_order_id   text,
  gateway_payment_id text,
  created_at         timestamptz not null default now()
);
create index if not exists payments_project_idx on payments (project_id);

-- Simple login throttling (per email + IP)
create table if not exists login_attempts (
  key          text primary key,
  failures     integer not null default 0,
  window_start timestamptz not null default now()
);
