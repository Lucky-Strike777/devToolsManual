-- 사용자 테이블
create table users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  role text not null check (role in ('admin', 'user')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 카드 카테고리 테이블 (git, github, sourcetree 등)
create table categories (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null,
  slug text unique not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 카드 테이블 (각 도구의 세부 기능들)
create table cards (
  id uuid primary key default uuid_generate_v4(),
  category_id uuid references categories(id) on delete cascade not null,
  title text not null,
  description text,
  order_index integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(category_id, order_index)
);

-- 이미지 테이블
create table images (
  id uuid primary key default uuid_generate_v4(),
  card_id uuid references cards(id) on delete cascade not null,
  storage_path text not null,
  url text not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 초기 데이터 삽입
insert into categories (name, slug, description) values
  ('Git', 'git', 'Git 버전 관리 시스템 기본 명령어와 개념'),
  ('GitHub', 'github', 'GitHub 플랫폼 사용법과 협업 기능'),
  ('SourceTree', 'sourcetree', 'SourceTree GUI 클라이언트 사용법'),
  ('Firebase', 'firebase', 'Firebase 서비스 사용법'),
  ('Vercel', 'vercel', 'Vercel 배포 플랫폼 사용법'),
  ('Cursor', 'cursor', 'Cursor IDE 사용법');

-- RLS(Row Level Security) 정책 설정
alter table users enable row level security;
alter table categories enable row level security;
alter table cards enable row level security;
alter table images enable row level security;

-- 사용자 정책
create policy "Public read users" on users
  for select using (true);

create policy "Admin insert users" on users
  for insert with check (auth.role() = 'authenticated' and auth.jwt()->>'role' = 'admin');

-- 카테고리 정책
create policy "Public read categories" on categories
  for select using (true);

create policy "Admin manage categories" on categories
  for all using (auth.role() = 'authenticated' and auth.jwt()->>'role' = 'admin');

-- 카드 정책
create policy "Public read cards" on cards
  for select using (true);

create policy "Admin manage cards" on cards
  for all using (auth.role() = 'authenticated' and auth.jwt()->>'role' = 'admin');

-- 이미지 정책
create policy "Public read images" on images
  for select using (true);

create policy "Admin manage images" on images
  for all using (auth.role() = 'authenticated' and auth.jwt()->>'role' = 'admin'); 