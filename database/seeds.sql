-- seed admin profile

insert into profiles (id, email, name, role)
select id, email, 'Admin', 'admin'
from auth.users
where email = 'admin@shopix.com'
and not exists (
  select 1 from profiles where profiles.id = auth.users.id
);