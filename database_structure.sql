-- Create PostgreSQL DB with name corner_pocket

-- Holds user data for account
CREATE TABLE "user"(
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(255) UNIQUE NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "address_1" VARCHAR(255),
    "address_2" VARCHAR(255),
    "city" VARCHAR(255),
    "state" VARCHAR(255),
    "country" VARCHAR(255),
    "zip" VARCHAR(255),
    "phone" VARCHAR(255),
    "password" VARCHAR(1000) NOT NULL
);

-- Currently only has 8-ball billards, 
-- but an option for other games/activities in future
CREATE TABLE "activities"(
    "id" SERIAL PRIMARY KEY,
    "activity" VARCHAR(255) NOT NULL
);

-- Have a default one set now, but an option to add different venues in the future
CREATE TABLE "locations"(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "address_1" VARCHAR(255),
    "address_2" VARCHAR(255),
    "city" VARCHAR(255),
    "state" VARCHAR(255),
    "country" VARCHAR(255),
    "zip" VARCHAR(255)
);

-- Table for storing leagues. Works with two junction tables.
    -- "users_leagues" and "teams_leagues" for membership
CREATE TABLE "leagues"(
    "id" SERIAL PRIMARY KEY,
    "league_name" VARCHAR(255) NOT NULL,
    "activity_id" INT DEFAULT 1,
    "owner_id" BIGINT NOT NULL,
    "authorized_user_id" BIGINT,
    "number_of_teams" BIGINT NOT NULL,
    "default_location_id" BIGINT DEFAULT 1,
    "join_code" VARCHAR(255) UNIQUE
);

-- Table for storing teams. Works with two junction tables.
    -- "users_teams" and "teams_leagues" for membership
CREATE TABLE "teams"(
    "id" SERIAL PRIMARY KEY,
    "team_name" VARCHAR(255) NOT NULL,
    "owner_id" BIGINT NOT NULL,
    "authorized_user_id" BIGINT,
    "join_code" VARCHAR(255)
);

-- Table for storing tournaments. Works with a junction table.
    -- "leagues_tournaments" shows which league a tournament belongs
CREATE TABLE "tournaments"(
    "id" SERIAL PRIMARY KEY,
    "tournament_name" VARCHAR(255) NOT NULL,
    "bracket" BOOLEAN NOT NULL,
    "num_teams" INT,
    "num_rounds" INT,
    "playoffs" BOOLEAN DEFAULT FALSE,
    "playoff_num" INT DEFAULT 0,
    "league_id" INT NOT NULL,
    "complete" BOOLEAN DEFAULT FALSE
);

-- Junction table for showing user membership in a league
CREATE TABLE "users_leagues"(
    "id" SERIAL PRIMARY KEY,
    "user_id" BIGINT NOT NULL,
    "league_id" BIGINT NOT NULL
);

-- Junction table for showing user membership on a team
CREATE TABLE "users_teams" (
    "id" SERIAL PRIMARY KEY,
    "user_id" BIGINT NOT NULL,
    "team_id" BIGINT NOT NULL
);

-- Junction table for showing team membership in a league
CREATE TABLE "teams_leagues" (
    "id" SERIAL PRIMARY KEY,
    "team_id" BIGINT NOT NULL,
    "league_id" BIGINT NOT NULL
);

-- -- Junction table for showing which league is having a tournament
-- CREATE TABLE "leagues_tournaments"(
-- 	"id" SERIAL PRIMARY KEY,
-- 	"league_id" BIGINT NOT NULL,
-- 	"tournament_id" BIGINT NOT NULL
-- );

-- Table for defining different scoresheet types
CREATE TABLE "scoresheets"(
    "id" SERIAL PRIMARY KEY,
    "num_teams" INT NOT NULL,
    "num_players" INT NOT NULL,
    "num_rounds" INT NOT NULL,
    "total_num_matches" INT NOT NULL
);

-- Table for the overall matchup between two teams
CREATE TABLE "matchups"(
    "id" SERIAL PRIMARY KEY,
    "date" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "location_id" BIGINT NOT NULL,
    "home_team_id" BIGINT NOT NULL,
    "away_team_id" BIGINT NOT NULL,
    "home_team_total" NUMERIC DEFAULT 0,
    "away_team_total" NUMERIC DEFAULT 0,
    "winner" BIGINT,
    "home_lineup_set" BOOLEAN NOT NULL DEFAULT 'False',
    "away_lineup_set" BOOLEAN NOT NULL DEFAULT 'False',
    "tournament_id" BIGINT NOT NULL
);

-- Table for each round in a matchup
CREATE TABLE "rounds"(
    "id" SERIAL PRIMARY KEY,
    "matchup_id" BIGINT NOT NULL,
    "home_score" NUMERIC,
    "away_score" NUMERIC,
    "home_handicap" NUMERIC NOT NULL,
    "away_handicap" NUMERIC NOT NULL,
    "home_total" NUMERIC,
    "away_total" NUMERIC,
    "round_winner" BIGINT,
    "round_number" INT NOT NULL
);

-- Table for each game in a round
CREATE TABLE "games"(
    "id" SERIAL PRIMARY KEY,
    "home_player" BIGINT NULL,
    "home_player_sub" BOOLEAN NOT NULL,
    "home_player_score" VARCHAR(255) NOT NULL,
    "away_player" BIGINT NULL,
    "away_player_sub" BOOLEAN NOT NULL,
    "away_player_score" VARCHAR(255) NOT NULL,
    "winner" BIGINT,
    "matchup_id" BIGINT NOT NULL,
    "round_id" BIGINT NOT NULL,
    "game_number" INT NOT NULL
);