select u.username, u.profile_pic, p.id, p.img, p.title from posts p
join users u on p.author_id = u.id
where title like concat('%', ${search}, '%');