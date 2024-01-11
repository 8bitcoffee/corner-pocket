-- Create PostgreSQL DB with name corner_pocket

CREATE TABLE "rounds"(
    "id" SERIAL PRIMARY KEY,
    "matchup_id" BIGINT NOT NULL,
    "home_score" NUMERIC,
    "away_score" NUMERIC,
    "home_handicap" NUMERIC NOT NULL,
    "away_handicap" NUMERIC NOT NULL,
    "home_total" NUMERIC,
    "away_total" NUMERIC,
    "round_winner" BIGINT
);

CREATE TABLE "activities"(
    "id" SERIAL PRIMARY KEY,
    "activity" VARCHAR(255) NOT NULL
);

CREATE TABLE "games"(
    "id" SERIAL PRIMARY KEY,
    "round_id" INT NOT NULL,
    "home_player" BIGINT NULL,
    "home_player_sub" BOOLEAN NOT NULL,
    "home_player_score" VARCHAR(255) NOT NULL,
    "away_player" BIGINT NULL,
    "away_player_sub" BOOLEAN NOT NULL,
    "away_player_score" VARCHAR(255) NOT NULL,
    "winner" BIGINT
);

CREATE TABLE "tournaments"(
    "id" SERIAL PRIMARY KEY,
    "tournament_name" VARCHAR(255) NOT NULL,
    "bracket" BOOLEAN NOT NULL,
    "num_teams" INT NOT NULL,
    "playoffs" BOOLEAN NOT NULL,
    "playoff_num" INT NOT NULL,
    "complete" BOOLEAN DEFAULT FALSE
);

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

CREATE TABLE "leagues"(
    "id" SERIAL PRIMARY KEY,
    "league_name" VARCHAR(255) NOT NULL,
    "activity_id" BIGINT NOT NULL,
    "owner_id" BIGINT NOT NULL,
    "authorized_user_id" BIGINT,
    "number_of_teams" BIGINT NOT NULL,
    "default_location_id" BIGINT NOT NULL,
    "join_code" VARCHAR(255)
);

CREATE TABLE "scoresheets"(
    "id" SERIAL PRIMARY KEY,
    "num_teams" INT NOT NULL,
    "num_rounds" INT NOT NULL,
    "total_num_matches" INT NOT NULL
);

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
    "access_level" INTEGER NOT NULL DEFAULT '0',
    "password" VARCHAR(1000) NOT NULL
);

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
    "away_lineup_set" BOOLEAN NOT NULL DEFAULT 'False'
);

CREATE TABLE "teams"(
    "id" SERIAL PRIMARY KEY,
    "team_name" VARCHAR(255) NOT NULL,
    "owner_id" BIGINT NOT NULL,
    "authorized_user_id" BIGINT,
    "join_code" VARCHAR(255)
);

CREATE TABLE "users_teams" (
    "id" SERIAL PRIMARY KEY,
    "user_id" BIGINT NOT NULL,
    "team_id" BIGINT NOT NULL
);

CREATE TABLE "leagues_tournaments"(
	"id" SERIAL PRIMARY KEY,
	"league_id" BIGINT NOT NULL,
	"tournament_id" BIGINT NOT NULL
);