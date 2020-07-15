select p.id, p.title, u.profile_pic, p.img, u.username, p.content, p.author_id from posts p
join users u on p.author_id = u.id
where ${id} = p.id;