CREATE TABLE "access_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"player_id" uuid NOT NULL,
	"entity_type" text NOT NULL,
	"entity_id" uuid NOT NULL,
	"status" text DEFAULT 'PENDING' NOT NULL,
	"response_reason" text,
	"responded_by_id" uuid,
	"requested_at" timestamp DEFAULT now() NOT NULL,
	"responded_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "audit_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"manager_id" uuid NOT NULL,
	"action_type" text NOT NULL,
	"entity_type" text NOT NULL,
	"entity_id" uuid NOT NULL,
	"before_state" jsonb,
	"after_state" jsonb,
	"reason" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "backoffice_managers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"version" integer DEFAULT 0 NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"password_hash" text NOT NULL,
	"permission_level" text NOT NULL,
	"two_factor_enabled" boolean DEFAULT false NOT NULL,
	"two_factor_secret" text,
	"invited_by_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	CONSTRAINT "backoffice_managers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "block_records" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"entity_type" text NOT NULL,
	"entity_id" uuid NOT NULL,
	"blocked_by_id" uuid NOT NULL,
	"reason" text NOT NULL,
	"preset_message" text,
	"blocked_at" timestamp DEFAULT now() NOT NULL,
	"unblocked_at" timestamp,
	"unblocked_by_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"version" integer DEFAULT 0 NOT NULL,
	"house_id" uuid NOT NULL,
	"creator_id" uuid NOT NULL,
	"title" text NOT NULL,
	"type" text NOT NULL,
	"url" text,
	"body" text,
	"description" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "duel_challenges" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"entity_type" text NOT NULL,
	"entity_id" uuid NOT NULL,
	"challenger_id" uuid NOT NULL,
	"defender_id" uuid NOT NULL,
	"status" text NOT NULL,
	"challenger_score" integer,
	"defender_score" integer,
	"winner_id" uuid,
	"quills_cost" integer NOT NULL,
	"challenged_at" timestamp DEFAULT now() NOT NULL,
	"responded_at" timestamp,
	"completed_at" timestamp,
	"next_challenge_available_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "house_conquests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"player_id" uuid NOT NULL,
	"house_id" uuid NOT NULL,
	"best_tier" text NOT NULL,
	"best_score_percentage" integer NOT NULL,
	"total_quills_earned" integer DEFAULT 0 NOT NULL,
	"attempt_count" integer DEFAULT 1 NOT NULL,
	"last_attempt_at" timestamp NOT NULL,
	"next_retry_available_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "house_conquests_player_house_unique" UNIQUE("player_id","house_id")
);
--> statement-breakpoint
CREATE TABLE "house_entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"player_id" uuid NOT NULL,
	"house_id" uuid NOT NULL,
	"price_paid" integer DEFAULT 0 NOT NULL,
	"entered_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "house_group_members" (
	"house_group_id" uuid NOT NULL,
	"house_id" uuid NOT NULL,
	"added_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "house_group_members_house_group_id_house_id_pk" PRIMARY KEY("house_group_id","house_id")
);
--> statement-breakpoint
CREATE TABLE "house_groups" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"village_id" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_by_type" text NOT NULL,
	"created_by_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "houses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"version" integer DEFAULT 0 NOT NULL,
	"village_id" uuid NOT NULL,
	"creator_id" uuid NOT NULL,
	"owner_type" text DEFAULT 'PLAYER' NOT NULL,
	"manager_id" uuid,
	"name" text NOT NULL,
	"description" text,
	"icon_url" text,
	"is_free" boolean DEFAULT true NOT NULL,
	"entry_price" integer,
	"test_question_count" integer DEFAULT 5 NOT NULL,
	"test_easy_count" integer DEFAULT 2 NOT NULL,
	"test_medium_count" integer DEFAULT 1 NOT NULL,
	"test_hard_count" integer DEFAULT 2 NOT NULL,
	"visibility" text DEFAULT 'PUBLIC' NOT NULL,
	"status" text DEFAULT 'ACTIVE' NOT NULL,
	"block_reason" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"changed_by" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "kingdoms" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"version" integer DEFAULT 0 NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"icon_url" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"creator_id" uuid,
	"king_queen_id" uuid,
	"visibility" text DEFAULT 'PUBLIC' NOT NULL,
	"status" text DEFAULT 'ACTIVE' NOT NULL,
	"block_reason" text,
	"treasury_balance" integer DEFAULT 0 NOT NULL,
	"changed_by" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	CONSTRAINT "kingdoms_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "leadership_titles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"entity_type" text NOT NULL,
	"entity_id" uuid NOT NULL,
	"player_id" uuid NOT NULL,
	"title" text NOT NULL,
	"acquired_method" text NOT NULL,
	"grace_period_until" timestamp,
	"acquired_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "leadership_titles_entity_unique" UNIQUE("entity_type","entity_id")
);
--> statement-breakpoint
CREATE TABLE "player_badges" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"player_id" uuid NOT NULL,
	"badge_type" text NOT NULL,
	"scope_type" text NOT NULL,
	"scope_id" uuid,
	"quills_earned" integer DEFAULT 0 NOT NULL,
	"earned_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "question_options" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"question_id" uuid NOT NULL,
	"text" text NOT NULL,
	"is_correct" boolean DEFAULT false NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "questions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"version" integer DEFAULT 0 NOT NULL,
	"house_id" uuid NOT NULL,
	"creator_id" uuid NOT NULL,
	"text" text NOT NULL,
	"difficulty" text NOT NULL,
	"explanation" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "test_answers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"test_session_id" uuid NOT NULL,
	"question_id" uuid NOT NULL,
	"selected_option_id" uuid,
	"is_correct" boolean DEFAULT false NOT NULL,
	"answered_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "test_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"player_id" uuid NOT NULL,
	"house_id" uuid NOT NULL,
	"attempt_number" integer NOT NULL,
	"question_count" integer NOT NULL,
	"correct_count" integer DEFAULT 0 NOT NULL,
	"score_percentage" integer DEFAULT 0 NOT NULL,
	"tier_achieved" text,
	"quills_earned" integer DEFAULT 0 NOT NULL,
	"is_first_of_day" boolean DEFAULT false NOT NULL,
	"started_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_type" text NOT NULL,
	"account_id" uuid NOT NULL,
	"type" text NOT NULL,
	"amount" integer NOT NULL,
	"balance_after" integer NOT NULL,
	"reference_type" text,
	"reference_id" uuid,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"version" integer DEFAULT 0 NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"game_name" text NOT NULL,
	"password_hash" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"verify_token" text,
	"verify_token_expires_at" timestamp,
	"is_blocked" boolean DEFAULT false NOT NULL,
	"block_reason" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_game_name_unique" UNIQUE("game_name")
);
--> statement-breakpoint
CREATE TABLE "villages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"version" integer DEFAULT 0 NOT NULL,
	"kingdom_id" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"icon_url" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"creator_id" uuid,
	"chancellor_id" uuid,
	"manager_id" uuid,
	"visibility" text DEFAULT 'PUBLIC' NOT NULL,
	"status" text DEFAULT 'ACTIVE' NOT NULL,
	"block_reason" text,
	"treasury_balance" integer DEFAULT 0 NOT NULL,
	"changed_by" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "wallets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"player_id" uuid NOT NULL,
	"balance" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "wallets_player_id_unique" UNIQUE("player_id")
);
--> statement-breakpoint
ALTER TABLE "access_requests" ADD CONSTRAINT "access_requests_player_id_users_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "access_requests" ADD CONSTRAINT "access_requests_responded_by_id_users_id_fk" FOREIGN KEY ("responded_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_manager_id_backoffice_managers_id_fk" FOREIGN KEY ("manager_id") REFERENCES "public"."backoffice_managers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "block_records" ADD CONSTRAINT "block_records_blocked_by_id_backoffice_managers_id_fk" FOREIGN KEY ("blocked_by_id") REFERENCES "public"."backoffice_managers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "block_records" ADD CONSTRAINT "block_records_unblocked_by_id_backoffice_managers_id_fk" FOREIGN KEY ("unblocked_by_id") REFERENCES "public"."backoffice_managers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contents" ADD CONSTRAINT "contents_house_id_houses_id_fk" FOREIGN KEY ("house_id") REFERENCES "public"."houses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contents" ADD CONSTRAINT "contents_creator_id_users_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "duel_challenges" ADD CONSTRAINT "duel_challenges_challenger_id_users_id_fk" FOREIGN KEY ("challenger_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "duel_challenges" ADD CONSTRAINT "duel_challenges_defender_id_users_id_fk" FOREIGN KEY ("defender_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "duel_challenges" ADD CONSTRAINT "duel_challenges_winner_id_users_id_fk" FOREIGN KEY ("winner_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "house_conquests" ADD CONSTRAINT "house_conquests_player_id_users_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "house_conquests" ADD CONSTRAINT "house_conquests_house_id_houses_id_fk" FOREIGN KEY ("house_id") REFERENCES "public"."houses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "house_entries" ADD CONSTRAINT "house_entries_player_id_users_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "house_entries" ADD CONSTRAINT "house_entries_house_id_houses_id_fk" FOREIGN KEY ("house_id") REFERENCES "public"."houses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "house_group_members" ADD CONSTRAINT "house_group_members_house_group_id_house_groups_id_fk" FOREIGN KEY ("house_group_id") REFERENCES "public"."house_groups"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "house_group_members" ADD CONSTRAINT "house_group_members_house_id_houses_id_fk" FOREIGN KEY ("house_id") REFERENCES "public"."houses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "house_groups" ADD CONSTRAINT "house_groups_village_id_villages_id_fk" FOREIGN KEY ("village_id") REFERENCES "public"."villages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "houses" ADD CONSTRAINT "houses_village_id_villages_id_fk" FOREIGN KEY ("village_id") REFERENCES "public"."villages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "houses" ADD CONSTRAINT "houses_creator_id_users_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "houses" ADD CONSTRAINT "houses_manager_id_users_id_fk" FOREIGN KEY ("manager_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "houses" ADD CONSTRAINT "houses_changed_by_backoffice_managers_id_fk" FOREIGN KEY ("changed_by") REFERENCES "public"."backoffice_managers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kingdoms" ADD CONSTRAINT "kingdoms_creator_id_users_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kingdoms" ADD CONSTRAINT "kingdoms_king_queen_id_users_id_fk" FOREIGN KEY ("king_queen_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kingdoms" ADD CONSTRAINT "kingdoms_changed_by_backoffice_managers_id_fk" FOREIGN KEY ("changed_by") REFERENCES "public"."backoffice_managers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leadership_titles" ADD CONSTRAINT "leadership_titles_player_id_users_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "player_badges" ADD CONSTRAINT "player_badges_player_id_users_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "question_options" ADD CONSTRAINT "question_options_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "questions" ADD CONSTRAINT "questions_house_id_houses_id_fk" FOREIGN KEY ("house_id") REFERENCES "public"."houses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "questions" ADD CONSTRAINT "questions_creator_id_users_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "test_answers" ADD CONSTRAINT "test_answers_test_session_id_test_sessions_id_fk" FOREIGN KEY ("test_session_id") REFERENCES "public"."test_sessions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "test_answers" ADD CONSTRAINT "test_answers_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "test_answers" ADD CONSTRAINT "test_answers_selected_option_id_question_options_id_fk" FOREIGN KEY ("selected_option_id") REFERENCES "public"."question_options"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "test_sessions" ADD CONSTRAINT "test_sessions_player_id_users_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "test_sessions" ADD CONSTRAINT "test_sessions_house_id_houses_id_fk" FOREIGN KEY ("house_id") REFERENCES "public"."houses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "villages" ADD CONSTRAINT "villages_kingdom_id_kingdoms_id_fk" FOREIGN KEY ("kingdom_id") REFERENCES "public"."kingdoms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "villages" ADD CONSTRAINT "villages_creator_id_users_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "villages" ADD CONSTRAINT "villages_chancellor_id_users_id_fk" FOREIGN KEY ("chancellor_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "villages" ADD CONSTRAINT "villages_manager_id_users_id_fk" FOREIGN KEY ("manager_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "villages" ADD CONSTRAINT "villages_changed_by_backoffice_managers_id_fk" FOREIGN KEY ("changed_by") REFERENCES "public"."backoffice_managers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_player_id_users_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;