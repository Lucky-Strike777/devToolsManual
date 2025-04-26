-- 스토리지 버킷 생성을 위한 함수
create or replace function create_storage_bucket()
returns void as $$
begin
  insert into storage.buckets (id, name, public)
  values ('card-images', 'card-images', true)
  on conflict (id) do nothing;
end;
$$ language plpgsql;

-- 함수 실행
select create_storage_bucket();

-- 카테고리 테이블 생성
create table if not exists categories (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null,
  slug text unique not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 카드 테이블 생성
create table if not exists cards (
  id uuid primary key default uuid_generate_v4(),
  category_id uuid references categories(id) on delete cascade not null,
  title text not null,
  description text,
  order_index integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(category_id, order_index)
);

-- 이미지 테이블 생성
create table if not exists images (
  id uuid primary key default uuid_generate_v4(),
  card_id uuid references cards(id) on delete cascade not null,
  storage_path text not null,
  url text not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 초기 카테고리 데이터 삽입
insert into categories (name, slug, description)
values 
  ('Git', 'git', 'Git 버전 관리 시스템 기본 명령어와 개념'),
  ('GitHub', 'github', 'GitHub 플랫폼 사용법과 협업 기능'),
  ('SourceTree', 'sourcetree', 'SourceTree GUI 클라이언트 사용법'),
  ('Firebase', 'firebase', 'Firebase 서비스 사용법'),
  ('Vercel', 'vercel', 'Vercel 배포 플랫폼 사용법'),
  ('Cursor', 'cursor', 'Cursor IDE 사용법')
on conflict (slug) do nothing;

-- 스토리지 정책 설정
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'card-images' );

create policy "Auth Insert Images"
  on storage.objects for insert
  with check ( bucket_id = 'card-images' AND auth.role() = 'authenticated' );

create policy "Auth Delete Images"
  on storage.objects for delete
  using ( bucket_id = 'card-images' AND auth.role() = 'authenticated' );

-- 테이블 RLS 활성화
alter table categories enable row level security;
alter table cards enable row level security;
alter table images enable row level security;

-- 카테고리 정책
create policy "Public Read Categories"
  on categories for select
  using (true);

create policy "Auth Insert Categories"
  on categories for insert
  with check (auth.role() = 'authenticated');

create policy "Auth Update Categories"
  on categories for update
  using (auth.role() = 'authenticated');

create policy "Auth Delete Categories"
  on categories for delete
  using (auth.role() = 'authenticated');

-- 카드 정책
create policy "Public Read Cards"
  on cards for select
  using (true);

create policy "Auth Insert Cards"
  on cards for insert
  with check (auth.role() = 'authenticated');

create policy "Auth Update Cards"
  on cards for update
  using (auth.role() = 'authenticated');

create policy "Auth Delete Cards"
  on cards for delete
  using (auth.role() = 'authenticated');

-- 이미지 정책
create policy "Public Read Images"
  on images for select
  using (true);

create policy "Auth Insert Images"
  on images for insert
  with check (auth.role() = 'authenticated');

create policy "Auth Update Images"
  on images for update
  using (auth.role() = 'authenticated');

create policy "Auth Delete Images"
  on images for delete
  using (auth.role() = 'authenticated');

-- 이미지 관련 함수들
create or replace function get_card_images(p_card_id uuid)
returns setof images
language sql
security definer
as $$
  select * from images
  where card_id = p_card_id
  order by created_at desc;
$$;

create or replace function delete_card_image(p_image_id uuid)
returns boolean
language plpgsql
security definer
as $$
declare
  v_storage_path text;
begin
  -- 이미지 정보 가져오기
  select storage_path into v_storage_path
  from images
  where id = p_image_id;
  
  -- 이미지 레코드 삭제
  delete from images
  where id = p_image_id;
  
  -- 스토리지 파일 삭제는 애플리케이션 레벨에서 처리
  
  return found;
end;
$$; 