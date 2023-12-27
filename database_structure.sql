-- Create PostgreSQL DB with name corner_pocket


CREATE TABLE "rounds"(
    "id" SERIAL NOT NULL,
    "matchup_id" BIGINT NOT NULL,
    "home_score" BIGINT NOT NULL,
    "away_score" BIGINT NOT NULL,
    "home_handicap" BIGINT NOT NULL,
    "away_handicap" BIGINT NOT NULL,
    "home_total" BIGINT NOT NULL,
    "away_total" BIGINT NOT NULL,
    "round_winner" BIGINT NOT NULL
);
ALTER TABLE
    "rounds" ADD PRIMARY KEY("id");
CREATE TABLE "tournament_types"(
    "id" SERIAL NOT NULL,
    "playoffs" BOOLEAN NOT NULL,
    "playoff_num" BIGINT NOT NULL,
    "tournament_type_name" VARCHAR(255) NOT NULL,
    "num_matchups" BIGINT NOT NULL
);
ALTER TABLE
    "tournament_types" ADD PRIMARY KEY("id");
CREATE TABLE "activities"(
    "id" SERIAL NOT NULL,
    "activity" VARCHAR(255) NOT NULL,
    "scoresheet" BIGINT NOT NULL
);
ALTER TABLE
    "activities" ADD PRIMARY KEY("id");
CREATE TABLE "games"(
    "id" SERIAL NOT NULL,
    "round_id" BIGINT NOT NULL,
    "home_player" BIGINT NULL,
    "home_player_sub" BOOLEAN NOT NULL,
    "home_player_score" VARCHAR(255) NOT NULL,
    "away_player" BIGINT NULL,
    "away_player_sub" BOOLEAN NOT NULL,
    "away_player_score" VARCHAR(255) NOT NULL,
    "winner" BIGINT NOT NULL
);
ALTER TABLE
    "games" ADD PRIMARY KEY("id");
CREATE TABLE "tournaments"(
    "id" SERIAL NOT NULL,
    "tournament_name" VARCHAR(255) NOT NULL,
    "league_id" BIGINT NOT NULL,
    "tournament_type" BIGINT NOT NULL
);
ALTER TABLE
    "tournaments" ADD PRIMARY KEY("id");
CREATE TABLE "locations"(
    "id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "address_1" VARCHAR(255) NOT NULL,
    "address_2" BIGINT NOT NULL,
    "city" BIGINT NOT NULL,
    "state" BIGINT NOT NULL,
    "country" BIGINT NOT NULL,
    "zip" BIGINT NOT NULL,
    "phone" BIGINT NOT NULL
);
ALTER TABLE
    "locations" ADD PRIMARY KEY("id");
CREATE TABLE "leagues"(
    "id" SERIAL NOT NULL,
    "league_name" VARCHAR(255) NOT NULL,
    "activity_id" BIGINT NOT NULL,
    "owner_id" BIGINT NOT NULL,
    "authorized_user_id" BIGINT NOT NULL,
    "number_of_teams" BIGINT NOT NULL,
    "default_location_id" BIGINT NOT NULL
);
ALTER TABLE
    "leagues" ADD PRIMARY KEY("id");
CREATE TABLE "scoresheets"(
    "id" SERIAL NOT NULL,
    "num_teams" BIGINT NOT NULL,
    "num_rounds" BIGINT NOT NULL,
    "total_num_matches" BIGINT NOT NULL
);
ALTER TABLE
    "scoresheets" ADD PRIMARY KEY("id");
CREATE TABLE "users"(
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "address_1" VARCHAR(255) NULL,
    "address_2" VARCHAR(255) NULL,
    "city" VARCHAR(255) NULL,
    "state" VARCHAR(255) NULL,
    "country" VARCHAR(255) NULL,
    "zip" VARCHAR(255) NULL,
    "phone" VARCHAR(255) NULL,
    "access_level" INTEGER NOT NULL DEFAULT '0',
    "password" VARCHAR(1000) NOT NULL
);
ALTER TABLE
    "users" ADD PRIMARY KEY("id");
CREATE TABLE "matchups"(
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "location_id" BIGINT NOT NULL,
    "home_team_id" BIGINT NOT NULL,
    "away_team_id" BIGINT NOT NULL,
    "home_team_total" BIGINT NOT NULL,
    "away_team_total" BIGINT NOT NULL,
    "winner" BIGINT NOT NULL,
    "home_lineup_set" BOOLEAN NOT NULL,
    "away_lineup_set" BOOLEAN NOT NULL
);
ALTER TABLE
    "matchups" ADD PRIMARY KEY("id");
CREATE TABLE "teams"(
    "id" SERIAL NOT NULL,
    "team_name" VARCHAR(255) NOT NULL,
    "owner_id" BIGINT NOT NULL,
    "authorized_user_id" BIGINT NOT NULL,
    "league_id" BIGINT NOT NULL
);
ALTER TABLE
    "teams" ADD PRIMARY KEY("id");
ALTER TABLE
    "matchups" ADD CONSTRAINT "matchups_location_id_foreign" FOREIGN KEY("location_id") REFERENCES "locations"("id");
ALTER TABLE
    "tournaments" ADD CONSTRAINT "tournaments_tournament_type_foreign" FOREIGN KEY("tournament_type") REFERENCES "tournament_types"("id");
ALTER TABLE
    "teams" ADD CONSTRAINT "teams_league_id_foreign" FOREIGN KEY("league_id") REFERENCES "leagues"("id");
ALTER TABLE
    "games" ADD CONSTRAINT "games_away_player_foreign" FOREIGN KEY("away_player") REFERENCES "users"("id");
ALTER TABLE
    "activities" ADD CONSTRAINT "activities_scoresheet_foreign" FOREIGN KEY("scoresheet") REFERENCES "scoresheets"("id");
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
    "games" ADD CONSTRAINT "games_home_player_foreign" FOREIGN KEY("home_player") REFERENCES "users"("id");
ALTER TABLE
    "matchups" ADD CONSTRAINT "matchups_away_team_id_foreign" FOREIGN KEY("away_team_id") REFERENCES "teams"("id");
ALTER TABLE
    "teams" ADD CONSTRAINT "teams_owner_id_foreign" FOREIGN KEY("owner_id") REFERENCES "users"("id");
ALTER TABLE
    "teams" ADD CONSTRAINT "teams_authorized_user_id_foreign" FOREIGN KEY("authorized_user_id") REFERENCES "users"("id");
ALTER TABLE
    "tournaments" ADD CONSTRAINT "tournaments_league_id_foreign" FOREIGN KEY("league_id") REFERENCES "leagues"("id");
ALTER TABLE
    "leagues" ADD CONSTRAINT "leagues_authorized_user_id_foreign" FOREIGN KEY("authorized_user_id") REFERENCES "users"("id");
ALTER TABLE
    "leagues" ADD CONSTRAINT "leagues_owner_id_foreign" FOREIGN KEY("owner_id") REFERENCES "users"("id");