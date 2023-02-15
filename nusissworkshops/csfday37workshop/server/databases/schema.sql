drop schema if exists feeds;

create schema feeds;

use feeds;

drop table if exists posts;

create table posts (
    post_id varchar(8) not null,
    comments mediumtext not null,
    picture mediumblob not null,

    primary key (post_id)
);

