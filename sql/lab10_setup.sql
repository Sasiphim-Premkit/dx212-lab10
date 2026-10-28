-- Lab 10 · กินในงบ — รันทีละก้อนใน Supabase SQL Editor

-- ML3: CREATE TABLE
create table public.categories (
  id bigint generated always as identity primary key,
  name text not null unique
);

create table public.menus (
  id bigint generated always as identity primary key,
  name text not null,
  price integer not null check (price > 0),
  spicy boolean not null default false,
  emoji text not null default '🍽️',
  category_id bigint not null references public.categories (id),
  created_at timestamptz not null default now()
);

-- ML4: INSERT
insert into public.categories (name)
values ('ข้าว'), ('เส้น'), ('จานเดียว'), ('เครื่องดื่ม');

insert into public.menus (name, price, spicy, emoji, category_id)
values
  ('ข้าวมันไก่', 45, false, '🍗', 1),
  ('ก๋วยเตี๋ยวต้มยำ', 50, true, '🍜', 2),
  ('กะเพราหมูกรอบ', 60, true, '🌶️', 1),
  ('สเต๊กหมู', 89, false, '🥩', 3),
  ('ชาไทย', 25, false, '🧋', 4);

-- ML6: VIEW
create view public.menu_list
with (security_invoker = true) as
select m.id, m.name, m.price, c.name as category, m.spicy, m.emoji
from public.menus m
join public.categories c on c.id = m.category_id;

-- ML7-B: เปิด RLS
alter table public.categories enable row level security;
alter table public.menus enable row level security;

-- ML7-C: GRANT
grant select on public.categories, public.menus, public.menu_list
  to anon, authenticated;

-- ML7-D: POLICY
create policy "ทุกคนอ่านหมวดได้" on public.categories
  for select to anon, authenticated using (true);

create policy "ทุกคนอ่านเมนูได้" on public.menus
  for select to anon, authenticated using (true);

-- ตรวจ
select * from public.menu_list order by price;

-- ML10 (รันทีหลัง ตอนทดสอบแอป):
-- update public.menus set price = 55 where name = 'ก๋วยเตี๋ยวต้มยำ';
-- insert into public.menus (name, price, spicy, emoji, category_id) values ('ผัดซีอิ๊ว', 50, false, '🥡', 2);
