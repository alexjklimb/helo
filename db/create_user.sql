insert into users (
    username, password, profile_pic
) values (
    ${username}, ${hash}, 'https://i.ytimg.com/vi/Y03Zd7AsHEw/maxresdefault.jpg'
)
returning *;