create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  name text,
  role text default 'user',
  avatar_url text,
  created_at timestamp with time zone default now()
);