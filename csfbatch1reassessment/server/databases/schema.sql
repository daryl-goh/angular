drop schema if exists second_hand;

create schema second_hand;

use second_hand;

drop table if exists postings;

create table postings (
    posting_id varchar(8),
    posting_date date not null,
    name varchar(200) not null,
    email varchar(128),
    phone varchar(20) not null default '',
    title varchar(256),
    description text,
    image varchar(256) not null,

    primary key (posting_id)
);

