-- Example data. 50 users and a league with 8 teams.

INSERT INTO "activities" ("activity")
VALUES('eight-ball');

INSERT INTO "scoresheets"("num_teams", "num_players", "num_rounds", "total_num_matches")
VALUES
    (2,5,5,25),
    (2,5,3,15)
;

INSERT INTO "locations"(
    "name",
    "address_1",
    "city",
    "state",
    "country",
    "zip"
)
VALUES (
    'Shooters', '1934 State Hwy 13', 'Burnsville', 'MN', 'United States', '55337'
);

INSERT INTO "user"(
    "username",
    "first_name",
    "last_name",
    "password"
)
VALUES
    -- 1-7
    ('j@8bit.coffee', 'J', 'Read', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('pvenkman@gmail.com','Peter', 'Venkman', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('rstantz@gmail.com', 'Ray', 'Stantz', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('espangler@gmail.com', 'Egon', 'Spangler', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('wzeddemore@gmail.com', 'Winston', 'Zeddemore', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('jmelnitz@gmail.com', 'Janine', 'Melnitz', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('dbarrett@gmail.com', 'Dana', 'Barrett', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    -- 8-12
    ('oathos@gmail.com', 'Olivier', 'Athos', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('cdartagnan@gmail.com', 'Charles', 'Dartagnan', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('pduvallon@gmail.com', 'Porthos', 'du Vallon', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('rdherblay@gmail.com', 'Rene', 'dHarblay', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('ahabsburgo@gmail.com', 'Ana Maria', 'Habsburgo', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    -- 13-19
    ('tstark@gmail.com', 'Tony', 'Stark', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('bbanner@gmail.com', 'Bruce', 'Banner', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('todinson@gmail.com', 'Thor', 'Odinson', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('cbarton@gmail.com', 'Clint', 'Barton', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('srogers@gmail.com', 'Steve', 'Rogers', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('nromanoff@gmail.com', 'Natasha', 'Romanoff', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('nfury@gmail.com', 'Nick', 'Fury', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    -- 20-25
    ('bwayne@gmail.com', 'Bruce', 'Wayne', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('dprince@gmail.com', 'Diana', 'Prince', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('ckent@gmail.com', 'Clark', 'Kent', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('ballen@gmail.com', 'Barry', 'Allen', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('vstone@gmail.com', 'Victor', 'Stone', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('hjordan@gmail.com', 'Hal', 'Jordan', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    -- 26-32
    ('jlennon@gmail.com', 'John', 'Lennon', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('gharrison@gmail.com', 'George', 'Harrison', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('pmccartney@gmail.com', 'Paul', 'McCartney', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('rstarr@gmail.com', 'Ringo', 'Starr', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('pbest@gmail.com', 'Pete', 'Best', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('bpreston@gmail.com', 'Billy', 'Preston', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('ssutcliffe@gmail.com', 'Stuart', 'Sutcliffe', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    -- 33-38
    ('sconnery@gmail.com', 'Sean', 'Connery', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('glazenby@gmail.com', 'George', 'Lazenby', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('rmoore@gmail.com', 'Roger', 'Moore', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('tdalton@gmail.com', 'Timothy', 'Dalton', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('pbrosnan@gmail.com', 'Pierce', 'Brosnan', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('dcraig@gmail.com', 'Daniel', 'Craig', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    -- 39-44
    ('bkenobi@gmail.com', 'Ben', 'Kenobi', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('lskywalker@gmail.com', 'Luke', 'Skywalker', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('hsolo@gmail.com', 'Han', 'Solo', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('csawa@gmail.com', 'Chewbacca', 'Sawa', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('lorgana@gmail.com', 'Leia', 'Organa', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('askywalker@gmail.com', 'Anakin', 'Skywalker', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    -- 45-50
    ('jtkirk@gmail.com', 'James', 'Kirk', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('stspock@gmail.com', 'Schn Tgai', 'Spock', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('nuhura@gmail.com', 'Nyota', 'Uhura', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('lmccoy@gmail.com', 'Leonard', 'McCoy', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('hsulu@gmail.com', 'Hikaru', 'Sulu', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS'),
    ('cpike@gmail.com', 'Christopher', 'Pike', '$2a$10$tkHVZuuW9eGbA3PeoJAiCOR/uWmI4uxvhLFboyp0UqhVgdD6uD.vS')
;

INSERT INTO "leagues"(
    "league_name",
    "owner_id",
    "number_of_teams",
    "join_code"
)
VALUES (
    'Universe Crossovers', 1, 8, 'Prime!'
);

INSERT INTO "teams"(
    "team_name",
    "owner_id",
    "join_code"
)
VALUES 
    ('Aint Afraid of No Cue Balls' ,2,'Gbust!'),
    ('All 4 One!',8,'A41!!!'),
    ('Avenge This',19,'AVNGER'),
    ('Just Us League',20,'Snyder'),
    ('Quarrymen',26,'Walrus'),
    ('License to Scratch',33,'Gfingr'),
    ('Dont Tell me the Odds',40,'NoSith'),
    ('Boldly Gone',45,'Scotty')
;

INSERT INTO "users_leagues"("user_id", "league_id")
VALUES
    (1,1),(2,1),(3,1),(4,1),(5,1),(6,1),(7,1),(8,1),(9,1),(10,1),
    (11,1),(12,1),(13,1),(14,1),(15,1),(16,1),(17,1),(18,1),(19,1),(20,1),
    (21,1),(22,1),(23,1),(24,1),(25,1),(26,1),(27,1),(28,1),(29,1),(30,1),
    (31,1),(32,1),(33,1),(34,1),(35,1),(36,1),(37,1),(38,1),(39,1),(40,1),
    (41,1),(42,1),(43,1),(44,1),(45,1),(46,1),(47,1),(48,1),(49,1),(50,1)
;

INSERT INTO "users_teams"("user_id", "team_id")
VALUES
    (2,1),(3,1),(4,1),(5,1),(6,1),(7,1),
    (8,2),(9,2),(10,2),(11,2),(12,2),
    (13,3),(14,3),(15,3),(16,3),(17,3),(18,3),(19,3),
    (20,4),(21,4),(22,4),(23,4),(24,4),(25,4),
    (26,5),(27,5),(28,5),(29,5),(30,5),(31,5),(32,5),
    (33,6),(34,6),(35,6),(36,6),(37,6),(38,6),
    (39,7),(40,7),(41,7),(42,7),(43,7),(44,7),
    (45,8),(46,8),(47,8),(48,8),(49,8),(50,8)
;

INSERT INTO "teams_leagues"("team_id", "league_id")
VALUES
    (1,1),(2,1),(3,1),(4,1),(5,1),(6,1),(7,1),(8,1)
;