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
    "league_id" BIGINT NOT NULL,
    "bracket" BOOLEAN NOT NULL,
    "num_teams" INT NOT NULL,
    "playoffs" BOOLEAN NOT NULL,
    "playoff_num" INT NOT NULL
);

CREATE TABLE "locations"(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "address_1" VARCHAR(255) NOT NULL,
    "address_2" VARCHAR(255),
    "city" VARCHAR(255) NOT NULL,
    "state" VARCHAR(255) NOT NULL,
    "country" VARCHAR(255) NOT NULL,
    "zip" VARCHAR(255) NOT NULL
);

CREATE TABLE "leagues"(
    "id" SERIAL PRIMARY KEY,
    "league_name" VARCHAR(255) NOT NULL,
    "activity_id" BIGINT NOT NULL,
    "owner_id" BIGINT NOT NULL,
    "authorized_user_id" BIGINT,
    "number_of_teams" BIGINT NOT NULL,
    "default_location_id" BIGINT NOT NULL
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
    "league_id" BIGINT NOT NULL
);

CREATE TABLE "users_teams" (
    "id" SERIAL PRIMARY KEY,
    "user_id" BIGINT NOT NULL,
    "team_id" BIGINT NOT NULL
);

ALTER TABLE
    "matchups" ADD CONSTRAINT "matchups_location_id_foreign" FOREIGN KEY("location_id") REFERENCES "locations"("id");
ALTER TABLE
    "teams" ADD CONSTRAINT "teams_league_id_foreign" FOREIGN KEY("league_id") REFERENCES "leagues"("id");
ALTER TABLE
    "games" ADD CONSTRAINT "games_away_player_foreign" FOREIGN KEY("away_player") REFERENCES "user"("id");
ALTER TABLE
    "leagues" ADD CONSTRAINT "leagues_activity_id_foreign" FOREIGN KEY("activity_id") REFERENCES "activities"("id");
ALTER TABLE
    "leagues" ADD CONSTRAINT "leagues_default_location_id_foreign" FOREIGN KEY("default_location_id") REFERENCES "locations"("id");
ALTER TABLE
    "rounds" ADD CONSTRAINT "rounds_matchup_id_foreign" FOREIGN KEY("matchup_id") REFERENCES "matchups"("id");
ALTER TABLE
    "matchups" ADD CONSTRAINT "matchups_home_team_id_foreign" FOREIGN KEY("home_team_id") REFERENCES "teams"("id");
ALTER TABLE
    "games" ADD CONSTRAINT "games_round_id_foreign" FOREIGN KEY("round_id") REFERENCES "rounds"("id");
ALTER TABLE
    "games" ADD CONSTRAINT "games_home_player_foreign" FOREIGN KEY("home_player") REFERENCES "user"("id");
ALTER TABLE
    "matchups" ADD CONSTRAINT "matchups_away_team_id_foreign" FOREIGN KEY("away_team_id") REFERENCES "teams"("id");
ALTER TABLE
    "teams" ADD CONSTRAINT "teams_owner_id_foreign" FOREIGN KEY("owner_id") REFERENCES "user"("id");
ALTER TABLE
    "teams" ADD CONSTRAINT "teams_authorized_user_id_foreign" FOREIGN KEY("authorized_user_id") REFERENCES "user"("id");
ALTER TABLE
    "tournaments" ADD CONSTRAINT "tournaments_league_id_foreign" FOREIGN KEY("league_id") REFERENCES "leagues"("id");
ALTER TABLE
    "leagues" ADD CONSTRAINT "leagues_authorized_user_id_foreign" FOREIGN KEY("authorized_user_id") REFERENCES "user"("id");
ALTER TABLE
    "leagues" ADD CONSTRAINT "leagues_owner_id_foreign" FOREIGN KEY("owner_id") REFERENCES "user"("id");